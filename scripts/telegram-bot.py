import base64
import json
import logging
import os
import re
import sys
import unicodedata
from datetime import datetime, timezone

import requests

# ── Configuración ─────────────────────────────────────────────────────────────
BOT_TOKEN  = os.environ["TELEGRAM_BOT_TOKEN"]
GH_PAT     = os.environ["GH_PAT"]
GH_REPO    = os.environ.get("GH_REPO",    "SentimientoCordobe/sentimientocordobe")
GH_BRANCH  = os.environ.get("GH_BRANCH",  "main")
DATA_FILE  = os.environ.get("DATA_FILE",  "src/data/noticias.manual.json")

TELEGRAM_API = f"https://api.telegram.org/bot{BOT_TOKEN}"

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)


# ── Helpers ───────────────────────────────────────────────────────────────────
def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^\w\s-]", " ", text)
    text = re.sub(r"\s+", "-", text.strip().lower())
    return re.sub(r"-+", "-", text)[:110]


def now_rfc2822() -> str:
    return datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")


# ── Telegram helpers ──────────────────────────────────────────────────────────
def tg_get(method: str, **params):
    r = requests.get(f"{TELEGRAM_API}/{method}", params=params, timeout=15)
    r.raise_for_status()
    return r.json()


def tg_post(method: str, **kwargs):
    r = requests.post(f"{TELEGRAM_API}/{method}", timeout=15, **kwargs)
    r.raise_for_status()
    return r.json()


def send_message(chat_id: int, text: str):
    tg_post("sendMessage", json={"chat_id": chat_id, "text": text})


def get_file_url(file_id: str) -> str:
    data = tg_get("getFile", file_id=file_id)
    file_path = data["result"]["file_path"]
    return f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file_path}"


# ── GitHub helpers ────────────────────────────────────────────────────────────
GH_HEADERS = {
    "Authorization": f"Bearer {GH_PAT}",
    "Accept":        "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}
GH_FILE_URL = f"https://api.github.com/repos/{GH_REPO}/contents/{DATA_FILE}"


def gh_get_file():
    """Devuelve (contenido_decodificado, sha)."""
    r = requests.get(GH_FILE_URL, headers=GH_HEADERS,
                     params={"ref": GH_BRANCH}, timeout=15)
    r.raise_for_status()
    data = r.json()
    content = base64.b64decode(data["content"]).decode("utf-8")
    return json.loads(content), data["sha"]


def gh_update_file(new_content: list, sha: str, message: str):
    encoded = base64.b64encode(
        json.dumps(new_content, ensure_ascii=False, indent=2).encode("utf-8")
    ).decode("utf-8")
    payload = {
        "message": message,
        "content": encoded,
        "sha":     sha,
        "branch":  GH_BRANCH,
    }
    r = requests.put(GH_FILE_URL, headers=GH_HEADERS, json=payload, timeout=15)
    r.raise_for_status()
    return r.json()


# ── Procesamiento de mensajes ─────────────────────────────────────────────────
def process_message(msg: dict):
    chat_id = msg["chat"]["id"]

    # Debe tener foto
    if "photo" not in msg:
        send_message(chat_id, "⚠️ Envíame un mensaje con FOTO + texto.")
        return

    # Texto del caption
    titulo = (msg.get("caption") or "").strip()
    if not titulo:
        send_message(chat_id, "⚠️ El mensaje no tiene texto. Añade una descripción a la foto.")
        return

    # Obtener la foto en máxima resolución
    foto = sorted(msg["photo"], key=lambda p: p["file_size"])[-1]
    imagen_url = get_file_url(foto["file_id"])

    log.info(f"Nuevo post: {titulo[:60]}…")

    # Leer JSON actual desde GitHub
    try:
        existing, sha = gh_get_file()
    except Exception as e:
        log.error(f"Error leyendo GitHub: {e}")
        send_message(chat_id, f"❌ Error leyendo el repo: {e}")
        return

    # Construir nueva entrada
    max_id = max((int(n.get("id", 0)) for n in existing), default=0)
    titulo_clean = titulo.replace("\n", " ")
    entry = {
        "id":        max_id + 1,
        "slug":      slugify(titulo_clean) or f"post-{max_id + 1}",
        "titulo":    titulo_clean,
        "resumen":   titulo_clean[:120],
        "imagen":    imagen_url,
        "fecha":     now_rfc2822(),
        "contenido": titulo_clean,
        "instagram": "",
        "tipo":      "post",
        "destacada": False,
    }

    updated = [entry] + existing

    # Subir a GitHub
    try:
        gh_update_file(
            updated,
            sha,
            f"🤖 Telegram bot · {titulo_clean[:60]}"
        )
        log.info("✅ GitHub actualizado")
        send_message(
            chat_id,
            f"✅ Publicado correctamente:\n\n*{titulo_clean[:80]}*\n\n"
            f"La web se actualizará en ~1 minuto.",
        )
    except Exception as e:
        log.error(f"Error actualizando GitHub: {e}")
        send_message(chat_id, f"❌ Error actualizando el repo: {e}")


# ── Polling loop ──────────────────────────────────────────────────────────────
def run_polling():
    log.info("🤖 Bot iniciado — esperando mensajes…")
    offset = 0

    while True:
        try:
            result = tg_get("getUpdates", offset=offset, timeout=30, allowed_updates='["message"]')
            updates = result.get("result", [])
            if updates:
                log.info(f"Updates recibidos: {len(updates)}")
            else:
                log.info("Sin updates nuevos")
            for update in updates:

                offset = update["update_id"] + 1
                msg = update.get("message")
                if msg:
                    try:
                        process_message(msg)
                    except Exception as e:
                        log.error(f"Error procesando mensaje: {e}")

        except requests.exceptions.Timeout:
            continue
        except Exception as e:
            log.error(f"Error en polling: {e}")
            import time; time.sleep(5)


if __name__ == "__main__":
    run_polling()