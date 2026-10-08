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
  id: "resultado-j9-Eldense",
  pregunta: "CD Eldense vs Córdoba CF — Jornada 9, sáb 10 oct, Nuevo Pepico Amat",
  cierre: "10/10/2026",
  opciones: [
    { id: "local", label: "Gana el Eldense" },
    { id: "empate", label: "Empate" },
    { id: "visitante", label: "Gana el Córdoba" },
  ],
};

// Encuesta de MVP del último partido disputado (Córdoba 3-2 Tenerife, J8).
export const encuestaMVP: Encuesta = {
  id: "mvp-j8-Tenerife",
  pregunta: "Quién fue el MEJOR del Córdoba - Tenerife (Jornada 8)",
  opciones: [
    { id: "Isma Ruiz", label: "Isma Ruiz", dorsal: 8 },
    { id: "Percan", label: "Percan", dorsal: 9 },
    { id: "Eder", label: "Eder", dorsal: 28 },
    { id: "Diego Bri", label: "Diego Bri", dorsal: 11 },
    { id: "Adnane Ghailan", label: "Adnane Ghailan", dorsal: 14 },
    { id: "Budesca", label: "Budesca", dorsal: 30 },
    { id: "Nélson Monte", label: "Nélson Monte", dorsal: 20 },
    { id: "Iker Álvarez", label: "Iker Álvarez", dorsal: 1 },
  ],
};
