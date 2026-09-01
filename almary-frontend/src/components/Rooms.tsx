import { ROOMS, type AmenityKey } from "@/lib/site";
import { priceRange, formatEuro } from "@/lib/pricing";
import type { Dictionary } from "@/i18n/dictionaries/it";
import RoomCarousel from "./RoomCarousel";
import RoomAvailabilityButton from "./RoomAvailabilityButton";
import Reveal from "./Reveal";
import HeaderLine from "./HeaderLine";

/** Icona SVG per ciascuna chiave comfort camera. */
const AMENITY_ICON: Record<AmenityKey, string> = {
  kingBed: "bed",
  emotionalShower: "shower",
  wifi: "wifi",
  ac: "ac",
  fridge: "fridge",
  minibar: "fridge",
  groundFloor: "house",
  safe: "lock",
  makeupVanity: "mirror",
};

/** Icona coerente con la caratteristica della camera (SVG inline, bundle leggero). */
function AmenityIcon({ amenity }: { amenity: AmenityKey }) {
  const key = AMENITY_ICON[amenity];

  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (key) {
    case "bed":
      return (
        <svg {...common}>
          <path d="M2 17v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5M2 17h20M2 17v3M22 17v3M6 10V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
        </svg>
      );
    case "shower":
      return (
        <svg {...common}>
          <path d="M12 2.5S5 9 5 13.5a7 7 0 0 0 14 0C19 9 12 2.5 12 2.5Z" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" />
        </svg>
      );
    case "ac":
      return (
        <svg {...common}>
          <path d="M12 2v20M4.5 7l15 10M19.5 7l-15 10M12 6 9.5 3.5M12 6l2.5-2.5M12 18l-2.5 2.5M12 18l2.5 2.5" />
        </svg>
      );
    case "fridge":
      return (
        <svg {...common}>
          <rect x="6" y="2.5" width="12" height="19" rx="2" />
          <path d="M6 10h12M10 6v1M10 14v2.5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "house":
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
        </svg>
      );
    case "mirror":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="9" rx="6" ry="7" />
          <path d="M12 16v5M9 21h6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
  }
}

export default function Rooms({ dict }: { dict: Dictionary }) {
  const { min: minPrice } = priceRange();
  return (
    <section id="camere" className="overflow-hidden bg-white py-20 lg:py-28">
      {/* Intestazione sezione (con container) */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="eyebrow shrink-0">{dict.sections.rooms.eyebrow}</p>
            <HeaderLine />
          </div>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
            {dict.sections.rooms.titleA}<em className="italic text-primary">{dict.sections.rooms.titleEm}</em>{dict.sections.rooms.titleB}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-muted">
            {dict.sections.rooms.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Righe full-bleed alternate: foto edge-to-edge a sx/dx, testo dall'altro lato */}
      <div className="mt-14 flex flex-col lg:mt-20">
        {ROOMS.map((room, i) => {
          const photoRight = i % 2 === 1;
          const rd = dict.rooms[room.slug];
          const guestsLabel = dict.roomMeta.guests.replace("{n}", String(room.maxGuests));
          return (
            <article
              key={room.slug}
              className={`flex flex-col lg:flex-row ${photoRight ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Foto — tocca il bordo dello schermo */}
              <Reveal from={photoRight ? "right" : "left"} className="w-full lg:w-1/2">
                <RoomCarousel
                  images={room.images}
                  name={rd.name}
                  priority={i === 0}
                  guests={String(room.maxGuests)}
                  availabilityLabel={dict.roomMeta.availabilityCta}
                />
              </Reveal>

              {/* CTA sotto la foto — solo mobile/tablet: la disponibilità è
                  subito raggiungibile dove l'occhio è già puntato (le foto).
                  Su desktop resta la CTA nella colonna di testo, accanto alla foto. */}
              <div className="px-5 pt-6 lg:hidden">
                <RoomAvailabilityButton
                  guests={String(room.maxGuests)}
                  label={dict.roomMeta.availabilityCta}
                  className="w-full"
                />
              </div>

              {/* Testo */}
              <div className="flex w-full items-center justify-center lg:w-1/2">
                <Reveal
                  from={photoRight ? "left" : "right"}
                  delay={120}
                  className="w-full max-w-xl px-5 py-10 lg:px-14 lg:py-12"
                >
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-secondary">
                    <span>{room.size}</span>
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    <span>{guestsLabel}</span>
                  </div>

                  <h3 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-4xl">
                    {rd.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">{rd.description}</p>

                  <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3.5 sm:gap-x-8">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-3 text-sm text-ink/80">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-secondary">
                          <AmenityIcon amenity={a} />
                        </span>
                        {dict.amenities[a]}
                      </li>
                    ))}
                  </ul>

                  {/* Tariffa — uguale per tutte le camere, variabile per periodo */}
                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="text-sm text-muted">{dict.roomMeta.from}</span>
                    <span className="font-serif text-3xl font-normal text-ink">{formatEuro(minPrice)}</span>
                    <span className="text-sm text-muted">{dict.roomMeta.perNight}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{dict.roomMeta.priceNote}</p>

                  <div className="mt-8 hidden lg:block">
                    <RoomAvailabilityButton guests={String(room.maxGuests)} label={dict.roomMeta.availabilityCta} />
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
