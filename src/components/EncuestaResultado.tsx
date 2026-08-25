import { usePoll } from "../hooks/usePoll";
import type { Encuesta } from "../data/encuestas";

interface Props {
  encuesta: Encuesta;
}

export default function EncuestaResultado({ encuesta }: Props) {
  const { counts, total, tuVoto, cargando, error, votar } = usePoll(encuesta.id);
  const yaVoto = Boolean(tuVoto);

  const pct = (id: string) => {
    if (total === 0) return 0;
    return Math.round(((counts[id] ?? 0) / total) * 100);
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      {/* Cabecera estilo boleto de quiniela */}
      <div className="bg-primary px-4 py-3 text-primary-foreground">
        <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-secondary">
          Pronóstico
        </p>
        <p className="mt-0.5 text-sm font-semibold leading-snug">
          {encuesta.pregunta}
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label={encuesta.pregunta}
        className="divide-y"
      >
        {encuesta.opciones.map((op) => {
          const seleccionada = tuVoto === op.id;
          const porcentaje = pct(op.id);

          return (
            <button
              key={op.id}
              type="button"
              role="radio"
              aria-checked={seleccionada}
              disabled={yaVoto || cargando}
              onClick={() => votar(op.id)}
              className={`relative block w-full px-4 py-3 text-left transition disabled:cursor-default ${
                seleccionada ? "bg-secondary/10" : "hover:bg-muted"
              }`}
            >
              {/* Barra de resultado (solo tras votar) */}
              {yaVoto && (
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                    seleccionada ? "bg-secondary/25" : "bg-muted"
                  }`}
                  style={{ width: `${porcentaje}%` }}
                />
              )}

              <span className="relative flex items-center justify-between gap-3">
                <span
                  className={`text-sm font-semibold ${
                    seleccionada ? "text-primary" : ""
                  }`}
                >
                  {op.label}
                </span>

                {yaVoto ? (
                  <span className="font-display text-sm font-bold tabular-nums text-primary">
                    {porcentaje}%
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="h-4 w-4 shrink-0 rounded-full border-2 border-muted-foreground/40"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
        <span>
          {total} {total === 1 ? "voto" : "votos"}
        </span>
        {encuesta.cierre && <span>Cierra el {encuesta.cierre}</span>}
      </div>

      {error && (
        <p className="border-t px-4 py-2 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
