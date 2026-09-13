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
  id: "resultado-j6-Albacete",
  pregunta: "Albacete vs Córdoba CF — Jornada 6 , 19 sep (20:30) Estadio Carlos Belmonte",
  cierre: "19/09/2026",
  opciones: [
    { id: "local", label: "Gana el Albacete" },
    { id: "empate", label: "Empate" },
    { id: "visitante", label: "Gana el Córdoba" },
  ],
};

// Encuesta de MVP de partido disputado o a disputar.
export const encuestaMVP: Encuesta = {
  id: "mvp-j4-Sabadell",
  pregunta: "Quién fue el PEOR del Sabadell - Córdoba (Jornada 4)",
  opciones: [
    { id: "Eder", label: "Eder", dorsal: 28 },
    { id: "Percan", label: "Percan", dorsal: 9 },
    { id: "Iker Álvarez", label: "Iker Álvarez", dorsal: 1 },
    { id: "Kevin Medina", label: "Tasende", dorsal: 3 },
    { id: "Enol", label: "Enol", dorsal: 18 },
    { id: "Rubén Alves", label: "Rubén Alves", dorsal: 16 },
    { id: "Juanito Gutiérrez", label: "Juanito Gutiérrez", dorsal: 4 },
    { id: "Diarra", label: "Diarra", dorsal: 22 },
    { id: "Budesca", label: "Budesca", dorsal: 30 },
  ],
};
