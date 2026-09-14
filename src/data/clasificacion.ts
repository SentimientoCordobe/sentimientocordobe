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
// PROVISIONAL a 13/09/2026: la jornada 5 todavía no ha terminado.
// Partidos de la J5 ya confirmados (7 de 11): Burgos 3-1 Ceuta,
// Andorra 1-3 Real Sociedad B, Cádiz 0-1 Las Palmas, Girona 1-2
// Castellón, Granada 1-1 Albacete, Córdoba 0-2 Almería, Sporting 0-1
// Eldense.
// Partidos de la J5 AÚN SIN JUGAR (por eso siguen con 4 partidos):
// Real Oviedo - Mallorca, CE Sabadell - Tenerife, SD Eibar - Valladolid
// (domingo 13/09) y CD Leganés - Celta Fortuna (lunes 14/09).
// Actualiza estos 4 equipos y sus rivales en cuanto se jueguen.
export const clasificacion: EquipoClasificacion[] = [
  { posicion: 1, equipo: "CD Castellón", puntos: 13, pj: 5, pg: 4, pe: 1, pp: 0, gf: 7, gc: 2, dg: 5 },
  { posicion: 2, equipo: "UD Las Palmas", puntos: 10, pj: 5, pg: 3, pe: 1, pp: 1, gf: 7, gc: 6, dg: 1 },
  { posicion: 3, equipo: "Almería", puntos: 9, pj: 5, pg: 3, pe: 0, pp: 2, gf: 8, gc: 4, dg: 4 },
  { posicion: 4, equipo: "Eibar", puntos: 9, pj: 4, pg: 3, pe: 0, pp: 1, gf: 6, gc: 3, dg: 3 },
  { posicion: 5, equipo: "Celta Fortuna", puntos: 8, pj: 4, pg: 2, pe: 1, pp: 1, gf: 7, gc: 4, dg: 3 },
  { posicion: 6, equipo: "Burgos CF", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 8, gc: 6, dg: 2 },
  { posicion: 7, equipo: "Real Sociedad B", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 8, gc: 6, dg: 2 },
  { posicion: 8, equipo: "CE Sabadell", puntos: 8, pj: 4, pg: 2, pe: 2, pp: 0, gf: 4, gc: 2, dg: 2 },
  { posicion: 9, equipo: "Leganés", puntos: 8, pj: 4, pg: 2, pe: 2, pp: 0, gf: 3, gc: 1, dg: 2 },
  { posicion: 10, equipo: "Granada", puntos: 8, pj: 5, pg: 2, pe: 2, pp: 1, gf: 6, gc: 5, dg: 1 },
  { posicion: 11, equipo: "Girona FC", puntos: 7, pj: 5, pg: 2, pe: 1, pp: 2, gf: 10, gc: 7, dg: 3 },
  { posicion: 12, equipo: "Mallorca", puntos: 7, pj: 4, pg: 2, pe: 1, pp: 1, gf: 5, gc: 2, dg: 3 },
  { posicion: 13, equipo: "Tenerife", puntos: 7, pj: 4, pg: 2, pe: 1, pp: 1, gf: 5, gc: 3, dg: 2 },
  { posicion: 14, equipo: "Real Sporting", puntos: 7, pj: 5, pg: 2, pe: 1, pp: 2, gf: 2, gc: 3, dg: -1 },
  { posicion: 15, equipo: "Real Oviedo", puntos: 5, pj: 4, pg: 1, pe: 2, pp: 1, gf: 1, gc: 1, dg: 0 },
  { posicion: 16, equipo: "Eldense", puntos: 5, pj: 5, pg: 1, pe: 2, pp: 2, gf: 3, gc: 6, dg: -3 },
  { posicion: 17, equipo: "Real Valladolid", puntos: 4, pj: 4, pg: 1, pe: 1, pp: 2, gf: 2, gc: 4, dg: -2 },
  { posicion: 18, equipo: "FC Andorra", puntos: 3, pj: 5, pg: 1, pe: 0, pp: 4, gf: 8, gc: 10, dg: -2 },
  { posicion: 19, equipo: "Cádiz", puntos: 3, pj: 5, pg: 0, pe: 3, pp: 2, gf: 5, gc: 7, dg: -2 },
  { posicion: 20, equipo: "Córdoba CF", puntos: 3, pj: 5, pg: 1, pe: 0, pp: 4, gf: 7, gc: 12, dg: -5, esCordoba: true },
  { posicion: 21, equipo: "Albacete", puntos: 1, pj: 5, pg: 0, pe: 1, pp: 4, gf: 3, gc: 8, dg: -5 },
  { posicion: 22, equipo: "AD Ceuta FC", puntos: 0, pj: 5, pg: 0, pe: 0, pp: 5, gf: 2, gc: 15, dg: -13 },
];
 