"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ACTIVITIES } from "@/lib/site";
import Reveal from "./Reveal";
import HeaderLine from "./HeaderLine";

export default function Surroundings() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = ACTIVITIES.length;

  // Porta al centro la slide i-esima
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

  // Aggiorna il contatore in base alla slide più vicina al centro
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
            <p className="eyebrow shrink-0 !text-white">Nei dintorni</p>
            <HeaderLine className="from-white/60 via-white/30 to-transparent" />
          </div>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tightest text-white sm:text-5xl">
            Cosa fare a <em className="italic text-accent">Baja Sardinia</em>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            Nel cuore della Costa Smeralda, Almary Dream è il punto di partenza ideale per spiagge
            paradisiache, gite in barca e serate indimenticabili sul mare.
          </p>
        </Reveal>
      </div>

      {/* Carosello con slide centrale + metà delle adiacenti */}
      <div className="relative mt-10 lg:mt-12">
        {/* Controlli: contatore x/y + frecce (sopra le card) */}
        <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <span className="font-serif text-lg text-white">
            {index + 1} <span className="text-white/50">/ {total}</span>
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => slideTo(index - 1)}
              disabled={index === 0}
              aria-label="Precedente"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => slideTo(index + 1)}
              disabled={index === total - 1}
              aria-label="Successivo"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[6%] pb-2 sm:gap-6 sm:px-[16%] lg:px-[15%] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ACTIVITIES.map((activity, i) => (
            <div key={activity.title} className="w-[88%] shrink-0 snap-center sm:w-[68%] lg:w-[70%]">
              <div
                className={`group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 shadow-soft transition-all duration-500 ${
                  i === index ? "scale-100 opacity-100" : "scale-[0.92] opacity-60"
                }`}
              >
                {/* Foto a tutta card */}
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(min-width: 1024px) 70vw, (min-width: 640px) 68vw, 88vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Sfumatura nero → trasparente dal basso */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                {/* Testo bianco in basso */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="font-serif text-2xl font-normal text-white sm:text-3xl">{activity.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
