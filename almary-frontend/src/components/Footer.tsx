import Image from "next/image";
import { SITE, NAV_LINKS, bookingHref } from "@/lib/site";

/** Icone social inline (no librerie). */
function SocialIcon({ name }: { name: "facebook" | "instagram" | "whatsapp" }) {
  switch (name) {
    case "facebook":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.2-.8-2.7-1.2-4.4-4-4.5-4.2-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2 1.3 2.3 1.4.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.3Z" />
        </svg>
      );
  }
}

export default function Footer() {
  return (
    <footer id="contatti" className="bg-dark text-white">
      {/* Divisore: separa la sezione sopra dal footer */}
      <div className="mx-auto h-px w-3/5 bg-white/30" />

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        {/* Logo + slogan in cima — centrati */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Logo/logoBianco.png"
            alt="Almary Dream"
            width={192}
            height={192}
            className="h-48 w-48 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Luxury B&amp;B a Baja Sardinia. Un respiro di eleganza sul mare, nel cuore della Costa Smeralda.
          </p>
        </div>

        {/* Colonne: su mobile Menu + Contatti affiancati, mappa sotto a tutta larghezza */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.2fr_1fr_1.4fr] lg:gap-12">
          {/* Menu */}
          <nav>
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-accent">Menu</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contatti */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-accent">Contatti</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li>
                {SITE.address}
                <br />
                {SITE.zip} {SITE.city}
              </li>
              <li>
                <a href={SITE.phoneHref} className="transition-colors hover:text-accent">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <a
                  href={bookingHref("Ciao Almary Dream! Vorrei alcune informazioni.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-dark transition-colors hover:bg-white"
                >
                  <SocialIcon name="whatsapp" />
                </a>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-lg border border-white/20 px-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                >
                  Chiama ora
                </a>
              </li>
            </ul>
          </div>

          {/* Mappa */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-accent">Dove siamo</h3>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Mappa Almary Dream — Baja Sardinia"
                src={SITE.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full"
              />
            </div>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
            >
              Apri in Google Maps →
            </a>
          </div>
        </div>

        {/* Social sotto le colonne */}
        <div className="mt-12 flex gap-3">
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-dark"
          >
            <SocialIcon name="facebook" />
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-dark"
          >
            <SocialIcon name="instagram" />
          </a>
          <a
            href={bookingHref("Ciao Almary Dream! Vorrei alcune informazioni.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-dark"
          >
            <SocialIcon name="whatsapp" />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Almary Dream — Tutti i diritti riservati</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>CIR: {SITE.cir}</span>
            <span>CIN: {SITE.cin}</span>
            <a href="/privacy" className="transition-colors hover:text-accent">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
