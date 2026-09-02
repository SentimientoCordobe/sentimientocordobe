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
  { nombre: "Nelson Monte", posicion: "Defensa central", dorsal: 20, grupo: "Defensas", foto: "hhttps://statics-maker.llt-services.com/cor/images/2026/09/01/xlarge-wp/8d2c9b96-fa43-4e86-bafc-5adb6d5a3e47-613.webp" },

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
