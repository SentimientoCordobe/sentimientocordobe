import json
import os
import re
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("❌ Falta playwright. Ejecuta: pip install playwright && playwright install chromium")
    sys.exit(1)

USERNAME  = "sentimiento_cordobe"
DATA_FILE = Path(os.environ.get("DATA_FILE", "src/data/noticias.manual.json"))
MAX_POSTS = int(os.environ.get("MAX_POSTS", "12"))


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^\w\s-]", " ", text)
    text = re.sub(r"\s+", "-", text.strip().lower())
    return re.sub(r"-+", "-", text)[:110]


def to_rfc2822(ts: int) -> str:
    dt = datetime.fromtimestamp(ts, tz=timezone.utc)
    return dt.strftime("%a, %d %b %Y %H:%M:%S GMT")


def scrape_posts(session_id: str) -> list[dict]:
    posts = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 900},
            locale="es-ES",
        )

        # Inyectar sessionid antes de navegar
        context.add_cookies([{
            "name":   "sessionid",
            "value":  session_id,
            "domain": ".instagram.com",
            "path":   "/",
            "secure": True,
            "httpOnly": True,
            "sameSite": "Lax",
        }])

        page = context.new_page()

        # Interceptar las respuestas de la API GraphQL de Instagram
        api_data = []

        def handle_response(response):
            if "graphql/query" in response.url or "api/v1/feed/user" in response.url:
                try:
                    data = response.json()
                    api_data.append(data)
                except Exception:
                    pass

        page.on("response", handle_response)

        print(f"🌐 Navegando al perfil @{USERNAME}…")
        try:
            page.goto(
                f"https://www.instagram.com/{USERNAME}/",
                wait_until="networkidle",
                timeout=30_000,
            )
        except Exception as e:
            print(f"⚠️  Timeout esperando networkidle (normal): {e}")

        page.wait_for_timeout(3000)

        # Extraer posts del HTML/JSON capturado
        for data in api_data:
            try:
                # Ruta v1
                edges = (
                    data.get("data", {})
                        .get("user", {})
                        .get("edge_owner_to_timeline_media", {})
                        .get("edges", [])
                )
                if not edges:
                    # Ruta v2
                    edges = (
                        data.get("data", {})
                            .get("xdt_api__v1__feed__user_timeline_graphql_connection", {})
                            .get("edges", [])
                    )
                for edge in edges:
                    node = edge.get("node", {})
                    shortcode = node.get("shortcode") or node.get("code")
                    if not shortcode:
                        continue
                    caption_edges = (
                        node.get("edge_media_to_caption", {}).get("edges", [])
                    )
                    caption = caption_edges[0]["node"]["text"] if caption_edges else ""
                    taken_at = node.get("taken_at_timestamp") or node.get("taken_at", 0)
                    thumbnail = (
                        node.get("thumbnail_src")
                        or node.get("display_url")
                        or node.get("thumbnail_resources", [{}])[-1].get("src", "")
                    )
                    posts.append({
                        "shortcode": shortcode,
                        "caption":   caption,
                        "taken_at":  int(taken_at),
                        "thumbnail": thumbnail,
                    })
            except Exception:
                continue

        # Si la API no devolvió nada, intentar extraer del JSON embebido en la página
        if not posts:
            print("⚠️  API interceptada vacía, intentando extracción del HTML…")
            content = page.content()
            matches = re.findall(r'"shortcode":"([^"]+)"', content)
            captions = re.findall(r'"text":"([^"]{10,})"', content)
            timestamps = re.findall(r'"taken_at_timestamp":(\d+)', content)
            thumbnails = re.findall(r'"thumbnail_src":"([^"]+)"', content)

            for i, sc in enumerate(matches[:MAX_POSTS]):
                posts.append({
                    "shortcode": sc,
                    "caption":   captions[i] if i < len(captions) else "",
                    "taken_at":  int(timestamps[i]) if i < len(timestamps) else 0,
                    "thumbnail": thumbnails[i].replace("\\u0026", "&") if i < len(thumbnails) else "",
                })

        browser.close()

    # Deduplicar por shortcode
    seen = set()
    unique = []
    for p in posts:
        if p["shortcode"] not in seen:
            seen.add(p["shortcode"])
            unique.append(p)

    return unique[:MAX_POSTS]


def main():
    ig_sid = os.environ.get("IG_SESSION_ID", "").strip()

    if not ig_sid:
        print("❌ Falta IG_SESSION_ID en las variables de entorno.")
        print("   → Obténlo de instagram.com → DevTools → Application → Cookies → sessionid")
        sys.exit(1)

    posts = scrape_posts(ig_sid)
    print(f"📥 Posts obtenidos: {len(posts)}")

    if not posts:
        print("⚠️  No se obtuvieron posts. Puede que la sesión haya expirado.")
        sys.exit(1)

    # Leer JSON actual
    existing = []
    if DATA_FILE.exists():
        try:
            existing = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except Exception:
            print("⚠️  No se pudo parsear el JSON. Se creará desde cero.")

    existing_urls = {n.get("instagram", "") for n in existing}
    new_posts = [
        p for p in posts
        if f"https://www.instagram.com/p/{p['shortcode']}" not in existing_urls
    ]

    if not new_posts:
        print("✅ Sin novedades. El JSON ya está actualizado.")
        sys.exit(0)

    print(f"🆕 Posts nuevos: {len(new_posts)}")
    max_id = max((int(n.get("id", 0)) for n in existing), default=0)

    new_entries = []
    for i, post in enumerate(new_posts):
        titulo = post["caption"].strip().replace("\n", " ")
        entry = {
            "id":        max_id + i + 1,
            "slug":      slugify(titulo) or f"post-{post['shortcode']}",
            "titulo":    titulo,
            "resumen":   titulo[:120],
            "imagen":    post["thumbnail"],
            "fecha":     to_rfc2822(post["taken_at"]),
            "contenido": titulo,
            "instagram": f"https://www.instagram.com/p/{post['shortcode']}",
            "tipo":      "post",
            "destacada": False,
        }
        new_entries.append(entry)
        print(f"   • [{entry['id']}] {titulo[:70]}…")

    updated = new_entries + existing
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(updated, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"\n✅ {DATA_FILE} actualizado con {len(new_entries)} post(s) nuevo(s).")


if __name__ == "__main__":
    main()
