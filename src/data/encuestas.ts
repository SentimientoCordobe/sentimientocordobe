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
  id: "resultado-j8-TENERIFE",
  pregunta: "Córdoba CF VS TENERIFE — Jornada 8 , 5 oct (20:30) Estadio NUEVO ARCÁNGEL",
  cierre: "27/09/2026",
  opciones: [
    { id: "local", label: "Gana el Córdoba" },
    { id: "empate", label: "Empate" },
    { id: "visitante", label: "Gana el Tenerife" },
  ],
};

// Encuesta de MVP de partido disputado o a disputar.
export const encuestaMVP: Encuesta = {
  id: "mvp-j5-Almeria",
  pregunta: "Quién fue el peor del Valladolid - Córdoba (Jornada 7)",
  opciones: [
    { id: "Isma", label: "Isma", dorsal: 8 },
    { id: "Percan", label: "Percan", dorsal: 9 },
    { id: "Kevin Medina", label: "Kevin Medina", dorsal: 10 },
    { id: "Enol", label: "Enol", dorsal: 18 },
    { id: "Rubén Alves", label: "Rubén Alves", dorsal: 16 },
    { id: "Diarra", label: "Diarra", dorsal: 22 },
    { id: "Budesca", label: "Budesca", dorsal: 30 },
    { id: "Alex", label: "Alex Martín",  dorsal: 4},
    { id: "Adnane", label: "Adnane Ghailan", dorsal: 14}
  ],
};
