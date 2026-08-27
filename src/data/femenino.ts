// ── Jugadoras del Córdoba CF Femenino — Segunda Federación, Grupo III ──
// Fuente: Cordópolis (elDiario.es) — reconstrucción de plantilla 2026/27
// (15 bajas, 11 caras nuevas). El club no ha publicado dorsales fijos
// para todas las jugadoras en el momento de esta actualización, así que
// el campo es opcional.
export interface JugadoraFemenino {
  nombre: string;
  posicion: string;
  grupo: "Porteras" | "Defensas" | "Centrocampistas" | "Delanteras";
  procedencia: "Continúa" | "Renovación" | "Cantera" | "Fichaje";
}

export const jugadorasFemenino: JugadoraFemenino[] = [
  // Porteras
  { nombre: "Nuria González", posicion: "Portera", grupo: "Porteras", procedencia: "Fichaje" },

  // Defensas
  { nombre: "Paz Sánchez", posicion: "Defensa", grupo: "Defensas", procedencia: "Fichaje" },
  { nombre: "Marta Arias", posicion: "Defensa", grupo: "Defensas", procedencia: "Fichaje" },
  { nombre: "Mirdja Rodríguez", posicion: "Defensa", grupo: "Defensas", procedencia: "Fichaje" },
  { nombre: "Paula Castro", posicion: "Defensa / banda", grupo: "Defensas", procedencia: "Fichaje" },
  { nombre: "Mar Orzáez", posicion: "Defensa", grupo: "Defensas", procedencia: "Continúa" },

  // Centrocampistas
  { nombre: "Irene García", posicion: "Centrocampista", grupo: "Centrocampistas", procedencia: "Fichaje" },
  { nombre: "Ana Álvarez", posicion: "Centrocampista", grupo: "Centrocampistas", procedencia: "Fichaje" },
  { nombre: "Lorena Guillén", posicion: "Centrocampista", grupo: "Centrocampistas", procedencia: "Renovación" },
  { nombre: "Elena Lozano", posicion: "Centrocampista", grupo: "Centrocampistas", procedencia: "Renovación" },
  { nombre: "María Muñoz", posicion: "Centrocampista", grupo: "Centrocampistas", procedencia: "Renovación" },
  { nombre: "Lucía Gamero", posicion: "Centrocampista", grupo: "Centrocampistas", procedencia: "Cantera" },

  // Delanteras
  { nombre: "Carlota Acín", posicion: "Delantera", grupo: "Delanteras", procedencia: "Fichaje" },
  { nombre: "Carla Rojas", posicion: "Delantera", grupo: "Delanteras", procedencia: "Cantera" },
  { nombre: "Fátima Muñoz", posicion: "Delantera", grupo: "Delanteras", procedencia: "Cantera" },
];
