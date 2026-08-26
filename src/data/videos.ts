export interface Video {
  id: string;
  titulo: string;
  resumen: string;
  miniatura: string;
  fecha: string;
  youtube: string;
}

// Resúmenes oficiales de LALIGA HYPERMOTION (producción con la que DAZN
// cubre la Segunda División), temporada 2026/27. Verificados uno a uno:
// no se incluye ningún vídeo sin confirmar que el enlace es real.
export const videos: Video[] = [
  {
    id: "zhgpJGPYZB0",
    titulo: "BURGOS CF 3 - 2 CÓRDOBA CF | RESUMEN LALIGA HYPERMOTION",
    resumen: "Jornada 1 · El Córdoba se adelantó con un gol de Diarra, pero Burgos remontó en El Plantío.",
    miniatura: "https://img.youtube.com/vi/zhgpJGPYZB0/maxresdefault.jpg",
    fecha: "16 Ago 2026",
    youtube: "https://www.youtube.com/watch?v=zhgpJGPYZB0",
  },

  // ⚠️ PENDIENTE: no he podido verificar el enlace real del resumen oficial
  // de Córdoba 2-1 Girona (jornada 2, 21 ago 2026), pese a buscarlo por
  // varias vías. Antes de "inventar" un ID de YouTube (que daría un enlace
  // roto o, peor, el vídeo de otro partido), lo dejo pendiente aquí.
  // Para añadirlo: busca "CÓRDOBA CF 2 - 1 GIRONA FC | RESUMEN LALIGA
  // HYPERMOTION" en youtube.com/@LALIGAHYPERMOTION, copia el ID del vídeo
  // (la parte tras "watch?v=") y añade un bloque igual al de arriba.

  {
    id: "OIYC9Z2_f44",
    titulo: "Córdoba - SPORTING: 3-2",
    resumen: "Jornada 37",
    miniatura: "https://img.youtube.com/vi/OIYC9Z2_f44/maxresdefault.jpg",
    fecha: "26 Abr 2026",
    youtube: "https://www.youtube.com/watch?v=OIYC9Z2_f44",

  },
  
  {
    id: "a2yFkueXslc", 
    titulo: "RUEDA DE PRENSA IVAN ANIA",
resumen: "Jornada 36",    
     miniatura: "https://img.youtube.com/vi/a2yFkueXslc/maxresdefault.jpg",
    fecha: "26 de Abr 2026",
    youtube: "https://www.youtube.com/watch?v=a2yFkueXslc",
}, 
  
  {
    id: "GG660uVUp_Q",
    titulo: "ASÍ se VIVE un PARTIDO en PALCO VIP del CÓRDOBA CF",
    resumen: "Viví una nueva experiencia viendo al Córdoba CF desde el Palco VIP del Estadio El Arcángel. En este vídeo enseño cómo es el palco VIP, el ambiente del partido Córdoba CF vs Real Sociedad B (0-2) y cómo se vivió el encuentro desde dentro. ¡No te lo pierdas!",
    miniatura: "https://img.youtube.com/vi/GG660uVUp_Q/maxresdefault.jpg",
    fecha: "22 Mar 2026",
    youtube: "https://www.youtube.com/watch?v=GG660uVUp_Q"
  },
  {
    id: "2iCwBk3JSYw",
    titulo: "DERBI DE RIVALIDAD ALMERÍA-CÓRDOBA ON TOUR",
    resumen: "El Córdoba cayó en el campo, pero en la grada la afición volvió a demostrar que nunca pierde. En este vídeo te cuento la historia que casi nadie conoce sobre el origen de esta rivalidad y te muestro la realidad del partido desde dentro: ambiente, corteo, tensión y el cruce entre aficiones. ¡No te lo pierdas!",
    miniatura: "https://img.youtube.com/vi/2iCwBk3JSYw/maxresdefault.jpg",
    fecha: "23 Feb 2026",
    youtube: "https://www.youtube.com/watch?v=2iCwBk3JSYw"
  },
  {
    id: "uVZkznixBEE",
    titulo: "ON TOUR LEGANÉS | PENALTI EN EL 90’ Y…",
    resumen: "Nuevo OnTour, esta vez rumbo a Leganés. Visitamos la ciudad, conocimos el estadio y vivimos desde dentro el ambientazo del gran desplazamiento cordobesista. Una vez más, la afición estuvo de 10.",
    miniatura: "https://img.youtube.com/vi/uVZkznixBEE/maxresdefault.jpg",
    fecha: "11 Dic 2025",
    youtube: "https://www.youtube.com/watch?v=uVZkznixBEE"
  },
  {
    id: "wlfQHoZOccs",
    titulo: "ON TOUR MÁLAGA | AMBIENTAZO DE DERBI Y PENALTI EN EL 90’",
    resumen: "Ambiente espectacular, previa increíble, corteo, bengaleo y animación brutal en las gradas. Tras una expulsión polémica, el Córdoba jugó toda la segunda parte con 10 futbolistas… ¡pero jamás se rindió! Y cuando todo parecía perdido, llegó el milagro… GOL en el MINUTO 101 😳 tras 12 minutos añadidos, para poner el 2-2 final y sacar un punto de oro.",
    miniatura: "https://img.youtube.com/vi/wlfQHoZOccs/maxresdefault.jpg",
    fecha: "10 Nov 2025",
    youtube: "https://www.youtube.com/watch?v=wlfQHoZOccs"
  }
]