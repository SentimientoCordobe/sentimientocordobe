#!/usr/bin/env python3
"""
Bot de Telegram para Sentimiento Cordobé.

FLUJO:
1. Reenvías (o envías con foto + texto) un post de Instagram al bot.
2. El bot llama a la API de Anthropic (Claude) para redactar un borrador
   de noticia (título, resumen, contenido) a partir de esa foto + texto,
   siguiendo el estilo editorial de la web.
3. El bot te devuelve el borrador en el propio chat con dos botones:
   ✅ Publicar   |   ❌ Descartar
4. Si pulsas "Publicar", el bot sube la foto y añade la noticia a
   src/data/noticias.manual.json directamente en GitHub (commit + push).
   Si pulsas "Descartar", no se hace nada.

No se hace scraping de Instagram en ningún momento: la foto y el texto
los aporta el propio usuario reenviando su post, así que no depende de
cookies de sesión ni puede ser bloqueado por Instagram.

Variables de entorno necesarias:
- TELEGRAM_BOT_TOKEN   token del bot (@BotFather)
- GH_PAT               personal access token de GitHub con permiso "repo"
- GH_REPO              "usuario/repositorio", p.ej. SentimientoCordobe/sentimientocordobe
- GH_BRANCH            rama a la que hacer commit, p.ej. "main"
- DATA_FILE            ruta del JSON de noticias, p.ej. src/data/noticias.manual.json
- ANTHROPIC_API_KEY    clave de la API de Anthropic (console.anthropic.com)
"""

import base64
import json
import os
import sys
import time
import unicodedata
from datetime import datetime, timezone

import requests

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
GH_PAT = os.environ.get("GH_PAT", "").strip()
GH_REPO = os.environ.get("GH_REPO", "").strip()
GH_BRANCH = os.environ.get("GH_BRANCH", "main").strip()
DATA_FILE = os.environ.get("DATA_FILE", "src/data/noticias.manual.json").strip()
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()

TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"
GITHUB_API = "https://api.github.com"

# Borradores pendientes de revisión, en memoria: draft_id -> dict
BORRADORES = {}


def fail_if_missing_env():
    faltan = [
        nombre
        for nombre, valor in [
            ("TELEGRAM_BOT_TOKEN", TELEGRAM_BOT_TOKEN),
            ("GH_PAT", GH_PAT),
            ("GH_REPO", GH_REPO),
            ("ANTHROPIC_API_KEY", ANTHROPIC_API_KEY),
        ]
        if not valor
    ]
    if faltan:
        print(f"❌ Faltan variables de entorno: {', '.join(faltan)}")
        sys.exit(1)


# ── Utilidades ───────────────────────────────────────────────────────────

def slugify(texto: str) -> str:
    texto = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    texto = texto.lower()
    out = []
    anterior_guion = False
    for ch in texto:
        if ch.isalnum():
            out.append(ch)
            anterior_guion = False
        elif not anterior_guion:
            out.append("-")
            anterior_guion = True
    return "".join(out).strip("-")[:80]


def github_get_file(path: str):
    """Devuelve (contenido_decodificado_str, sha) o (None, None) si no existe."""
    url = f"{GITHUB_API}/repos/{GH_REPO}/contents/{path}"
    r = requests.get(
        url,
        headers={"Authorization": f"token {GH_PAT}"},
        params={"ref": GH_BRANCH},
        timeout=30,
    )
    if r.status_code == 404:
        return None, None
    r.raise_for_status()
    data = r.json()
    contenido = base64.b64decode(data["content"]).decode("utf-8")
    return contenido, data["sha"]


