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

// Clasificación de LALIGA HYPERMOTION 2026/27 tras la jornada 8 (22 equipos,
// 8 partidos jugados cada uno). Fuente: alargue.com/ligas/laliga-hypermotion,
// consultada tras el Córdoba 3-2 Tenerife (lunes 05/10/2026). Pendiente de
// contrastar con LALIGA oficial: alargue da 17 goles encajados al Córdoba y
// la suma de los partidos de la jornada 6 a 8 da 18.
export const clasificacion: EquipoClasificacion[] = [
  { posicion: 1, equipo: "CD Castellón", puntos: 20, pj: 8, pg: 6, pe: 2, pp: 0, gf: 15, gc: 3, dg: 12 },
  { posicion: 2, equipo: "SD Eibar", puntos: 21, pj: 8, pg: 7, pe: 0, pp: 1, gf: 18, gc: 7, dg: 11 },
  { posicion: 3, equipo: "UD Almería", puntos: 18, pj: 8, pg: 6, pe: 0, pp: 2, gf: 13, gc: 5, dg: 8 },
  { posicion: 4, equipo: "RCD Mallorca", puntos: 14, pj: 8, pg: 4, pe: 2, pp: 2, gf: 8, gc: 3, dg: 5 },
  { posicion: 5, equipo: "Girona FC", puntos: 14, pj: 8, pg: 4, pe: 2, pp: 2, gf: 13, gc: 8, dg: 5 },
  { posicion: 6, equipo: "Burgos CF", puntos: 14, pj: 8, pg: 4, pe: 2, pp: 2, gf: 12, gc: 9, dg: 3 },
  { posicion: 7, equipo: "CE Sabadell", puntos: 13, pj: 8, pg: 3, pe: 4, pp: 1, gf: 8, gc: 6, dg: 2 },
  { posicion: 8, equipo: "Real Sporting", puntos: 13, pj: 8, pg: 4, pe: 1, pp: 3, gf: 8, gc: 8, dg: 0 },
  { posicion: 9, equipo: "Granada CF", puntos: 11, pj: 8, pg: 3, pe: 2, pp: 3, gf: 13, gc: 13, dg: 0 },
  { posicion: 10, equipo: "Real Oviedo", puntos: 11, pj: 8, pg: 3, pe: 2, pp: 3, gf: 8, gc: 8, dg: 0 },
  { posicion: 11, equipo: "UD Las Palmas", puntos: 11, pj: 8, pg: 3, pe: 2, pp: 3, gf: 12, gc: 13, dg: -1 },
  { posicion: 12, equipo: "CD Tenerife", puntos: 11, pj: 8, pg: 3, pe: 2, pp: 3, gf: 10, gc: 12, dg: -2 },
  { posicion: 13, equipo: "CD Leganés", puntos: 11, pj: 8, pg: 3, pe: 2, pp: 3, gf: 6, gc: 11, dg: -5 },
  { posicion: 14, equipo: "Real Valladolid", puntos: 9, pj: 8, pg: 2, pe: 3, pp: 3, gf: 8, gc: 11, dg: -3 },
  { posicion: 15, equipo: "Córdoba CF", puntos: 9, pj: 8, pg: 3, pe: 0, pp: 5, gf: 13, gc: 17, dg: -4, esCordoba: true },
  { posicion: 16, equipo: "Real Sociedad B", puntos: 8, pj: 8, pg: 2, pe: 2, pp: 4, gf: 11, gc: 13, dg: -2 },
  { posicion: 17, equipo: "CD Eldense", puntos: 8, pj: 8, pg: 2, pe: 2, pp: 4, gf: 8, gc: 10, dg: -2 },
  { posicion: 18, equipo: "Celta Fortuna", puntos: 8, pj: 8, pg: 2, pe: 2, pp: 4, gf: 10, gc: 14, dg: -4 },
  { posicion: 19, equipo: "Cádiz CF", puntos: 7, pj: 8, pg: 1, pe: 4, pp: 3, gf: 11, gc: 10, dg: 1 },
  { posicion: 20, equipo: "FC Andorra", puntos: 7, pj: 8, pg: 2, pe: 1, pp: 5, gf: 12, gc: 15, dg: -3 },
  { posicion: 21, equipo: "AD Ceuta FC", puntos: 5, pj: 8, pg: 1, pe: 2, pp: 5, gf: 7, gc: 18, dg: -11 },
  { posicion: 22, equipo: "Albacete BP", puntos: 1, pj: 8, pg: 0, pe: 1, pp: 7, gf: 5, gc: 15, dg: -10 },
];
