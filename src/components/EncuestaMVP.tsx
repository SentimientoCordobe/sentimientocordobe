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
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-secondary">
        MVP del partido
      </p>
      <p className="mt-0.5 text-sm font-semibold leading-snug">
        {encuesta.pregunta}
      </p>

      <div
        role="radiogroup"
        aria-label={encuesta.pregunta}
        className="mt-4 grid grid-cols-1 gap-2"
      >
        {encuesta.opciones.map((op) => {
          const seleccionada = tuVoto === op.id;
          const porcentaje = pct(op.id);
          const esLider = yaVoto && total > 0 && lider === op.id;

          return (
            <button
              key={op.id}
              type="button"
              role="radio"
              aria-checked={seleccionada}
              disabled={yaVoto || cargando}
              onClick={() => votar(op.id)}
              className={`relative flex items-center gap-3 overflow-hidden rounded-md border px-3 py-2 text-left transition disabled:cursor-default ${
                seleccionada
                  ? "border-secondary bg-secondary/10"
                  : "border-transparent hover:bg-muted"
              }`}
            >
              {yaVoto && (
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 bg-secondary/15 transition-all duration-500"
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
                <span className="text-sm font-semibold">
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

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {total} {total === 1 ? "voto" : "votos"}
        </span>
        {!yaVoto && <span>Toca un jugador para votar</span>}
      </div>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
