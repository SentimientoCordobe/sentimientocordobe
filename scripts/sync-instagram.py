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
    return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")


def get_caption(node: dict) -> str:
    """Extrae el caption probando múltiples rutas del JSON de Instagram."""
    # Ruta 1: campo directo
    if node.get("caption") and isinstance(node["caption"], str):
        return node["caption"].strip()

    # Ruta 2: edge_media_to_caption
    edges = node.get("edge_media_to_caption", {}).get("edges", [])
    if edges:
        return edges[0].get("node", {}).get("text", "").strip()

    # Ruta 3: caption como objeto con text
    if isinstance(node.get("caption"), dict):
        return node["caption"].get("text", "").strip()

    # Ruta 4: accessibility_caption como fallback
    return node.get("accessibility_caption", "").strip()


def extract_from_api(data: dict) -> list[dict]:
    """Intenta extraer posts de múltiples rutas del JSON de la API."""
    if not isinstance(data, dict):
        return []

    root = data.get("data") or {}
    if not isinstance(root, dict):
        root = {}

    edges = (root.get("user") or {}).get("edge_owner_to_timeline_media", {}).get("edges", [])

    if not edges:
        edges = (root.get("xdt_api__v1__feed__user_timeline_graphql_connection") or {}).get("edges", [])

    if not edges:
        edges = [{"node": item} for item in (data.get("items") or [])]

    posts = []
    for edge in edges:
        node = edge.get("node") or {}
        shortcode = node.get("shortcode") or node.get("code") or node.get("pk")
        if not shortcode:
            continue
        caption  = get_caption(node)
        taken_at = node.get("taken_at_timestamp") or node.get("taken_at") or 0
        thumbnail = (
            node.get("thumbnail_src")
            or node.get("display_url")
            or ((node.get("thumbnail_resources") or [{}])[-1]).get("src", "")
            or ((node.get("image_versions2") or {}).get("candidates") or [{}])[0].get("url", "")
        )
        posts.append({
            "shortcode": str(shortcode),
            "caption":   caption,
            "taken_at":  int(taken_at),
            "thumbnail": thumbnail,
        })

    return posts


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
        context.add_cookies([{
            "name":     "sessionid",
            "value":    session_id,
            "domain":   ".instagram.com",
            "path":     "/",
            "secure":   True,
            "httpOnly": True,
            "sameSite": "Lax",
        }])

        page = context.new_page()
        api_data = []

        def handle_response(response):
            url = response.url
            if any(x in url for x in ["graphql/query", "api/v1/feed/user", "api/v1/users"]):
                try:
                    api_data.append(response.json())
                except Exception:
                    pass

        page.on("response", handle_response)

        print(f"🌐 Navegando a @{USERNAME}…")
        try:
            page.goto(
                f"https://www.instagram.com/{USERNAME}/",
                wait_until="networkidle",
                timeout=30_000,
            )
        except Exception:
            pass

        page.wait_for_timeout(4000)

        # Intentar scroll para cargar más posts
        page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")
        page.wait_for_timeout(2000)

        # Extraer de respuestas API interceptadas
        for data in api_data:
            found = extract_from_api(data)
            posts.extend(found)

        # Fallback: extraer del JSON embebido en el HTML
        if not posts:
            print("⚠️  API vacía, extrayendo del HTML…")
            html = page.content()

            # Buscar bloques JSON con shortcode + caption
            pattern = re.compile(
                r'"shortcode"\s*:\s*"([^"]+)"'
                r'.*?"text"\s*:\s*"((?:[^"\\]|\\.){5,})"',
                re.DOTALL
            )
            taken_pattern  = re.compile(r'"taken_at_timestamp"\s*:\s*(\d+)')
            thumb_pattern  = re.compile(r'"thumbnail_src"\s*:\s*"([^"]+)"')

            shortcodes = re.findall(r'"shortcode"\s*:\s*"([A-Za-z0-9_-]{10,})"', html)
            captions   = re.findall(r'"text"\s*:\s*"((?:[^"\\]|\\[\s\S]){5,}?)"', html)
            timestamps = re.findall(r'"taken_at_timestamp"\s*:\s*(\d+)', html)
            thumbnails = re.findall(r'"thumbnail_src"\s*:\s*"([^"]+)"', html)

            seen_sc = set()
            for i, sc in enumerate(shortcodes):
                if sc in seen_sc or len(sc) < 10:
                    continue
                seen_sc.add(sc)
                cap = captions[i].encode().decode("unicode_escape") if i < len(captions) else ""
                posts.append({
                    "shortcode": sc,
                    "caption":   cap,
                    "taken_at":  int(timestamps[i]) if i < len(timestamps) else 0,
                    "thumbnail": thumbnails[i].replace("\\u0026", "&") if i < len(thumbnails) else "",
                })

        browser.close()

    # Deduplicar por shortcode, mantener el que tenga caption más largo
    seen: dict[str, dict] = {}
    for post in posts:
        sc = post["shortcode"]
        if sc not in seen or len(post["caption"]) > len(seen[sc]["caption"]):
            seen[sc] = post

    return list(seen.values())[:MAX_POSTS]


def main():
    ig_sid = os.environ.get("IG_SESSION_ID", "").strip()
    if not ig_sid:
        print("❌ Falta IG_SESSION_ID en las variables de entorno.")
        sys.exit(1)

    posts = scrape_posts(ig_sid)
    print(f"📥 Posts obtenidos: {len(posts)}")

    if not posts:
        print("⚠️  No se obtuvieron posts. Puede que la sesión haya expirado.")
        sys.exit(1)

    # Debug: mostrar primeros posts
    for p in posts[:3]:
        print(f"   shortcode={p['shortcode']} caption={repr(p['caption'][:60])}")

    existing = []
    if DATA_FILE.exists():
        try:
            existing = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass

    existing_urls = {n.get("instagram", "") for n in existing}
    new_posts = [
        p for p in posts
        if f"https://www.instagram.com/p/{p['shortcode']}" not in existing_urls
    ]

    if not new_posts:
        print("✅ Sin novedades.")
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
            "fecha":     to_rfc2822(post["taken_at"]) if post["taken_at"] else datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT"),
            "contenido": titulo,
            "instagram": f"https://www.instagram.com/p/{post['shortcode']}",
            "tipo":      "post",
            "destacada": False,
        }
        new_entries.append(entry)
        print(f"   • [{entry['id']}] {titulo[:70] or '(sin caption)'}")

    updated = new_entries + existing
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(updated, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"\n✅ {DATA_FILE} actualizado con {len(new_entries)} post(s).")


if __name__ == "__main__":
    main()