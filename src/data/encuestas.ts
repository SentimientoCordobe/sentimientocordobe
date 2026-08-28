export interface OpcionEncuesta {
  id: string;
  label: string;
  dorsal?: number; // para las fichas de jugador de la encuesta MVP
}

export interface Encuesta {
  id: string;
  pregunta: string;
  cierre?: string; // fecha orientativa de cierre, solo informativa en la UI
  opciones: OpcionEncuesta[];
}

export const encuestaResultado: Encuesta = {
  id: "resultado-j3-granada",
  pregunta: "Córdoba CF vs Granada CF — Jornada 3, 30 ago (Nuevo Arcángel)",
  cierre: "30/08/2026",
  opciones: [
    { id: "local", label: "Gana el Córdoba" },
    { id: "empate", label: "Empate" },
    { id: "visitante", label: "Gana el Granada" },
  ],
};

// Encuesta de MVP del último partido disputado.
export const encuestaMVP: Encuesta = {
  id: "mvp-j2-girona",
  pregunta: "MVP del Córdoba 2-1 Girona (Jornada 2)",
  opciones: [
    { id: "victor", label: "Víctor", dorsal: 25 },
    { id: "diegobri", label: "Diego Bri", dorsal: 11 },
    { id: "ikeralvarez", label: "Iker Álvarez", dorsal: 1 },
    { id: "theo", label: "Théo", dorsal: 7 },
    { id: "ismaruiz", label: "Isma Ruiz", dorsal: 8 },
  ],
};
