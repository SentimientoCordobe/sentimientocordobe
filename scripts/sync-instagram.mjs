/**
 * AGENTE: Sync Instagram → noticias.manual.json
 *
 * Detecta nuevos posts en @sentimientocordobe y los añade al JSON.
 * Uso: node scripts/sync-instagram.mjs
 *
 * Variables de entorno (opcionales):
 *   DATA_FILE   → ruta al JSON (default: src/data/noticias.manual.json)
 *   RSSHUB_BASE → instancia RSSHub (default: https://rsshub.app)
 */

import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

// ── Configuración ─────────────────────────────────────────────────────────────
const USERNAME  = "sentimientocordobe"
const DATA_FILE = process.env.DATA_FILE   || "src/data/noticias.manual.json"
const RSSHUB    = process.env.RSSHUB_BASE || "https://rsshub.app"

// ── Helpers ───────────────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")          // quita tildes
    .replace(/[^\w\s-]/g, " ")                 // elimina caracteres especiales
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 110)
}

function getCDATA(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${tag}>`)
  const m = xml.match(re)
  return m ? (m[1] ?? m[2] ?? "").trim() : ""
}

function extractImage(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/)
  return m ? m[1] : ""
}

// ── Fetch RSS via RSSHub ──────────────────────────────────────────────────────
async function fetchPosts() {
  const url = `${RSSHUB}/instagram/user/${USERNAME}`
  console.log(`📡 Fetching: ${url}`)

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SentimientoBot/1.0)" },
    signal: AbortSignal.timeout(15_000),
  })

  if (!res.ok) throw new Error(`RSS respondió ${res.status}: ${res.statusText}`)

  const xml = await res.text()
  const posts = []
  const itemRe = /<item>([\s\S]*?)<\/item>/g
  let m

  while ((m = itemRe.exec(xml)) !== null) {
    const item  = m[1]
    const title = getCDATA(item, "title")
    const link  = getCDATA(item, "link") || getCDATA(item, "guid")
    const date  = getCDATA(item, "pubDate")
    const desc  = getCDATA(item, "description")
    const imagen = extractImage(desc)

    if (link && title) {
      posts.push({ title, link, date, imagen })
    }
  }

  return posts
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Obtener posts de Instagram
  const posts = await fetchPosts()
  console.log(`📥 Posts obtenidos del feed: ${posts.length}`)

  if (posts.length === 0) {
    console.log("⚠️  El feed llegó vacío. Abortando sin cambios.")
    process.exit(0)
  }

  // 2. Leer JSON actual
  const filePath = resolve(DATA_FILE)
  let existing = []
  try {
    existing = JSON.parse(readFileSync(filePath, "utf-8"))
  } catch {
    console.warn(`⚠️  No se pudo leer ${filePath}. Se creará desde cero.`)
  }

  // 3. Detectar posts nuevos
  const existingUrls = new Set(existing.map((n) => n.instagram).filter(Boolean))
  const newPosts     = posts.filter((p) => !existingUrls.has(p.link))

  if (newPosts.length === 0) {
    console.log("✅ Sin novedades. El JSON ya está actualizado.")
    // Señal para GitHub Actions: nada que commitear
    process.exit(0)
  }

  console.log(`🆕 Posts nuevos detectados: ${newPosts.length}`)

  // 4. Calcular el próximo id
  const maxId = existing.reduce((max, n) => Math.max(max, Number(n.id) || 0), 0)

  // 5. Construir entradas nuevas con el esquema Noticia
  const newEntries = newPosts.map((post, i) => ({
    id:         maxId + i + 1,
    slug:       slugify(post.title),
    titulo:     post.title,
    resumen:    post.title.slice(0, 120),
    imagen:     post.imagen || "",
    fecha:      post.date || new Date().toUTCString(),
    contenido:  post.title,
    instagram:  post.link,
    tipo:       "post",
    destacada:  false,
  }))

  // 6. Prepend (más recientes primero) y guardar
  const updated = [...newEntries, ...existing]
  writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8")

  console.log(`✅ ${filePath} actualizado con ${newEntries.length} post(s) nuevo(s):`)
  newEntries.forEach((e) => console.log(`   • [${e.id}] ${e.titulo.slice(0, 60)}...`))

  // Señal para GitHub Actions: hay cambios
  process.exitCode = 0
}

main().catch((err) => {
  console.error("❌ Error en el agente:", err.message)
  process.exit(1)
})
