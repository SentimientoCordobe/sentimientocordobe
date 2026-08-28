export interface JugadorFilial {
  nombre: string;
  posicion: string;
  grupo: "Porteros" | "Defensas" | "Centrocampistas" | "Delanteros";
  edad?: number;
}

export const entrenadorCordobaB = "Diego Tristán";

// Nota: algunos nombres (Eder García, Jacobo Martí, Dani Budesca, Egoitz
// Muñoz...) coinciden con jugadores del primer equipo — es habitual que
// canteranos con ficha del filial entrenen y jueguen puntualmente con el
// primer equipo, así que aparecen en ambas plantillas.

export const jugadoresCordobaB: JugadorFilial[] = [
  // Porteros
  { nombre: "Alex Arévalo", posicion: "Portero", grupo: "Porteros", edad: 18 },

  // Defensas
  { nombre: "Egoitz Muñoz", posicion: "Defensa", grupo: "Defensas", edad: 22 },
  { nombre: "Dani Budesca", posicion: "Defensa", grupo: "Defensas", edad: 20 },
  { nombre: "Jacobo Martí", posicion: "Defensa", grupo: "Defensas", edad: 21 },
  { nombre: "Miguelón Muñoz", posicion: "Defensa", grupo: "Defensas", edad: 21 },
  { nombre: "Dani Albuera", posicion: "Defensa", grupo: "Defensas", edad: 19 },
  { nombre: "Álex López", posicion: "Defensa", grupo: "Defensas", edad: 21 },
  { nombre: "Jonathan Korbla", posicion: "Defensa", grupo: "Defensas", edad: 22 },
  { nombre: "M. Timorán", posicion: "Defensa", grupo: "Defensas", edad: 20 },
  { nombre: "Dani García", posicion: "Defensa", grupo: "Defensas", edad: 22 },
  { nombre: "Cristian Osca", posicion: "Defensa", grupo: "Defensas", edad: 21 },
  { nombre: "Ángel Rodríguez", posicion: "Defensa", grupo: "Defensas", edad: 19 },

  // Centrocampistas
  { nombre: "Eder García", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 22 },
  { nombre: "Pablo Muñoz", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 21 },
  { nombre: "B. García", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 19 },
  { nombre: "Javi Antrás", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 19 },
  { nombre: "H. Khalaifat", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 22 },
  { nombre: "Gonzalo Moratalla", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 22 },
  { nombre: "D. Tristán", posicion: "Centrocampista", grupo: "Centrocampistas", edad: 19 },

  // Delanteros
  { nombre: "Viti", posicion: "Delantero", grupo: "Delanteros", edad: 19 },
  { nombre: "Hugo Martínez", posicion: "Delantero", grupo: "Delanteros", edad: 20 },
  { nombre: "Naser Dajani", posicion: "Delantero", grupo: "Delanteros", edad: 19 },
];
