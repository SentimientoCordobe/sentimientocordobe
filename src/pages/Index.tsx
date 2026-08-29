import { Link } from "react-router-dom"
import { videos } from "../data/videos"
import { clasificacion } from "../data/clasificacion"
import { noticias } from "../data/noticias"
import { RESULTADOS } from "../data/mockData"
import { encuestaResultado, encuestaMVP } from "../data/encuestas"
import EncuestaResultado from "../components/EncuestaResultado"
import EncuestaMVP from "../components/EncuestaMVP"
import ArcoCalifal from "../components/ArcoCalifal"
import YoutubeEmbed from "../components/YoutubeEmbed"
import { Twitter, Instagram, Youtube } from "lucide-react"
import { IoLogoTiktok } from "react-icons/io5"

export default function Index(): JSX.Element {
  const [portada, ...resto] = noticias
  const secundarias = resto.slice(0, 4)
  const proximoPartido = RESULTADOS.find((j) => j.victoria === null)

  return (
    <div>
      {/* ── Héroe: la noticia principal a ancho completo ── */}
      {portada && (
        <Link to={`/noticia/${portada.slug}`} className="group block">
          <div className="relative">
            <div className="h-[70vh] max-h-[560px] min-h-[340px] w-full overflow-hidden">
              <img
                src={portada.imagen}
                alt={portada.titulo}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 px-4 pb-8 md:pb-12">
              <div className="container mx-auto max-w-3xl px-0">
                <span className="inline-block rounded-sm bg-secondary px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                  {portada.fuente ?? "Última hora"}
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                  {portada.titulo}
                </h1>
                <p className="mt-3 hidden max-w-xl text-primary-foreground/80 md:block">
                  {portada.resumen}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      <ArcoCalifal colorClassName="bg-primary" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* ── Columna principal ── */}
          <main className="space-y-10">
            {/* Noticias secundarias */}
            {secundarias.length > 0 && (
              <section>
                <h2 className="mb-4 border-b-2 border-secondary pb-2 font-display text-xl font-bold uppercase tracking-wide">
                  Más noticias
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {secundarias.map((n) => (
                    <Link key={n.id} to={`/noticia/${n.slug}`} className="group">
                      <article className="overflow-hidden rounded-lg border bg-card shadow-sm transition hover:shadow-md">
                        <div className="overflow-hidden">
                          <img
                            src={n.imagen}
                            alt={n.titulo}
                            loading="lazy"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-secondary">
                            {n.titulo}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {n.resumen}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Últimos vídeos */}
            {videos.length > 0 && (
              <section>
                <h2 className="mb-4 border-b-2 border-secondary pb-2 font-display text-xl font-bold uppercase tracking-wide">
                  Últimos vídeos
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {videos.slice(0, 2).map((v) => (
                    <div key={v.id} className="space-y-2">
                      <YoutubeEmbed
                        videoId={v.id}
                        titulo={v.titulo}
                        miniatura={v.miniatura}
                      />
                      <h3 className="text-sm font-semibold leading-tight">
                        {v.titulo}
                      </h3>
                      <p className="text-xs text-muted-foreground">{v.fecha}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Link
                    to="/videos"
                    className="font-display text-sm font-semibold uppercase tracking-wide text-secondary hover:underline"
                  >
                    Ver todos los vídeos →
                  </Link>
                </div>
              </section>
            )}
          </main>

          {/* ── Barra lateral ── */}
          <aside className="space-y-8">
            {proximoPartido && (
              <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-secondary">
                  Próximo partido
                </p>
                <p className="mt-2 font-display text-lg font-bold">
                  {proximoPartido.local ? "Córdoba CF" : proximoPartido.rival}
                  <span className="mx-2 text-secondary">vs</span>
                  {proximoPartido.local ? proximoPartido.rival : "Córdoba CF"}
                </p>
                <p className="mt-1 text-sm text-primary-foreground/75">
                  {proximoPartido.fecha} · {proximoPartido.estadio}
                </p>
              </div>
            )}

            <div>
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wide">
                Encuestas
              </h2>
              <div className="space-y-4">
                <EncuestaResultado encuesta={encuestaResultado} />

                {/* Separador estilo perforación de boleto */}
                <div aria-hidden className="flex items-center gap-1.5 px-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-border" />
                  ))}
                </div>

                <EncuestaMVP encuesta={encuestaMVP} />
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wide">
                Clasificación
              </h2>

              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="p-2 text-left font-display uppercase tracking-wide">#</th>
                      <th className="p-2 text-left font-display uppercase tracking-wide">Equipo</th>
                      <th className="p-2 text-right font-display uppercase tracking-wide">Pts</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clasificacion.slice(0, 10).map((e) => (
                      <tr
                        key={e.posicion}
                        className={`border-t ${e.esCordoba ? "bg-secondary/15 font-semibold" : ""}`}
                      >
                        <td className="p-2">{e.posicion}</td>
                        <td className={`p-2 ${e.esCordoba ? "text-primary" : ""}`}>
                          {e.equipo}
                        </td>
                        <td className="p-2 text-right font-semibold">
                          {e.puntos}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-right">
                <Link
                  to="/clasificacion"
                  className="font-display text-xs font-semibold uppercase tracking-wide text-secondary hover:underline"
                >
                  Ver clasificación completa →
                </Link>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-secondary">
                Síguenos en redes sociales
              </h4>

              <div className="mt-4 flex gap-5">
                <a href="https://x.com/Sent_Cordobe" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <Twitter size={24} />
                </a>
                <a href="https://www.instagram.com/sentimiento_cordobe/?hl=es" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="https://www.youtube.com/@SentimientoCordobe" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube size={24} />
                </a>
                <a href="https://www.tiktok.com/@sentimiento_cordobe" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <IoLogoTiktok size={24} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