def github_put_file(path: str, contenido_bytes: bytes, mensaje: str, sha=None, is_text=True):
    url = f"{GITHUB_API}/repos/{GH_REPO}/contents/{path}"
    payload = {
        "message": mensaje,
        "content": base64.b64encode(contenido_bytes).decode("ascii"),
        "branch": GH_BRANCH,
    }
    if sha:
        payload["sha"] = sha
    r = requests.put(
        url,
        headers={"Authorization": f"token {GH_PAT}"},
        json=payload,
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def anthropic_redactar_noticia(caption: str) -> dict:
    """Llama a la API de Anthropic para redactar título/resumen/contenido."""
    system = (
        "Eres el redactor de Sentimiento Cordobé, un fansite del Córdoba CF. "
        "A partir del texto de un post de Instagram del club o de cuentas "
        "cordobesistas, redactas una noticia breve en español, con tono "
        "periodístico deportivo, cercano pero profesional. "
        "Debes devolver EXCLUSIVAMENTE un JSON con esta forma exacta, sin "
        "texto adicional ni bloques de código: "
        '{"titulo": "...", "resumen": "...", "contenido": "..."}. '
        "El título debe ser conciso y noticioso (sin emojis, sin hashtags). "
        "El resumen: una frase de 1-2 líneas. "
        "El contenido: 2-3 párrafos separados por \\n\\n, parafraseando "
        "el texto original con tus propias palabras (no lo copies literal), "
        "añadiendo contexto razonable si lo hay. No inventes datos, marcadores "
        "ni cifras que no estén en el texto original."
    )

    r = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json={
            "model": "claude-sonnet-4-5",
            "max_tokens": 1024,
            "system": system,
            "messages": [{"role": "user", "content": caption or "(sin texto)"}],
        },
        timeout=60,
    )
    r.raise_for_status()
    texto = r.json()["content"][0]["text"].strip()
    texto = texto.removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    return json.loads(texto)


# ── Telegram helpers ─────────────────────────────────────────────────────

def tg_send_message(chat_id, texto, reply_markup=None):
    payload = {"chat_id": chat_id, "text": texto, "parse_mode": "HTML"}
    if reply_markup:
        payload["reply_markup"] = json.dumps(reply_markup)
    r = requests.post(f"{TELEGRAM_API}/sendMessage", json=payload, timeout=30)
    r.raise_for_status()
    return r.json()["result"]


def tg_edit_message(chat_id, message_id, texto):
    requests.post(
        f"{TELEGRAM_API}/editMessageText",
        json={"chat_id": chat_id, "message_id": message_id, "text": texto, "parse_mode": "HTML"},
        timeout=30,
    )


def tg_answer_callback(callback_id, texto=""):
    requests.post(
        f"{TELEGRAM_API}/answerCallbackQuery",
        json={"callback_query_id": callback_id, "text": texto},
        timeout=15,
    )


def tg_download_biggest_photo(photos: list) -> bytes:
    file_id = photos[-1]["file_id"]  # Telegram ordena de menor a mayor tamaño
    r = requests.get(f"{TELEGRAM_API}/getFile", params={"file_id": file_id}, timeout=30)
    r.raise_for_status()
    file_path = r.json()["result"]["file_path"]
    file_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
    img = requests.get(file_url, timeout=30)
    img.raise_for_status()
    return img.content


# ── Lógica principal ─────────────────────────────────────────────────────

def procesar_post_reenviado(chat_id, caption: str, photos: list):
    tg_send_message(chat_id, "✍️ Redactando borrador con IA, un momento…")

    try:
        redaccion = anthropic_redactar_noticia(caption)
    except Exception as e:
        tg_send_message(chat_id, f"❌ No pude redactar el borrador: {e}")
        return

    imagen_bytes = None
    if photos:
        try:
            imagen_bytes = tg_download_biggest_photo(photos)
        except Exception as e:
            tg_send_message(chat_id, f"⚠️ No pude descargar la foto ({e}), sigo sin imagen.")

    draft_id = str(int(time.time() * 1000))
    slug = slugify(redaccion["titulo"])
    BORRADORES[draft_id] = {
        "titulo": redaccion["titulo"],
        "resumen": redaccion["resumen"],
        "contenido": redaccion["contenido"],
        "slug": slug,
        "imagen_bytes": imagen_bytes,
    }

    preview = (
        f"📰 <b>{redaccion['titulo']}</b>\n\n"
        f"<i>{redaccion['resumen']}</i>\n\n"
        f"{redaccion['contenido']}\n\n"
        f"— ¿Publico esta noticia?"
    )
    teclado = {
        "inline_keyboard": [
            [
                {"text": "✅ Publicar", "callback_data": f"publicar:{draft_id}"},
                {"text": "❌ Descartar", "callback_data": f"descartar:{draft_id}"},
            ]
        ]
    }
    tg_send_message(chat_id, preview, reply_markup=teclado)


