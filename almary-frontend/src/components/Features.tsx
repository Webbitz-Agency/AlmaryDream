import Image from "next/image";
import { FEATURES, HIGHLIGHTS } from "@/lib/site";
import Reveal from "./Reveal";
import HeaderLine from "./HeaderLine";

/** Icone line-style minimali (stroke), nessuna libreria esterna. */
function FeatureIcon({ name }: { name: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "breakfast":
      return (
        <svg {...common}><path d="M18 8h1a3 3 0 0 1 0 6h-1" /><path d="M3 8h15v5a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V8Z" /><path d="M7 2v2M11 2v2M15 2v2" /></svg>
      );
    case "wifi":
      return (
        <svg {...common}><path d="M5 12.5a10 10 0 0 1 14 0" /><path d="M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19.5" r="0.6" fill="currentColor" /></svg>
      );
    case "ac":
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="7" rx="2" /><path d="M7 16v1M12 16v2M17 16v1" /></svg>
      );
    case "sea":
      return (
        <svg {...common}><path d="M3 16c1.5 0 1.5-1.5 3-1.5S9 16 10.5 16 12 14.5 13.5 14.5 15 16 16.5 16 18 14.5 19.5 14.5 21 16 21 16" /><path d="M3 20c1.5 0 1.5-1.5 3-1.5S9 20 10.5 20 12 18.5 13.5 18.5 15 20 16.5 20 18 18.5 19.5 18.5 21 20 21 20" /><circle cx="17" cy="7" r="2.5" /></svg>
      );
    case "relax":
      return (
        <svg {...common}><path d="M3 18v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3" /><path d="M3 18h18M5 18v2M19 18v2" /><path d="M8 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" /></svg>
      );
    case "green":
      return (
        <svg {...common}><path d="M12 21c-4 0-7-3-7-7 0-5 7-11 7-11s7 6 7 11c0 4-3 7-7 7Z" /><path d="M12 21v-9" /></svg>
      );
    case "shower":
      return (
        <svg {...common}><path d="M4 12h16" /><path d="M6 12V6a2 2 0 0 1 2-2h2" /><circle cx="13" cy="4.5" r="1.5" /><path d="M8 16v2M12 16v3M16 16v2" /></svg>
      );
    case "barbecue":
      return (
        <svg {...common}><path d="M4 7h16l-1.4 7a4 4 0 0 1-3.95 3.2H9.35A4 4 0 0 1 5.4 14L4 7Z" /><path d="M7.5 20.5 9 17M16.5 20.5 15 17" /><path d="M9 4s-1 1 0 2M12 3.5s-1 1 0 2M15 4s-1 1 0 2" /></svg>
      );
    case "wine":
      return (
        <svg {...common}><path d="M6 3h12l-1 6a5 5 0 0 1-10 0L6 3Z" /><path d="M6.5 6h11" /><path d="M12 14v5M8 21h8" /></svg>
      );
    case "boat":
      return (
        <svg {...common}><path d="M3 14h18l-2.2 5.2A2 2 0 0 1 17 20.5H7a2 2 0 0 1-1.8-1.3L3 14Z" /><path d="M12 14V4l7 4-7 2Z" /><path d="M12 14V8" /></svg>
      );
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

export default function Features() {
  return (
    <section id="servizi" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="eyebrow shrink-0">Comfort &amp; Servizi</p>
            <HeaderLine />
          </div>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
            Tutto ciò che rende speciale il tuo <em className="italic text-primary">soggiorno</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 70} className="flex flex-col">
              <span className="text-primary">
                <FeatureIcon name={feature.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.description}</p>
            </Reveal>
          ))}
        </div>

        {/* Servizi premium in evidenza — due card "chic" con cornice gold staccata */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delay={i * 120} from={i === 0 ? "left" : "right"}>
              <div className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-dark via-secondary to-dark p-9 text-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl lg:min-h-[26rem] lg:p-12">
                {/* Foto di sfondo */}
                {h.image && (
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                {/* Overlay nero (più trasparente) per leggibilità del testo sopra la foto */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                {/* Cornice gold "staccata" — segnala il servizio premium */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-4 rounded-xl border border-[#cbb074]/55 transition-all duration-500 group-hover:inset-3 group-hover:border-[#dcc18a]/90"
                />
                {/* Bagliore caldo decorativo */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#cbb074]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />

                <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.06] text-[#e7d3a3] ring-1 ring-[#cbb074]/45 backdrop-blur-sm">
                  <FeatureIcon name={h.icon} />
                </span>
                <p className="relative mt-auto pt-8 text-[11px] font-medium uppercase tracking-[0.25em] text-[#cbb074]">
                  Su richiesta
                </p>
                <h3 className="relative mt-2 font-serif text-2xl font-normal leading-tight sm:text-3xl">
                  {h.title}
                </h3>
                <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/80">
                  {h.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
