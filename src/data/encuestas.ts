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
  cierre: "31/08/2026",
  opciones: [
    { id: "local", label: "Gana el Córdoba" },
    { id: "empate", label: "Empate" },
    { id: "visitante", label: "Gana el Granada" },
  ],
};

// Encuesta de MVP de partido disputado o a disputar.
export const encuestaMVP: Encuesta = {
  id: "mvp-j3-Granada",
  pregunta: "Quién será el MVP del Córdoba - Granada (Jornada 3)",
  opciones: [
    { id: "Eder", label: "Eder", dorsal: 28 },
    { id: "diegobri", label: "Diego Bri", dorsal: 11 },
    { id: "ikeralvarez", label: "Iker Álvarez", dorsal: 1 },
    { id: "Carracedo", label: "Carracedo", dorsal: 23 },
    { id: "ismaruiz", label: "Isma Ruiz", dorsal: 8 },
    { id: "Rubén Alves", label: "Rubén Alves", dorsal: 16 },
    { id: "Alex Martín", label: "Alex Martín", dorsal: 4 },
    { id: "Diarra", label: "Diarra", dorsal: 22 },
    { id: "Egoitz", label: "Isma Ruiz", dorsal: 27 }


    ,
  ],
};
