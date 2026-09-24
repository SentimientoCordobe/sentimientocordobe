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
  id: "resultado-j7-Valladolid",
  pregunta: "Valladolid vs Córdoba CF — Jornada 7 , 27 sep (14:00) Estadio Carlos Belmonte",
  cierre: "27/09/2026",
  opciones: [
    { id: "local", label: "Gana el Valladolid" },
    { id: "empate", label: "Empate" },
    { id: "visitante", label: "Gana el Córdoba" },
  ],
};

// Encuesta de MVP de partido disputado o a disputar.
export const encuestaMVP: Encuesta = {
  id: "mvp-j5-Almeria",
  pregunta: "Quién fue el mejor del Albacete - Córdoba (Jornada 6)",
  opciones: [
    { id: "Isma", label: "Isma", dorsal: 8 },
    { id: "Percan", label: "Percan", dorsal: 9 },
    { id: "Kevin Medina", label: "Kevin Medina", dorsal: 10 },
    { id: "Enol", label: "Enol", dorsal: 18 },
    { id: "Rubén Alves", label: "Rubén Alves", dorsal: 16 },
    { id: "Diarra", label: "Diarra", dorsal: 22 },
    { id: "Budesca", label: "Budesca", dorsal: 30 },
    { id: "Eder", label: "Eder García", dorsal: 28},
    { id: "Adnane", label "Adnane Ghailan", dorsal: 14}
  ],
};
