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

// Clasificación OFICIAL de LALIGA HYPERMOTION 2026/27 tras la jornada 6

export const clasificacion: EquipoClasificacion[] = [
  { posicion: 1, equipo: "CD Castellón", puntos: 16, pj: 6, pg: 5, pe: 1, pp: 0, gf: 12, gc: 2, dg: 10 },
  { posicion: 2, equipo: "SD Eibar", puntos: 15, pj: 6, pg: 5, pe: 0, pp: 1, gf: 12, gc: 4, dg: 8 },
  { posicion: 3, equipo: "RCD Mallorca", puntos: 13, pj: 6, pg: 4, pe: 1, pp: 1, gf: 8, gc: 2, dg: 6 },
  { posicion: 4, equipo: "UD Almería", puntos: 12, pj: 6, pg: 4, pe: 0, pp: 2, gf: 10, gc: 4, dg: 6 },
  { posicion: 5, equipo: "Burgos CF", puntos: 11, pj: 6, pg: 3, pe: 2, pp: 1, gf: 10, gc: 7, dg: 3 },
  { posicion: 6, equipo: "CE Sabadell", puntos: 11, pj: 6, pg: 3, pe: 2, pp: 1, gf: 7, gc: 5, dg: 2 },
  { posicion: 7, equipo: "CD Leganés", puntos: 11, pj: 6, pg: 3, pe: 2, pp: 1, gf: 6, gc: 5, dg: 1 },
  { posicion: 8, equipo: "Girona FC", puntos: 10, pj: 6, pg: 3, pe: 1, pp: 2, gf: 12, gc: 8, dg: 4 },
  { posicion: 9, equipo: "Real Sporting", puntos: 10, pj: 6, pg: 3, pe: 1, pp: 2, gf: 5, gc: 4, dg: 1 },
  { posicion: 10, equipo: "UD Las Palmas", puntos: 10, pj: 6, pg: 3, pe: 1, pp: 2, gf: 8, gc: 8, dg: 0 },
  { posicion: 11, equipo: "CD Tenerife", puntos: 10, pj: 6, pg: 3, pe: 1, pp: 2, gf: 7, gc: 8, dg: -1 },
  { posicion: 12, equipo: "Real Sociedad B", puntos: 8, pj: 6, pg: 2, pe: 2, pp: 2, gf: 8, gc: 7, dg: 1 },
  { posicion: 13, equipo: "Real Oviedo", puntos: 8, pj: 6, pg: 2, pe: 2, pp: 2, gf: 5, gc: 4, dg: 1 },
  { posicion: 14, equipo: "Granada CF", puntos: 8, pj: 6, pg: 2, pe: 2, pp: 2, gf: 8, gc: 8, dg: 0 },
  { posicion: 15, equipo: "Celta Fortuna", puntos: 7, pj: 6, pg: 2, pe: 1, pp: 3, gf: 7, gc: 10, dg: -3 },
  { posicion: 16, equipo: "Córdoba CF", puntos: 6, pj: 6, pg: 2, pe: 0, pp: 4, gf: 9, gc: 13, dg: -4, esCordoba: true },
  { posicion: 17, equipo: "CD Eldense", puntos: 5, pj: 6, pg: 1, pe: 2, pp: 3, gf: 4, gc: 8, dg: -4 },
  { posicion: 18, equipo: "Real Valladolid", puntos: 5, pj: 6, pg: 1, pe: 2, pp: 3, gf: 3, gc: 8, dg: -5 },
  { posicion: 19, equipo: "Cádiz CF", puntos: 3, pj: 6, pg: 0, pe: 3, pp: 3, gf: 6, gc: 9, dg: -3 },
  { posicion: 20, equipo: "FC Andorra", puntos: 3, pj: 6, pg: 1, pe: 0, pp: 5, gf: 9, gc: 13, dg: -4 },
  { posicion: 21, equipo: "Albacete BP", puntos: 1, pj: 6, pg: 0, pe: 1, pp: 5, gf: 4, gc: 10, dg: -6 },
  { posicion: 22, equipo: "AD Ceuta FC", puntos: 1, pj: 6, pg: 0, pe: 1, pp: 5, gf: 3, gc: 16, dg: -13 },
];