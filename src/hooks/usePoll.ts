import { useCallback, useEffect, useState } from "react";

const VOTER_ID_KEY = "cordobacf_voter_id";

function getVoterId(): string {
  let id = localStorage.getItem(VOTER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VOTER_ID_KEY, id);
  }
  return id;
}

interface EstadoEncuesta {
  counts: Record<string, number>;
  total: number;
  tuVoto: string | null;
  cargando: boolean;
  error: string | null;
}

export function usePoll(pollId: string) {
  const votoLocalKey = `voto:${pollId}`;

  const [estado, setEstado] = useState<EstadoEncuesta>({
    counts: {},
    total: 0,
    tuVoto: null,
    cargando: true,
    error: null,
  });

  const cargar = useCallback(async () => {
    try {
      const res = await fetch(`/api/votes?poll=${encodeURIComponent(pollId)}`);
      if (!res.ok) throw new Error("respuesta no ok");
      const data = await res.json();
      setEstado({
        counts: data.counts ?? {},
        total: data.total ?? 0,
        tuVoto: localStorage.getItem(votoLocalKey),
        cargando: false,
        error: null,
      });
    } catch {
      setEstado((s) => ({
        ...s,
        cargando: false,
        error: "No se pudo cargar la encuesta ahora mismo.",
      }));
    }
  }, [pollId, votoLocalKey]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const votar = useCallback(
    async (option: string) => {
      // Actualización optimista: se ve el voto al instante, sin esperar red.
      setEstado((s) => ({
        ...s,
        tuVoto: option,
        counts: { ...s.counts, [option]: (s.counts[option] ?? 0) + 1 },
        total: s.total + 1,
      }));
      localStorage.setItem(votoLocalKey, option);

      try {
        const res = await fetch("/api/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            poll: pollId,
            option,
            voterId: getVoterId(),
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setEstado({
            counts: data.counts ?? {},
            total: data.total ?? 0,
            tuVoto: data.tuVoto ?? option,
            cargando: false,
            error: null,
          });
          if (data.tuVoto) localStorage.setItem(votoLocalKey, data.tuVoto);
        }
      } catch {
        // Si falla la red, el voto optimista se queda visible igualmente;
        // la próxima carga (cargar()) resincroniza con el servidor.
      }
    },
    [pollId, votoLocalKey]
  );

  return { ...estado, votar, recargar: cargar };
}
