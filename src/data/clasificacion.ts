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
// PROVISIONAL a 14/09/2026: 10 de los 11 partidos de la jornada 5 ya
// están jugados. Solo falta Celta Fortuna - Eibar (lunes 14/09, 20:30),
// por eso esos dos equipos siguen con 4 partidos. Actualízalos en
// cuanto termine ese partido y listo, la jornada 5 quedará cerrada.
export const clasificacion: EquipoClasificacion[] = [
  { posicion: 1, equipo: "CD Castellón", puntos: 13, pj: 5, pg: 4, pe: 1, pp: 0, gf: 7, gc: 2, dg: 5 },
  { posicion: 2, equipo: "Mallorca", puntos: 10, pj: 5, pg: 3, pe: 1, pp: 1, gf: 7, gc: 2, dg: 5 },
  { posicion: 3, equipo: "Tenerife", puntos: 10, pj: 5, pg: 3, pe: 1, pp: 1, gf: 7, gc: 3, dg: 4 },
  { posicion: 4, equipo: "UD Las Palmas", puntos: 10, pj: 5, pg: 3, pe: 1, pp: 1, gf: 7, gc: 6, dg: 1 },
  { posicion: 5, equipo: "Almería", puntos: 9, pj: 5, pg: 3, pe: 0, pp: 2, gf: 8, gc: 4, dg: 4 },
  { posicion: 6, equipo: "Eibar", puntos: 9, pj: 4, pg: 3, pe: 0, pp: 1, gf: 6, gc: 3, dg: 3 },
  { posicion: 7, equipo: "Celta Fortuna", puntos: 8, pj: 4, pg: 2, pe: 1, pp: 1, gf: 7, gc: 4, dg: 3 },
  { posicion: 8, equipo: "Real Oviedo", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 4, gc: 1, dg: 3 },
  { posicion: 9, equipo: "Real Sociedad B", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 8, gc: 6, dg: 2 },
  { posicion: 10, equipo: "Burgos CF", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 8, gc: 6, dg: 2 },
  { posicion: 11, equipo: "Granada", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 6, gc: 5, dg: 1 },
  { posicion: 12, equipo: "CE Sabadell", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 4, gc: 4, dg: 0 },
  { posicion: 13, equipo: "Leganés", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 3, gc: 3, dg: 0 },
  { posicion: 14, equipo: "Girona FC", puntos: 7, pj: 5, pg: 2, pe: 1, pp: 2, gf: 10, gc: 7, dg: 3 },
  { posicion: 15, equipo: "Real Sporting", puntos: 7, pj: 5, pg: 2, pe: 1, pp: 2, gf: 2, gc: 3, dg: -1 },
  { posicion: 16, equipo: "Eldense", puntos: 5, pj: 5, pg: 1, pe: 2, pp: 2, gf: 3, gc: 6, dg: -3 },
  { posicion: 17, equipo: "Real Valladolid", puntos: 4, pj: 5, pg: 1, pe: 1, pp: 3, gf: 2, gc: 7, dg: -5 },
  { posicion: 18, equipo: "FC Andorra", puntos: 3, pj: 5, pg: 1, pe: 0, pp: 4, gf: 8, gc: 10, dg: -2 },
  { posicion: 19, equipo: "Cádiz", puntos: 3, pj: 5, pg: 0, pe: 3, pp: 2, gf: 5, gc: 7, dg: -2 },
  { posicion: 20, equipo: "Córdoba CF", puntos: 3, pj: 5, pg: 1, pe: 0, pp: 4, gf: 7, gc: 12, dg: -5, esCordoba: true },
  { posicion: 21, equipo: "Albacete", puntos: 1, pj: 5, pg: 0, pe: 1, pp: 4, gf: 3, gc: 8, dg: -5 },
  { posicion: 22, equipo: "AD Ceuta FC", puntos: 0, pj: 5, pg: 0, pe: 0, pp: 5, gf: 2, gc: 15, dg: -13 },
];
 



