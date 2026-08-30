import { useState } from "react";
import { Play } from "lucide-react";

interface Props {
  videoId: string;
  titulo: string;
  miniatura: string;
}

/**
 * Embebe un vídeo de YouTube. Si el iframe no llega a cargar (vídeo con
 * embed desactivado por el autor, restricciones de dominio, o el entorno
 * de vista previa —p. ej. Codespaces— reescribe el Referer), muestra una
 * tarjeta con la miniatura y un botón para verlo directamente en YouTube
 * en vez del feo cuadro de error nativo.
 */
export default function YoutubeEmbed({ videoId, titulo, miniatura }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-primary"
      >
        <img
          src={miniatura}
          alt={titulo}
          className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-primary-foreground">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Play size={22} fill="currentColor" />
          </div>
          <span className="font-display text-xs font-semibold uppercase tracking-wide">
            Ver en YouTube
          </span>
        </div>
      </a>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg pt-[56.25%]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={() => setError(true)}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
