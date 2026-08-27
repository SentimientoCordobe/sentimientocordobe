import type { Noticia } from "./noticias"
export type { Noticia }

// ── Jugadores (Plantilla oficial Córdoba CF 2026/27) ──
// Fuente: cordobacf.com (web oficial) — actualizado agosto 2026.
// Los jugadores nuevos respecto a 25/26 usan un avatar generado con sus
// iniciales (ui-avatars.com) hasta que se suba su foto oficial; sustituye
// la URL por la foto real del jugador en cuanto esté disponible.
export interface Jugador {
  nombre: string;
  posicion: string;
  dorsal: number;
  grupo: "Porteros" | "Defensas" | "Mediocentros" | "Delanteros";
  foto: string;
}

const avatar = (nombre: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=006B3F&color=C5A55A&size=300&bold=true`;

export const jugadores: Jugador[] = [
  // Porteros
  { nombre: "Iker Álvarez", posicion: "Portero", dorsal: 1, grupo: "Porteros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/bb797dcb-51f7-4e9b-b6e5-62de7044f309-985.webp" },
  { nombre: "Guilherme Fernandes", posicion: "Portero", dorsal: 13, grupo: "Porteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/69ef5266-96ce-4fbf-9195-49473dd49d76-992.webp" },

  // Defensas
  { nombre: "Álex Martín", posicion: "Defensa central", dorsal: 4, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/630cf25f-6ddd-47f0-96e9-df4fd0fa6bc8-963.webp" },
  { nombre: "Juan G.", posicion: "Defensa central", dorsal: 5, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/1d28f4c5-7ddf-479a-af5d-41b9b7856351-614.webp" },
  { nombre: "Fomeyem", posicion: "Defensa central", dorsal: 12, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/d7827454-ca9a-41ac-a770-8bb60dde340c-238.webp" },
  { nombre: "Rubén Alves", posicion: "Defensa central", dorsal: 16, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/7455c14a-40f4-4f21-aadd-c2b58a4dd601-703.webp" },
  { nombre: "Albarrán", posicion: "Lateral derecho", dorsal: 21, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/b7e4455a-f6e4-46c6-bfc1-46b769e9ff2b-968.webp" },
  { nombre: "Egoitz M.L.", posicion: "Lateral derecho", dorsal: 27, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/eeec2f81-e8a9-42e3-bbf2-b19da05580fe-728.webp" },
  { nombre: "Jacobo M.", posicion: "Lateral derecho", dorsal: 29, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/6cbcf464-a344-4bbe-add4-4ac39dffcfad-720.webp" },
  { nombre: "Budesca", posicion: "Lateral izquierdo", dorsal: 30, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/20/small-wp/f96494c3-8bad-4390-a065-f39b62e75b9d-304.webp" },
  { nombre: "Tasende", posicion: "Lateral izquierdo", dorsal: 3, grupo: "Defensas", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/3f238cde-9479-4a12-8469-93c73bbda457-88.webp" },

  // Mediocentros
  { nombre: "Damián", posicion: "Mediocentro defensivo", dorsal: 6, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/bf7ad7f2-d21e-4947-86d9-3e991bcbde8d-946.webp" },
  { nombre: "Isma Ruiz", posicion: "Mediocentro defensivo", dorsal: 8, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/ced58699-ab7d-462d-9f4c-cc156d8d83eb-206.webp" },
  { nombre: "Théo", posicion: "Mediocentro organizador", dorsal: 7, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/944c1859-a80e-41a5-852b-83ba2db7f264-332.webp" },
  { nombre: "Diarra", posicion: "Mediocentro organizador", dorsal: 22, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/09b5205a-ba61-4fe4-9f62-f9bdb0d45d21-388.webp" },
  { nombre: "Eder García", posicion: "Mediocentro organizador", dorsal: 28, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/19e2e00e-ee74-4c0d-83c1-d0df15b7858b-68.webp" },
  { nombre: "A. Ghailan", posicion: "Mediocentro ofensivo", dorsal: 14, grupo: "Mediocentros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/b619cb22-9a24-4fdb-bfd1-6a04b17871a2-211.webp" },

  // Delanteros
  { nombre: "Kevin Medina", posicion: "Extremo", dorsal: 10, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/ece7222a-71c7-464c-948b-61891fb4de2d-428.webp" },
  { nombre: "Diego Bri", posicion: "Extremo", dorsal: 11, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/c120818f-7cf3-45f4-8db5-700c81d2f368-46.webp" },
  { nombre: "Adilson", posicion: "Extremo", dorsal: 17, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/ce56cfb2-8a89-414f-af61-869df71bd665-252.webp" },
  { nombre: "Carracedo", posicion: "Extremo", dorsal: 23, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2025/08/14/small-wp/4d42637f-5f3b-4233-9428-869fd6cc1001-778.webp" },
  { nombre: "El Jebari", posicion: "Extremo", dorsal: 24, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/99fab450-50e6-43f9-9dfa-d5e5f05f7a97-307.webp" },
  { nombre: "Percan", posicion: "Delantero centro", dorsal: 9, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/01/19/small-wp/97a080da-b90b-4e95-a39d-60c5f1e43485-685.webp" },
  { nombre: "Enol", posicion: "Delantero centro", dorsal: 18, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/7db79a5f-15a2-402c-9123-2374a5efa793-370.webp" },
  { nombre: "Ibai Sanz", posicion: "Delantero centro", dorsal: 19, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/6a3128be-e81b-4ce1-a6a8-724d3eef4372-211.webp" },
  { nombre: "Víctor", posicion: "Delantero centro", dorsal: 25, grupo: "Delanteros", foto: "https://statics-maker.llt-services.com/cor/images/2026/08/18/small-wp/01187260-8d66-411c-9cf4-86dcda0e8ac2-308.webp" },
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

// Resultados y calendario confirmados a 24/08/2026. Actualiza esta lista
// jornada a jornada según avance la temporada (LALIGA / RFEF / prensa oficial).
export const RESULTADOS: Jornada[] = [
  { jornada: 1, fecha: "16/08/2026", rival: "Burgos CF", estadio: "El Plantío", resultado: "3 - 2", local: false, victoria: false, empate: false },
  { jornada: 2, fecha: "21/08/2026", rival: "Girona FC", estadio: "Nuevo Arcángel", resultado: "2 - 1", local: true, victoria: true, empate: false },
  { jornada: 3, fecha: "30/08/2026", rival: "Granada CF", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 4, fecha: "06/09/2026", rival: "CE Sabadell", estadio: "Nova Creu Alta", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 5, fecha: "13/09/2026", rival: "UD Almería", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
  { jornada: 6, fecha: "20/09/2026", rival: "Albacete Balompié", estadio: "Carlos Belmonte", resultado: "", local: false, victoria: null, empate: false },
  { jornada: 7, fecha: "27/09/2026", rival: "Real Valladolid", estadio: "Nuevo Arcángel", resultado: "", local: true, victoria: null, empate: false },
];
