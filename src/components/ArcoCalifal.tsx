interface Props {
  className?: string;
  /** Color de relleno de los arcos, en formato Tailwind (bg-*). */
  colorClassName?: string;
}

/**
 * Fila de arcos de herradura (motivo de la Mezquita-Catedral de Córdoba,
 * de donde viene el mote "califas" de la afición). Se usa como remate
 * visual entre secciones, en vez de un divisor genérico.
 */
export default function ArcoCalifal({
  className = "",
  colorClassName = "bg-primary",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-3 w-full overflow-hidden ${className}`}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className={`-mr-[1px] h-6 w-6 shrink-0 rounded-t-full ${colorClassName}`}
        />
      ))}
    </div>
  );
}
