"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/site";
import Reveal from "./Reveal";
import HeaderLine from "./HeaderLine";

/**
 * Galleria immersiva: griglia masonry (CSS columns) con hover elegante e
 * lightbox a tutto schermo (frecce + tastiera). Foto reali WebP ottimizzate,
 * dimensioni note → nessun layout shift.
 */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, move]);

  return (
    <section id="galleria" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="eyebrow shrink-0">Galleria</p>
            <HeaderLine />
          </div>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
            Vivi <em className="italic text-primary">Almary Dream</em>
          </h2>
          <p className="mt-5 max-w-2xl text-base text-muted">
            Dagli interni di design al mare cristallino della Costa Smeralda: uno sguardo a ciò che ti aspetta.
          </p>
        </Reveal>

        {/* Masonry */}
        <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4">
          {GALLERY.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Apri: ${p.caption}`}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl shadow-soft"
              >
                <Image
                  src={p.src}
                  width={p.w}
                  height={p.h}
                  alt={p.caption}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="p-4 text-sm font-medium text-white">{p.caption}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Chiudi"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); move(-1); }}
            aria-label="Foto precedente"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); move(1); }}
            aria-label="Foto successiva"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <figure className="relative flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={GALLERY[open].src}
              width={GALLERY[open].w}
              height={GALLERY[open].h}
              alt={GALLERY[open].caption}
              sizes="100vw"
              priority
              className="max-h-[82vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {GALLERY[open].caption}
              <span className="ml-2 text-white/40">{open + 1} / {GALLERY.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
