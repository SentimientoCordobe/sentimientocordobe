import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { noticias } from "../data/noticias";
import InstagramEmbed from "../components/InstagramLink";

export default function Noticia(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  const noticiaEncontrada = slug
    ? noticias.find((n) => n.slug === slug)
    : undefined;

  if (!noticiaEncontrada) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">
          Noticia no encontrada
        </h1>
        <p className="mt-2 text-muted-foreground">
          Puede que el enlace esté roto o la noticia ya no esté disponible.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-secondary hover:underline"
        >
          <ArrowLeft size={16} />
          Volver a portada
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-secondary hover:underline"
      >
        <ArrowLeft size={16} />
        Volver a noticias
      </Link>

      {noticiaEncontrada.imagen && (
        <img
          src={noticiaEncontrada.imagen}
          alt={noticiaEncontrada.titulo}
          className="mb-6 w-full rounded-lg object-cover"
        />
      )}

      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        {noticiaEncontrada.fuente && (
          <span className="font-semibold text-primary">
            {noticiaEncontrada.fuente}
          </span>
        )}
        <span>{noticiaEncontrada.fecha}</span>
      </div>

      <h1 className="mb-6 font-display text-3xl font-bold leading-tight md:text-4xl">
        {noticiaEncontrada.titulo}
      </h1>

      {noticiaEncontrada.resumen && (
        <p className="mb-6 text-lg font-medium text-muted-foreground">
          {noticiaEncontrada.resumen}
        </p>
      )}

      <div className="prose prose-lg mb-10 max-w-none whitespace-pre-line leading-relaxed text-foreground">
        {noticiaEncontrada.contenido}
      </div>

      {noticiaEncontrada.instagram && (
        <InstagramEmbed url={noticiaEncontrada.instagram} />
      )}

      {noticiaEncontrada.url && (
        <a
          href={noticiaEncontrada.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:shadow-md"
        >
          Ver fuente original
          <ExternalLink size={14} />
        </a>
      )}
    </article>
  );
}
