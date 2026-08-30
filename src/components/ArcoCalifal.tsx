interface Props {
  className?: string;
  /** Color de relleno de los arcos, en formato Tailwind (bg-*). */
  colorClassName?: string;
}

// Un arco (dome) por cada "loseta" de 24×12px: círculo de radio 12
// centrado en la base de la loseta, de forma que solo se ve su mitad
// superior — un semicírculo perfecto que toca los bordes izquierdo,
// derecho y superior de la loseta.
const ARCO_MASK =
  "radial-gradient(circle at 12px 12px, black 12px, transparent 12.5px)";

/**
 * Fila de arcos de herradura (motivo de la Mezquita-Catedral de Córdoba,
 * de donde viene el mote "califas" de la afición). Se usa como remate
 * visual entre secciones, en vez de un divisor genérico.
 *
 * Implementado con un mask-image de CSS que se repite (mask-repeat)
 * en vez de generar N elementos por JS: así se adapta automáticamente
 * a cualquier ancho de pantalla sin dejar hueco en pantallas anchas
 * (como pasaba antes con un número fijo de arcos) ni recortarse de más
 * en pantallas estrechas.
 */
export default function ArcoCalifal({
  className = "",
  colorClassName = "bg-primary",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`h-3 w-full ${colorClassName} ${className}`}
      style={{
        WebkitMaskImage: ARCO_MASK,
        maskImage: ARCO_MASK,
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
        WebkitMaskSize: "24px 12px",
        maskSize: "24px 12px",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}
