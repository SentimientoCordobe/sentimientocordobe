export interface EquipoClasificacion {
  posicion: number
  equipo: string
  puntos: number
  pj?: number
  pg?: number
  pe?: number
  pp?: number
  gf?: number
  gc?: number
  dg?: number

  esCordoba?: boolean;
}

// Clasificación de LALIGA Hypermotion (Segunda División) 2026/27,
// actualizada a 24/08/2026 (jornadas 1-2, algunos equipos con la J2
// todavía pendiente). Actualiza jornada a jornada — recomendable
// automatizar esta tabla con una API o feed oficial en vez de a mano.
export const clasificacion: EquipoClasificacion[] = [
  { posicion: 1, equipo: "UD Las Palmas", puntos: 6, pj: 2, pg: 2, pe: 0, pp: 0, gf: 4, gc: 1, dg: 3 },
  { posicion: 2, equipo: "CD Tenerife", puntos: 6, pj: 2, pg: 2, pe: 0, pp: 0, gf: 4, gc: 1, dg: 3 },
  { posicion: 3, equipo: "CD Leganés", puntos: 4, pj: 2, pg: 1, pe: 1, pp: 0, gf: 2, gc: 1, dg: 1 },
  { posicion: 4, equipo: "FC Andorra", puntos: 3, pj: 1, pg: 1, pe: 0, pp: 0, gf: 5, gc: 1, dg: 4 },
  { posicion: 5, equipo: "RCD Mallorca", puntos: 3, pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2 },
  { posicion: 6, equipo: "UD Almería", puntos: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 3, gc: 1, dg: 2 },
  { posicion: 7, equipo: "CD Castellón", puntos: 3, pj: 1, pg: 1, pe: 0, pp: 0, gf: 1, gc: 0, dg: 1 },
  { posicion: 8, equipo: "Burgos CF", puntos: 3, pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 2, dg: 1 },
  { posicion: 9, equipo: "Córdoba CF", puntos: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 4, gc: 4, dg: 0, esCordoba: true },
  { posicion: 10, equipo: "Real Sociedad B", puntos: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 2, gc: 2, dg: 0 },
  { posicion: 11, equipo: "SD Eibar", puntos: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 2, gc: 3, dg: -1 },
  { posicion: 12, equipo: "Real Sporting", puntos: 1, pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0 },
  { posicion: 13, equipo: "CE Sabadell", puntos: 1, pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0 },
  { posicion: 14, equipo: "Cádiz CF", puntos: 1, pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0 },
  { posicion: 15, equipo: "RC Celta Fortuna", puntos: 1, pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0 },
  { posicion: 16, equipo: "Granada CF", puntos: 1, pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0 },
  { posicion: 17, equipo: "Real Oviedo", puntos: 1, pj: 2, pg: 0, pe: 1, pp: 1, gf: 0, gc: 1, dg: -1 },
  { posicion: 18, equipo: "Girona FC", puntos: 1, pj: 2, pg: 0, pe: 1, pp: 1, gf: 2, gc: 3, dg: -1 },
  { posicion: 19, equipo: "Albacete Balompié", puntos: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 2, gc: 4, dg: -2 },
  { posicion: 20, equipo: "CD Eldense", puntos: 0, pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 3, dg: -3 },
  { posicion: 21, equipo: "Real Valladolid", puntos: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 0, gc: 3, dg: -3 },
  { posicion: 22, equipo: "AD Ceuta FC", puntos: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 1, gc: 7, dg: -6 },
];
