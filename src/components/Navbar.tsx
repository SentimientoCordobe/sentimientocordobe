import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Twitter, Instagram, Youtube } from "lucide-react";
import { IoLogoTiktok } from "react-icons/io5";
import ArcoCalifal from "./ArcoCalifal";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/plantilla", label: "Plantilla" },
  { to: "/clasificacion", label: "Clasificación" },
  { to: "/calendario", label: "Calendario" },
  { to: "/partidos", label: "Partidos" },
  { to: "/videos", label: "Videos" },
];

const redesSociales = [
  { href: "https://x.com/Sent_Cordobe", label: "X", Icon: Twitter },
  { href: "https://www.instagram.com/sentimiento_cordobe/?hl=es", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/@SentimientoCordobe", label: "YouTube", Icon: Youtube },
  { href: "https://www.tiktok.com/@sentimiento_cordobe", label: "TikTok", Icon: IoLogoTiktok },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto grid grid-cols-2 items-center gap-4 px-4 py-2 md:grid-cols-[auto_1fr_auto]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 justify-self-start">
          <img src="/logo.jpg" alt="Sentimiento Cordobé" className="h-12 w-12 rounded-full object-cover" />
          <span className="font-display text-xl font-bold uppercase tracking-wide text-primary-foreground md:text-2xl">
            Sentimiento Cordobé
          </span>
        </Link>

        {/* Desktop nav, centrado */}
        <nav className="hidden items-center justify-self-center md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded px-3 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                location.pathname === l.to
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Redes sociales, arriba a la derecha (solo escritorio) */}
        <div className="hidden items-center gap-4 justify-self-end md:flex">
          {redesSociales.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-primary-foreground transition-colors hover:text-secondary"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="justify-self-end text-primary-foreground md:hidden"
          aria-label="Menú"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-secondary/30 bg-primary md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                location.pathname === l.to
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Redes sociales en el menú móvil */}
          <div className="flex items-center gap-5 border-t border-secondary/30 px-6 py-4">
            {redesSociales.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-primary-foreground transition-colors hover:text-secondary"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </nav>
      )}

      <ArcoCalifal colorClassName="bg-secondary" />
    </header>
  );
}
