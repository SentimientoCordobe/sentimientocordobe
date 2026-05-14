export interface Noticia {
  id: string | number
  slug?: string
  titulo: string
  resumen: string
  imagen?: string
  fecha: string
  contenido?: string
  instagram?: string
  url?: string
  tipo?: "post" | "fallback"
  destacada?: boolean
  fuente?: string
  likes?: number
  comentarios?: number
}

import noticiasManualRaw from "./noticias.manual.json"
import noticiasFallbackRaw from "./noticias.json"

const noticiasManual = noticiasManualRaw as Noticia[]
const noticiasFallback = noticiasFallbackRaw as Noticia[]

function parseDate(value?: string): number {
  const ts = value ? Date.parse(value) : NaN
  return Number.isFinite(ts) ? ts : 0
}

function normalize(noticia: Noticia): Noticia {
  return {
    ...noticia,
    titulo: noticia.titulo?.trim() ?? "",
    resumen: noticia.resumen?.trim() ?? "",
    contenido: noticia.contenido?.trim(),
    imagen: noticia.imagen?.trim(),
    instagram: noticia.instagram?.trim(),
    url: noticia.url?.trim() ?? noticia.instagram?.trim(),
    fuente: noticia.fuente?.trim() ?? "Instagram",
    likes: Number.isFinite(noticia.likes ?? NaN) ? (noticia.likes as number) : 0,
    comentarios: Number.isFinite(noticia.comentarios ?? NaN)
      ? (noticia.comentarios as number)
      : 0,
  }
}

function keyOf(n: Noticia): string {
  return (
    n.instagram ||
    n.url ||
    n.slug ||
    String(n.id)
  )
}

function isRealPost(n: Noticia): boolean {
  return n.id !== "fallback" && n.tipo !== "fallback"
}

function dedupeByKey(items: Noticia[]): Noticia[] {
  const map = new Map<string, Noticia>()

  for (const item of items) {
    const normalized = normalize(item)
    const key = keyOf(normalized)

    const current = map.get(key)
    if (!current) {
      map.set(key, normalized)
      continue
    }

    // Prioriza el contenido manual sobre cualquier fallback o duplicado
    const currentIsManual = noticiasManual.some(
      (m) => keyOf(normalize(m)) === key
    )
    const nextIsManual = noticiasManual.some(
      (m) => keyOf(normalize(m)) === key
    )

    if (!currentIsManual && nextIsManual) {
      map.set(key, normalized)
      continue
    }

    const currentDate = parseDate(current.fecha)
    const nextDate = parseDate(normalized.fecha)

    if (nextDate > currentDate) {
      map.set(key, normalized)
    }
  }

  return Array.from(map.values())
}

function sortNewestFirst(items: Noticia[]): Noticia[] {
  return [...items].sort((a, b) => parseDate(b.fecha) - parseDate(a.fecha))
}

const manualClean = noticiasManual
  .filter(Boolean)
  .map(normalize)
  .filter(isRealPost)

const fallbackClean = noticiasFallback
  .filter(Boolean)
  .map(normalize)

export const noticias: Noticia[] =
  manualClean.length > 0
    ? sortNewestFirst(dedupeByKey(manualClean))
    : sortNewestFirst(dedupeByKey(fallbackClean))

export const noticiasDestacadas: Noticia[] = noticias.filter((n) => n.destacada)

export const ultimaNoticia: Noticia | null = noticias[0] ?? null

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug)
}