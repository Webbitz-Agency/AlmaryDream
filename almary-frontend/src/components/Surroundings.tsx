"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ACTIVITIES, BEACHES, RESTAURANTS } from "@/lib/site";
import { useI18n } from "@/i18n/DictionaryProvider";
import Reveal from "./Reveal";
import HeaderLine from "./HeaderLine";

/** Intestazione di un sotto-blocco: etichetta serif + linea. */
function BlockHeading({ label, note }: { label: string; note?: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-4">
        <h3 className="font-serif text-2xl font-normal text-white sm:text-3xl">{label}</h3>
        <span className="h-px flex-1 bg-white/15" />
      </div>
      {note && <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{note}</p>}
    </div>
  );
}

/** Icona placeholder foto (finché il cliente non carica le immagini spiagge). */
function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/10 to-white/[0.03] text-white/40">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="m21 16-5-5L5 20" />
      </svg>
      <span className="text-[10px] uppercase tracking-wide">{label}</span>
    </div>
  );
}

export default function Surroundings() {
  const { dict } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = ACTIVITIES.length;

  const slideTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const cc = el.offsetLeft + el.clientWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  };

  const beachDistance = (mode: "car" | "archipelago", duration: string) =>
    mode === "archipelago" ? dict.surround.archipelago : `${duration} ${dict.surround.byCar}`;

  return (
    <section
      id="dintorni"
      className="relative overflow-hidden bg-gradient-to-br from-dark via-secondary to-primary py-20 lg:py-28"
    >
      {/* Glow decorativi soft per dare profondità */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="eyebrow shrink-0 !text-white">{dict.sections.surroundings.eyebrow}</p>
            <HeaderLine className="from-white/60 via-white/30 to-transparent" />
          </div>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tightest text-white sm:text-5xl">
            {dict.sections.surroundings.titleA}<em className="italic text-accent">{dict.sections.surroundings.titleEm}</em>{dict.sections.surroundings.titleB}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            {dict.sections.surroundings.subtitle}
          </p>
        </Reveal>
      </div>

      {/* ── BLOCCO 1 · ESPERIENZE (carosello card grandi) ─────────────────── */}
      <div className="relative mt-12 lg:mt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-normal text-white sm:text-3xl">{dict.surround.experiences}</h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => slideTo(index - 1)}
                disabled={index === 0}
                aria-label={dict.booking.monthPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => slideTo(index + 1)}
                disabled={index === total - 1}
                aria-label={dict.booking.monthNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[6%] pb-2 sm:gap-6 sm:px-[16%] lg:px-[15%] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ACTIVITIES.map((activity, i) => (
            <div key={activity.slug} className="w-[88%] shrink-0 snap-center sm:w-[68%] lg:w-[70%]">
              <div
                className={`group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 shadow-soft transition-all duration-500 ${
                  i === index ? "scale-100 opacity-100" : "scale-[0.92] opacity-60"
                }`}
              >
                <Image
                  src={activity.image}
                  alt={dict.activities[activity.slug].title}
                  fill
                  sizes="(min-width: 1024px) 70vw, (min-width: 640px) 68vw, 88vw"
                  className="object-cover brightness-110 saturate-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="font-serif text-2xl font-normal text-white sm:text-3xl">{dict.activities[activity.slug].title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">{dict.activities[activity.slug].description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BLOCCO 2 · LE SPIAGGE (griglia compatta) ──────────────────────── */}
      <div className="relative mx-auto mt-16 max-w-7xl px-5 lg:mt-24 lg:px-8">
        <Reveal>
          <BlockHeading label={dict.surround.beaches} note={dict.surround.beachesNote} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
            {BEACHES.map((b) => (
              <div
                key={b.name}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-soft"
              >
                {b.image ? (
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <PhotoPlaceholder label={dict.surround.photoSoon} />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
                  <h4 className="font-serif text-lg font-normal leading-tight text-white">{b.name}</h4>
                  <p className="mt-1 text-xs font-medium text-accent">{beachDistance(b.mode, b.duration)}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── BLOCCO 3 · DOVE MANGIARE (lista consigli) ─────────────────────── */}
      <div className="relative mx-auto mt-16 max-w-7xl px-5 lg:mt-24 lg:px-8">
        <Reveal>
          <BlockHeading label={dict.surround.dining} note={dict.surround.diningNote} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {RESTAURANTS.map((r) => (
              <li
                key={r.slug}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4 transition-colors hover:border-white/25"
              >
                <div className="min-w-0">
                  <p className="font-serif text-lg font-normal text-white">{r.name}</p>
                  <p className="mt-0.5 text-sm text-white/65">{dict.restaurants[r.slug]}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-accent">
                  {r.duration} {dict.surround.byCar}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
