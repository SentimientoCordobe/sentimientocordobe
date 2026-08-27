import { usePoll } from "../hooks/usePoll";
import type { Encuesta } from "../data/encuestas";

interface Props {
  encuesta: Encuesta;
}

export default function EncuestaMVP({ encuesta }: Props) {
  const { counts, total, tuVoto, cargando, error, votar } = usePoll(encuesta.id);
  const yaVoto = Boolean(tuVoto);

  const pct = (id: string) => {
    if (total === 0) return 0;
    return Math.round(((counts[id] ?? 0) / total) * 100);
  };

  const lider = encuesta.opciones.reduce(
    (max, op) => ((counts[op.id] ?? 0) > (counts[max] ?? 0) ? op.id : max),
    encuesta.opciones[0]?.id
  );

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      {/* Cabecera a juego con la encuesta de pronóstico */}
      <div className="bg-primary px-4 py-3 text-primary-foreground">
        <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-secondary">
          MVP del partido
        </p>
        <p className="mt-0.5 text-sm font-semibold leading-snug">
          {encuesta.pregunta}
        </p>
      </div>

      {/* Filas de jugadores en rayas blanco/verde, como la camiseta blanquiverde */}
      <div
        role="radiogroup"
        aria-label={encuesta.pregunta}
        className="divide-y divide-primary/10"
      >
        {encuesta.opciones.map((op, i) => {
          const seleccionada = tuVoto === op.id;
          const porcentaje = pct(op.id);
          const esLider = yaVoto && total > 0 && lider === op.id;
          const raya = i % 2 === 0 ? "bg-white" : "bg-primary/[0.06]";

          return (
            <button
              key={op.id}
              type="button"
              role="radio"
              aria-checked={seleccionada}
              disabled={yaVoto || cargando}
              onClick={() => votar(op.id)}
              className={`relative flex w-full items-center gap-3 overflow-hidden px-4 py-2.5 text-left transition disabled:cursor-default ${
                seleccionada ? "bg-secondary/15" : `${raya} hover:bg-secondary/10`
              }`}
            >
              {yaVoto && (
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                    seleccionada ? "bg-secondary/20" : "bg-primary/10"
                  }`}
                  style={{ width: `${porcentaje}%` }}
                />
              )}

              {/* "Cromo": dorsal en círculo dorado sobre verde, como una camiseta */}
              <span
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
                  seleccionada
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {op.dorsal ?? "?"}
              </span>

              <span className="relative z-10 flex flex-1 items-center justify-between gap-2">
                <span
                  className={`text-sm font-semibold ${
                    seleccionada ? "text-primary" : ""
                  }`}
                >
                  {op.label}
                  {esLider && (
                    <span className="ml-1.5 text-secondary" aria-label="Va en cabeza">
                      ★
                    </span>
                  )}
                </span>

                {yaVoto && (
                  <span className="font-display text-sm font-bold tabular-nums text-primary">
                    {porcentaje}%
                  </span>
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
        {!yaVoto && <span>Toca un jugador para votar</span>}
      </div>

      {error && (
        <p className="border-t px-4 py-2 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

