"""
AGENTE: Sync Instagram → noticias.manual.json
Usa el cookie sessionid de Instagram directamente (sin login).

Env (GitHub Secrets):
  IG_USERNAME    → tu usuario de Instagram (sin @)
  IG_SESSION_ID  → valor del cookie 'sessionid' de instagram.com
  DATA_FILE      → ruta al JSON (default: src/data/noticias.manual.json)
  MAX_POSTS      → cuántos posts recientes revisar (default: 12)

Cómo obtener IG_SESSION_ID:
  1. Abre instagram.com en el navegador e inicia sesión
  2. DevTools (F12) → Application → Cookies → https://www.instagram.com
  3. Copia el valor del cookie llamado 'sessionid'
  4. Guárdalo en GitHub → Settings → Secrets → Actions → IG_SESSION_ID
"""

import json
import os
import re
import sys
import unicodedata
from datetime import timezone
from pathlib import Path

try:
    import instaloader
except ImportError:
    print("❌ Falta instaloader. Ejecuta: pip install instaloader")
    sys.exit(1)

USERNAME  = "sentimiento_cordobe"
DATA_FILE = Path(os.environ.get("DATA_FILE", "src/data/noticias.manual.json"))
MAX_POSTS = int(os.environ.get("MAX_POSTS", "12"))


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^\w\s-]", " ", text)
    text = re.sub(r"\s+", "-", text.strip().lower())
    text = re.sub(r"-+", "-", text)
    return text[:110]


def to_rfc2822(dt) -> str:
    return dt.astimezone(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")


def main():
    ig_user      = os.environ.get("IG_USERNAME", "").strip()
    ig_session_id = os.environ.get("IG_SESSION_ID", "").strip()

    if not ig_user or not ig_session_id:
        print("❌ Faltan IG_USERNAME y/o IG_SESSION_ID.")
        print("   → Añádelos como GitHub Secrets.")
        sys.exit(1)

    # 1. Crear instancia e inyectar sessionid directamente (sin login)
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        quiet=True,
    )

    print(f"🔐 Usando sesión de @{ig_user}…")
    try:
        L.context._session.cookies.set("sessionid", ig_session_id, domain=".instagram.com")
        L.context.username = ig_user
        # Verificar que la sesión funciona
        _ = L.context.graphql_query("d6f4427fbe92d846298cf93df0b937d3", {})
        print("✅ Sesión válida.")
    except Exception as e:
        print(f"❌ Sesión inválida o expirada: {e}")
        print("   → Vuelve a copiar el sessionid desde el navegador.")
        sys.exit(1)

    # 2. Cargar perfil
    print(f"📡 Leyendo perfil @{USERNAME}…")
    try:
        profile = instaloader.Profile.from_username(L.context, USERNAME)
    except instaloader.exceptions.ProfileNotExistsException:
        print(f"❌ El perfil @{USERNAME} no existe o es privado.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error al acceder al perfil: {e}")
        sys.exit(1)

    # 3. Obtener los últimos MAX_POSTS posts
    posts = []
    try:
        for i, post in enumerate(profile.get_posts()):
            if i >= MAX_POSTS:
                break
            posts.append(post)
    except Exception as e:
        print(f"❌ Error al iterar posts: {e}")
        sys.exit(1)

    print(f"📥 Posts leídos: {len(posts)}")

    if not posts:
        print("⚠️  No se obtuvieron posts. Abortando sin cambios.")
        sys.exit(0)

    # 4. Leer JSON actual
    existing = []
    if DATA_FILE.exists():
        try:
            existing = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except Exception:
            print(f"⚠️  No se pudo parsear {DATA_FILE}. Se creará desde cero.")
    else:
        print(f"⚠️  {DATA_FILE} no existe. Se creará.")

    # 5. Detectar posts nuevos
    existing_urls = {n.get("instagram", "") for n in existing if n.get("instagram")}
    new_posts = [
        p for p in posts
        if f"https://www.instagram.com/p/{p.shortcode}" not in existing_urls
    ]

    if not new_posts:
        print("✅ Sin novedades. El JSON ya está actualizado.")
        sys.exit(0)

    print(f"🆕 Posts nuevos detectados: {len(new_posts)}")

    # 6. Calcular próximo id
    max_id = max((int(n.get("id", 0)) for n in existing), default=0)

    # 7. Construir entradas con el esquema Noticia
    new_entries = []
    for i, post in enumerate(new_posts):
        titulo   = (post.caption or "").strip().replace("\n", " ")
        resumen  = titulo[:120]
        imagen   = post.url if post.url else ""
        fecha    = to_rfc2822(post.date_utc)
        url_ig   = f"https://www.instagram.com/p/{post.shortcode}"

        entry = {
            "id":        max_id + i + 1,
            "slug":      slugify(titulo) or f"post-{post.shortcode}",
            "titulo":    titulo,
            "resumen":   resumen,
            "imagen":    imagen,
            "fecha":     fecha,
            "contenido": titulo,
            "instagram": url_ig,
            "tipo":      "post",
            "destacada": False,
        }
        new_entries.append(entry)
        print(f"   • [{entry['id']}] {titulo[:70]}…")

    # 8. Prepend y guardar
    updated = new_entries + existing
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(updated, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"\n✅ {DATA_FILE} actualizado con {len(new_entries)} post(s) nuevo(s).")


if __name__ == "__main__":
    main()
