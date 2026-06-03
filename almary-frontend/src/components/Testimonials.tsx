"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/lib/site";
import Reveal from "./Reveal";
import HeaderLine from "./HeaderLine";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${rating} su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (el) setClamped(el.scrollHeight > el.clientHeight + 1);
  }, []);

  return (
    <figure className="flex h-full flex-col rounded-xl border border-black/5 bg-white p-6 shadow-soft">
      <Stars rating={t.rating} />
      <figcaption className="mt-3 font-serif text-xl font-normal text-ink">{t.title}</figcaption>
      <blockquote
        ref={quoteRef}
        className={`mt-3 text-base leading-relaxed text-ink/85 ${expanded ? "" : "line-clamp-6"}`}
      >
        “{t.quote}”
      </blockquote>
      {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          {expanded ? "Mostra meno" : "Leggi tutto"}
        </button>
      )}
      <div className="mt-auto flex items-center gap-3 border-t border-black/5 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-medium text-primary">
          {t.name.charAt(0)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="text-muted">{t.date}</span>
        </span>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

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

  return (
    <section id="recensioni" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Reveal className="grow">
            <div className="flex items-center gap-3">
              <p className="eyebrow shrink-0">Recensioni</p>
              <HeaderLine bleed={false} />
            </div>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
              Cosa pensano <em className="italic text-primary">di noi</em>
            </h2>
          </Reveal>

          {/* Punteggio Booking.com reale */}
          <Reveal delay={120} className="shrink-0">
            <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg rounded-bl-none bg-[#003b95] text-lg font-bold text-white">
                9.3
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-bold text-[#003b95]">Booking.com</span>
                <span className="font-semibold text-ink">Eccellente</span>
                <span className="text-muted"> · 9.3/10</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Griglia recensioni — da tablet in su */}
        <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Carosello — solo su mobile */}
      <div className="mt-10 sm:hidden">
        {/* Controlli: contatore x/y + frecce */}
        <div className="mb-5 flex items-center justify-between px-5">
          <span className="font-serif text-lg text-ink">
            {index + 1} <span className="text-muted">/ {total}</span>
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => slideTo(index - 1)}
              disabled={index === 0}
              aria-label="Precedente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
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
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[7.5%] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="w-[85%] shrink-0 snap-center">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
