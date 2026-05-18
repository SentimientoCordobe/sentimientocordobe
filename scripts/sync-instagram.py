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

# ── Configuración ─────────────────────────────────────────────────────────────
USERNAME  = "sentimiento_cordobe"
DATA_FILE = Path(os.environ.get("DATA_FILE", "src/data/noticias.manual.json"))
MAX_POSTS = int(os.environ.get("MAX_POSTS", "12"))


# ── Helpers ───────────────────────────────────────────────────────────────────
def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^\w\s-]", " ", text)
    text = re.sub(r"\s+", "-", text.strip().lower())
    text = re.sub(r"-+", "-", text)
    return text[:110]


def to_rfc2822(dt) -> str:
    dt_utc = dt.astimezone(timezone.utc)
    return dt_utc.strftime("%a, %d %b %Y %H:%M:%S GMT")


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    # 1. Iniciar instaloader
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        quiet=True,
    )

    # 2. Login con credenciales (Instagram bloquea acceso anónimo)
    ig_user = os.environ.get("IG_USERNAME", "").strip()
    ig_pass = os.environ.get("IG_PASSWORD", "").strip()

    if not ig_user or not ig_pass:
        print("❌ Faltan IG_USERNAME y/o IG_PASSWORD en las variables de entorno.")
        print("   → Añádelas como GitHub Secrets en Settings → Secrets → Actions.")
        sys.exit(1)

    print(f"🔐 Haciendo login como @{ig_user}…")
    try:
        L.login(ig_user, ig_pass)
        print("✅ Login correcto.")
    except instaloader.exceptions.BadCredentialsException:
        print("❌ Credenciales incorrectas. Revisa IG_USERNAME / IG_PASSWORD.")
        sys.exit(1)
    except instaloader.exceptions.TwoFactorAuthRequiredException:
        print("❌ La cuenta tiene 2FA activo. Desactívalo o usa otra cuenta.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error en el login: {e}")
        sys.exit(1)

    # 3. Cargar perfil objetivo
    print(f"📡 Leyendo perfil @{USERNAME}…")
    try:
        profile = instaloader.Profile.from_username(L.context, USERNAME)
    except instaloader.exceptions.ProfileNotExistsException:
        print(f"❌ El perfil @{USERNAME} no existe o es privado.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error al acceder al perfil: {e}")
        sys.exit(1)

    # 4. Obtener los últimos MAX_POSTS posts
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

    # 5. Leer JSON actual
    existing = []
    if DATA_FILE.exists():
        try:
            existing = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except Exception:
            print(f"⚠️  No se pudo parsear {DATA_FILE}. Se creará desde cero.")
    else:
        print(f"⚠️  {DATA_FILE} no existe. Se creará.")

    # 6. Detectar posts nuevos comparando por URL de Instagram
    existing_urls = {n.get("instagram", "") for n in existing if n.get("instagram")}
    new_posts = [
        p for p in posts
        if f"https://www.instagram.com/p/{p.shortcode}" not in existing_urls
    ]

    if not new_posts:
        print("✅ Sin novedades. El JSON ya está actualizado.")
        sys.exit(0)

    print(f"🆕 Posts nuevos detectados: {len(new_posts)}")

    # 7. Calcular próximo id
    max_id = max((int(n.get("id", 0)) for n in existing), default=0)

    # 8. Construir entradas con el esquema Noticia
    new_entries = []
    for i, post in enumerate(new_posts):
        titulo  = (post.caption or "").strip().replace("\n", " ")
        resumen = titulo[:120]
        imagen  = post.url if post.url else ""
        fecha   = to_rfc2822(post.date_utc)
        url_ig  = f"https://www.instagram.com/p/{post.shortcode}"

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

    # 9. Prepend y guardar (más recientes primero)
    updated = new_entries + existing
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(updated, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"\n✅ {DATA_FILE} actualizado con {len(new_entries)} post(s) nuevo(s).")


if __name__ == "__main__":
    main()
