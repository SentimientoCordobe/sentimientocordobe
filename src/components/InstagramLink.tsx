// src/components/InstagramLink.tsx
interface Props {
  url: string
  titulo?: string
}

export default function InstagramLink({ url, titulo }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border p-4 transition hover:shadow-md"
      aria-label={titulo ? `Abrir post: ${titulo}` : "Abrir post de Instagram"}
    >
      <p className="font-medium">{titulo ?? "Ver publicación"}</p>
      <p className="text-sm opacity-70">Abrir en Instagram</p>
    </a>
  )
}