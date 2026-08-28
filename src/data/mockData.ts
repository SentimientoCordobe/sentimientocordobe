import type { Noticia } from "./noticias"
export type { Noticia }

export interface Jugador {
  nombre: string;
  posicion: string;
  dorsal: number;
  grupo: "Porteros" | "Defensas" | "Mediocentros" | "Delanteros";
  foto: string;
}

export const jugadores: Jugador[] = [
  // Porteros
  { nombre: "Iker Álvarez", posicion: "Portero", dorsal: 1, grupo: "Porteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/ef0f90e5-8817-420e-9a6e-7c6c9433bc13-842.webp" },
  { nombre: "Guilherme Fernandes", posicion: "Portero", dorsal: 13, grupo: "Porteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/69ef5266-96ce-4fbf-9195-49473dd49d76-992.jpg" },

  // Defensas
  { nombre: "Álex Martín", posicion: "Defensa central", dorsal: 4, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/7703204c-5a3b-48be-9ca7-f8527e89ccfe-44.webp" },
  { nombre: "Juan G.", posicion: "Defensa central", dorsal: 5, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/1d28f4c5-7ddf-479a-af5d-41b9b7856351-614.jpg" },
  { nombre: "Fomeyem", posicion: "Defensa central", dorsal: 12, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/8b15bce8-3d9a-4939-b62d-21dc2d968d53-189.webp" },
{ nombre: "Rubén Alves", posicion: "Defensa central", dorsal: 16, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/13daa0fc-99d6-423f-9071-bcb9324904dc-680.webp" },
  { nombre: "Albarrán", posicion: "Lateral derecho", dorsal: 21, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/c6e21e7c-4dbc-469b-8348-acfa2f47af47-314.webp" },
  { nombre: "Egoitz M.L.", posicion: "Lateral derecho", dorsal: 27, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/eeec2f81-e8a9-42e3-bbf2-b19da05580fe-728.jpg" },
  { nombre: "Jacobo M.", posicion: "Lateral derecho", dorsal: 29, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/6cbcf464-a344-4bbe-add4-4ac39dffcfad-720.jpg" },
  { nombre: "Budesca", posicion: "Lateral izquierdo", dorsal: 30, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/20/large/f96494c3-8bad-4390-a065-f39b62e75b9d-304.jpg" },
  { nombre: "Tasende", posicion: "Lateral izquierdo", dorsal: 3, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/3f238cde-9479-4a12-8469-93c73bbda457-88.jpg" },

  // Mediocentros
  { nombre: "Damián", posicion: "Mediocentro defensivo", dorsal: 6, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/bf7ad7f2-d21e-4947-86d9-3e991bcbde8d-946.jpg" },
  { nombre: "Isma Ruiz", posicion: "Mediocentro defensivo", dorsal: 8, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/7f4bace7-4fd2-43bc-ad87-b9a6c899f82b-941.webp" },
  { nombre: "Théo", posicion: "Mediocentro organizador", dorsal: 7, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/5e2f54d2-ff93-45ad-aa48-4274ae4df847-695.webp" },
  { nombre: "Diarra", posicion: "Mediocentro organizador", dorsal: 22, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/09b5205a-ba61-4fe4-9f62-f9bdb0d45d21-388.jpg" },
  { nombre: "Eder García", posicion: "Mediocentro organizador", dorsal: 28, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/19e2e00e-ee74-4c0d-83c1-d0df15b7858b-68.jpg" },
  { nombre: "A. Ghailan", posicion: "Mediocentro ofensivo", dorsal: 14, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/b619cb22-9a24-4fdb-bfd1-6a04b17871a2-211.jpg" },

  // Delanteros
  { nombre: "Kevin Medina", posicion: "Extremo", dorsal: 10, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/xsmall-wp/2d7b1bb6-0ee8-4db6-82df-f1982d93537e-684.webp" },
  { nombre: "Diego Bri", posicion: "Extremo", dorsal: 11, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/d0876a16-6efe-48ac-bb31-3fe104bd5ef6-224.webp" },
  { nombre: "Adilson", posicion: "Extremo", dorsal: 17, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/xsmall-wp/6c7edff2-2579-4d0c-bb49-e93652f89550-48.webp" },
  { nombre: "Carracedo", posicion: "Extremo", dorsal: 23, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/xsmall-wp/afcbbbf6-5f8a-4176-b62f-e72620b812bf-779.webp" },
  { nombre: "El Jebari", posicion: "Extremo", dorsal: 24, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/99fab450-50e6-43f9-9dfa-d5e5f05f7a97-307.jpg" },
  { nombre: "Percan", posicion: "Delantero centro", dorsal: 9, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/xsmall-wp/1e05cefe-441f-4274-b111-99d3b00f3803-595.webp" },
  { nombre: "Enol", posicion: "Delantero centro", dorsal: 18, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/7db79a5f-15a2-402c-9123-2374a5efa793-370.jpg" },
  { nombre: "Ibai Sanz", posicion: "Delantero centro", dorsal: 19, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/6a3128be-e81b-4ce1-a6a8-724d3eef4372-211.jpg" },
  { nombre: "Víctor", posicion: "Delantero centro", dorsal: 15, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/large/01187260-8d66-411c-9cf4-86dcda0e8ac2-308.jpg" },
];

// ── Calendario del Córdoba CF (temporada 2026/27, LALIGA Hypermotion) ──
export interface Jornada {
  jornada: number;
  fecha: string;
  rival: string;
  estadio: string;
  resultado?: string;
  local: boolean;
  victoria: boolean | null;
  empate: boolean; // true para empate; para derrota/pendiente usar victoria en false/null
}

// Calendario completo de las 42 jornadas de LALIGA Hypermotion 2026/27
// (22 equipos, liga a doble vuelta → 42 jornadas, no 41). Fuente: LALIGA
// oficial (laliga.com/clubes/cordoba-cf/proximos-partidos) y RFEF.
// Resultados confirmados a 27/08/2026: J1 y J2. El resto son fechas y
// rivales ya oficiales; actualiza el campo "resultado" jornada a jornada
// según se disputen.
export const RESULTADOS: Jornada[] = [
  { jornada: 1, fecha: "16/08/2026", rival: "Burgos CF", estadio: "El Plantío", resultado: "3 - 2", local: false, victoria: false, empate: false },
  { jornada: 2, fecha: "21/08/2026", rival: "Girona FC", estadio: "Nuevo Arcángel", resultado: "2 - 1", local: true, victoria: true, empate: false },
  { jornada: 3, fecha: "30/08/2026", rival: "Granada CF", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 4, fecha: "07/09/2026", rival: "CE Sabadell", estadio: "Nova Creu Alta", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 5, fecha: "13/09/2026", rival: "UD Almería", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 6, fecha: "20/09/2026", rival: "Albacete Balompié", estadio: "Carlos Belmonte", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 7, fecha: "27/09/2026", rival: "Real Valladolid", estadio: "José Zorrilla", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 8, fecha: "04/10/2026", rival: "CD Tenerife", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 9, fecha: "11/10/2026", rival: "CD Eldense", estadio: "Nuevo Pepico Amat", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 10, fecha: "18/10/2026", rival: "CD Leganés", estadio: "Butarque", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 11, fecha: "25/10/2026", rival: "SD Eibar", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 12, fecha: "01/11/2026", rival: "RC Celta Fortuna", estadio: "Abanca-Balaídos", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 13, fecha: "08/11/2026", rival: "AD Ceuta FC", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 14, fecha: "15/11/2026", rival: "RCD Mallorca", estadio: "Son Moix", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 15, fecha: "22/11/2026", rival: "Real Oviedo", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 16, fecha: "29/11/2026", rival: "Cádiz CF", estadio: "Nuevo Mirandilla", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 17, fecha: "06/12/2026", rival: "UD Las Palmas", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 18, fecha: "13/12/2026", rival: "CD Castellón", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 19, fecha: "20/12/2026", rival: "Real Sociedad B", estadio: "Zubieta", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 20, fecha: "03/01/2027", rival: "FC Andorra", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 21, fecha: "10/01/2027", rival: "Real Sporting", estadio: "El Molinón", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 22, fecha: "17/01/2027", rival: "CE Sabadell", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 23, fecha: "24/01/2027", rival: "UD Almería", estadio: "Power Horse Stadium", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 24, fecha: "31/01/2027", rival: "RCD Mallorca", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 25, fecha: "07/02/2027", rival: "Cádiz CF", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 26, fecha: "14/02/2027", rival: "Girona FC", estadio: "Montilivi", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 27, fecha: "21/02/2027", rival: "Burgos CF", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 28, fecha: "28/02/2027", rival: "Granada CF", estadio: "Nuevo Los Cármenes", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 29, fecha: "07/03/2027", rival: "Real Valladolid", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 30, fecha: "14/03/2027", rival: "Real Oviedo", estadio: "Carlos Tartiere", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 31, fecha: "21/03/2027", rival: "CD Eldense", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 32, fecha: "28/03/2027", rival: "CD Castellón", estadio: "Nou Castalia", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 33, fecha: "04/04/2027", rival: "RC Celta Fortuna", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 34, fecha: "11/04/2027", rival: "SD Eibar", estadio: "Ipurúa", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 35, fecha: "18/04/2027", rival: "Albacete Balompié", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 36, fecha: "25/04/2027", rival: "FC Andorra", estadio: "Estadi Nacional", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 37, fecha: "02/05/2027", rival: "Real Sociedad B", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 38, fecha: "09/05/2027", rival: "CD Tenerife", estadio: "Heliodoro Rodríguez López", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 39, fecha: "16/05/2027", rival: "CD Leganés", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 40, fecha: "23/05/2027", rival: "AD Ceuta FC", estadio: "Alfonso Murube", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 41, fecha: "30/05/2027", rival: "UD Las Palmas", estadio: "Estadio de Gran Canaria", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 42, fecha: "06/06/2027", rival: "Real Sporting", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
];
