import json, os, re, sys, unicodedata
from datetime import timezone
from pathlib import Path

try:
    import instaloader
except ImportError:
    print("❌ Falta el paquete 'instaloader'. Instálalo con `pip install instaloader`.")
    sys.exit(1)

USERNAME  = "sentimiento_cordobe"
DATA_FILE = Path(os.environ.get("DATA_FILE", "src/data/noticias.manual.json"))
MAX_POSTS = int(os.environ.get("MAX_POSTS", "12"))

def slugify(text):
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^\w\s-]", " ", text)
    text = re.sub(r"\s+", "-", text.strip().lower())
    return re.sub(r"-+", "-", text)[:110]

def to_rfc2822(dt):
    return dt.astimezone(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")

ig_user = os.environ.get("IG_USERNAME", "").strip()
ig_sid  = os.environ.get("IG_SESSION_ID", "").strip()

if not ig_user or not ig_sid:
    print("❌ Faltan IG_USERNAME y/o IG_SESSION_ID.")
    sys.exit(1)

L = instaloader.Instaloader(download_pictures=False, download_videos=False,
    download_video_thumbnails=False, download_geotags=False,
    download_comments=False, save_metadata=False, quiet=True)

print(f"🔐 Usando sesión de @{ig_user}…")
L.context._session.cookies.set("sessionid", ig_sid, domain=".instagram.com")
L.context.username = ig_user
print("✅ Sesión cargada.")

print(f"📡 Leyendo perfil @{USERNAME}…")
try:
    profile = instaloader.Profile.from_username(L.context, USERNAME)
except Exception as e:
    print(f"❌ Error al acceder al perfil: {e}"); sys.exit(1)

posts = []
for i, post in enumerate(profile.get_posts()):
    if i >= MAX_POSTS: break
    posts.append(post)
print(f"📥 Posts leídos: {len(posts)}")

existing = json.loads(DATA_FILE.read_text("utf-8")) if DATA_FILE.exists() else []
existing_urls = {n.get("instagram","") for n in existing}
new_posts = [p for p in posts if f"https://www.instagram.com/p/{p.shortcode}" not in existing_urls]

if not new_posts:
    print("✅ Sin novedades."); sys.exit(0)

print(f"🆕 Posts nuevos: {len(new_posts)}")
max_id = max((int(n.get("id",0)) for n in existing), default=0)
new_entries = []
for i, post in enumerate(new_posts):
    titulo = (post.caption or "").strip().replace("\n"," ")
    entry = {"id": max_id+i+1, "slug": slugify(titulo) or f"post-{post.shortcode}",
             "titulo": titulo, "resumen": titulo[:120], "imagen": post.url or "",
             "fecha": to_rfc2822(post.date_utc), "contenido": titulo,
             "instagram": f"https://www.instagram.com/p/{post.shortcode}",
             "tipo": "post", "destacada": False}
    new_entries.append(entry)
    print(f"   • [{entry['id']}] {titulo[:70]}")

DATA_FILE.write_text(json.dumps(new_entries + existing, ensure_ascii=False, indent=2), "utf-8")
print(f"✅ JSON actualizado con {len(new_entries)} post(s).")