def publicar_borrador(draft_id: str) -> str:
    borrador = BORRADORES.pop(draft_id, None)
    if not borrador:
        return "⚠️ Este borrador ya no está disponible (o ya se procesó)."

    ruta_imagen = None
    if borrador["imagen_bytes"]:
        ruta_imagen = f"public/images/noticias/{borrador['slug']}.jpg"
        github_put_file(
            ruta_imagen,
            borrador["imagen_bytes"],
            f"Añade imagen para noticia: {borrador['titulo']}",
        )

    contenido_actual, sha = github_get_file(DATA_FILE)
    noticias = json.loads(contenido_actual) if contenido_actual else []

    nueva_id = max([n.get("id", 0) for n in noticias], default=0) + 1
    ahora = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")

    nueva_noticia = {
        "id": nueva_id,
        "slug": borrador["slug"],
        "titulo": borrador["titulo"],
        "resumen": borrador["resumen"],
        "imagen": (
            f"/{ruta_imagen.replace('public/', '')}"
            if ruta_imagen
            else "https://statics-maker.llt-services.com/cor/images/2025/07/31/large/0c517fa6-48e5-435a-88ea-25e5a7f2e384-41.png"
        ),
        "fecha": ahora,
        "contenido": borrador["contenido"],
        "fuente": "Sentimiento Cordobé (Instagram)",
        "url": "https://www.instagram.com/sentimiento_cordobe/",
        "tipo": "post",
        "destacada": False,
    }
    noticias.insert(0, nueva_noticia)

    github_put_file(
        DATA_FILE,
        json.dumps(noticias, ensure_ascii=False, indent=2).encode("utf-8"),
        f"🤖 Nueva noticia (bot Telegram): {borrador['titulo']}",
        sha=sha,
    )
    return f"✅ Publicada: <b>{borrador['titulo']}</b>\n\nVercel la desplegará en 1-2 minutos."


# ── Bucle principal (long polling) ───────────────────────────────────────

def main():
    fail_if_missing_env()
    print("🤖 Bot arrancado, escuchando mensajes…")

    offset = None
    tiempo_limite = time.time() + 6 * 60 * 60  # se autolimita a 6h por si acaso

    while time.time() < tiempo_limite:
        try:
            r = requests.get(
                f"{TELEGRAM_API}/getUpdates",
                params={"timeout": 50, "offset": offset},
                timeout=60,
            )
            r.raise_for_status()
            updates = r.json()["result"]
        except Exception as e:
            print(f"⚠️ Error consultando Telegram: {e}")
            time.sleep(5)
            continue

        for update in updates:
            offset = update["update_id"] + 1

            if "callback_query" in update:
                cq = update["callback_query"]
                accion, draft_id = cq["data"].split(":", 1)
                chat_id = cq["message"]["chat"]["id"]
                message_id = cq["message"]["message_id"]

                if accion == "publicar":
                    tg_answer_callback(cq["id"], "Publicando…")
                    resultado = publicar_borrador(draft_id)
                    tg_edit_message(chat_id, message_id, resultado)
                elif accion == "descartar":
                    BORRADORES.pop(draft_id, None)
                    tg_answer_callback(cq["id"], "Descartado")
                    tg_edit_message(chat_id, message_id, "❌ Borrador descartado.")
                continue

            msg = update.get("message") or update.get("channel_post")
            if not msg:
                continue

            chat_id = msg["chat"]["id"]
            caption = msg.get("caption") or msg.get("text") or ""
            photos = msg.get("photo")

            if photos or caption:
                procesar_post_reenviado(chat_id, caption, photos or [])
            else:
                tg_send_message(
                    chat_id,
                    "Reenvíame un post de Instagram (con foto y texto) y te preparo el borrador de noticia 📰",
                )

    print("⏰ Tiempo límite alcanzado, apagando el bot.")


if __name__ == "__main__":
    main()
