import { jugadores } from "../data/jugadores";
import { jugadoresCordobaB, entrenadorCordobaB } from "../data/cordobaB";
import { jugadorasFemenino } from "../data/femenino";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const gruposPrimerEquipo = ["Porteros", "Defensas", "Mediocentros", "Delanteros"] as const;
const gruposFilial = ["Porteros", "Defensas", "Centrocampistas", "Delanteros"] as const;
const gruposFemenino = ["Porteras", "Defensas", "Centrocampistas", "Delanteras"] as const;

export default function Plantilla() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-display text-3xl font-bold uppercase tracking-wide text-foreground">
        Plantilla
      </h1>

      <Tabs defaultValue="primer-equipo">
        <TabsList className="mb-8">
          <TabsTrigger value="primer-equipo">Primer equipo</TabsTrigger>
          <TabsTrigger value="cordoba-b">Córdoba B</TabsTrigger>
          <TabsTrigger value="femenino">Femenino</TabsTrigger>
        </TabsList>

        {/* ── Primer equipo ── */}
        <TabsContent value="primer-equipo">
          {gruposPrimerEquipo.map((grupo) => {
            const jugadoresGrupo = jugadores.filter((j) => j.grupo === grupo);
            return (
              <section key={grupo} className="mb-10">
                <h2 className="mb-4 border-b-2 border-secondary pb-2 font-display text-xl font-bold uppercase text-secondary">
                  {grupo}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {jugadoresGrupo.map((j) => (
                    <Link
                      to={`/plantilla/${j.dorsal}`}
                      key={j.dorsal}
                      className="group flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary">
                        {j.foto ? (
                          <img
                            src={j.foto}
                            alt={j.nombre}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <User size={24} className="text-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold text-card-foreground">
                          <span className="mr-2 text-secondary">#{j.dorsal}</span>
                          {j.nombre}
                        </p>
                        <p className="text-sm text-muted-foreground">{j.posicion}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </TabsContent>

        {/* ── Córdoba B ── */}
        <TabsContent value="cordoba-b">
          <p className="mb-6 text-sm text-muted-foreground">
            Entrenador: <span className="font-semibold text-foreground">{entrenadorCordobaB}</span> · Tercera Federación, Grupo 10
          </p>
          {gruposFilial.map((grupo) => {
            const jugadoresGrupo = jugadoresCordobaB.filter((j) => j.grupo === grupo);
            if (jugadoresGrupo.length === 0) return null;
            return (
              <section key={grupo} className="mb-10">
                <h2 className="mb-4 border-b-2 border-secondary pb-2 font-display text-xl font-bold uppercase text-secondary">
                  {grupo}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {jugadoresGrupo.map((j) => (
                    <div
                      key={j.nombre}
                      className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary">
                        <User size={24} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold text-card-foreground">
                          {j.nombre}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {j.posicion}
                          {j.edad ? ` · ${j.edad} años` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </TabsContent>

        {/* ── Femenino ── */}
        <TabsContent value="femenino">
          <p className="mb-6 text-sm text-muted-foreground">
            Segunda Federación, Grupo III · plantilla reconstruida para 2026/27
          </p>
          {gruposFemenino.map((grupo) => {
            const jugadorasGrupo = jugadorasFemenino.filter((j) => j.grupo === grupo);
            if (jugadorasGrupo.length === 0) return null;
            return (
              <section key={grupo} className="mb-10">
                <h2 className="mb-4 border-b-2 border-secondary pb-2 font-display text-xl font-bold uppercase text-secondary">
                  {grupo}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {jugadorasGrupo.map((j) => (
                    <div
                      key={j.nombre}
                      className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary">
                        <User size={24} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold text-card-foreground">
                          {j.nombre}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {j.posicion} · {j.procedencia}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
