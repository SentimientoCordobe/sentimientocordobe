import { videos } from "../data/videos"
import YoutubeEmbed from "../components/YoutubeEmbed"

export default function Videos(): JSX.Element {

  return (

    <div className="container mx-auto px-4 py-10">

      <h1 className="mb-10 text-4xl font-bold uppercase">
        Videos
      </h1>

      <div className="grid gap-6 sm:grid-cols-8 lg:grid-cols-1">

        {videos.map((v) => (

          <div
            key={v.id}
            className="group overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition"
          >

            {/* VIDEO */}

            <YoutubeEmbed videoId={v.id} titulo={v.titulo} miniatura={v.miniatura} />

            {/* INFO */}

            <div className="p-4">

              <h3 className="font-semibold leading-snug line-clamp-2">
                {v.titulo}
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                {v.fecha}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}