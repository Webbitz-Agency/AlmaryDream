"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/lib/useScrollLock";
import BookingDateModal from "./BookingDateModal";

type Props = {
  images: string[];
  name: string;
  /** true = la prima foto è above-the-fold → priority per LCP migliore */
  priority?: boolean;
  /** Override delle classi del contenitore (deve includere group/relative/overflow-hidden). */
  className?: string;
  /** Numero ospiti da passare al calendario aperto dal lightbox. */
  guests?: string;
  /** Etichetta della CTA disponibilità mostrata nel lightbox. */
  availabilityLabel?: string;
};

const DEFAULT_WRAPPER =
  "group relative aspect-[4/3] w-full overflow-hidden bg-offwhite sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[42rem]";

export default function RoomCarousel({
  images,
  name,
  priority = false,
  className,
  guests = "2",
  availabilityLabel = "Verifica disponibilità",
}: Props) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [availOpen, setAvailOpen] = useState(false);
  const total = images.length;

  const go = (dir: number) => setIndex((p) => (p + dir + total) % total);

  // Lightbox: blocca lo scroll di pagina + chiusura/navigazione da tastiera.
  useScrollLock(zoom);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      else if (e.key === "ArrowLeft") setIndex((p) => (p - 1 + total) % total);
      else if (e.key === "ArrowRight") setIndex((p) => (p + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, total]);

  return (
    <div className={className ?? DEFAULT_WRAPPER}>
      {/* Slide impilate con dissolvenza → nessun layout shift.
          Renderizziamo SOLO la foto corrente e le adiacenti (finestra ±1): con
          20-30 foto per camera evitiamo di scaricarle tutte insieme quando la
          camera entra in viewport (grosso risparmio dati/velocità su mobile).
          Le adiacenti restano montate → la dissolvenza resta fluida. */}
      {images.map((src, i) =>
        i >= index - 1 && i <= index + 1 ? (
          <Image
            key={src}
            src={src}
            alt={`${name} — foto ${i + 1} di ${total}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority && i === 0}
            loading={priority && i === 0 ? undefined : "lazy"}
            className={`object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null
      )}

      {/* Livello cliccabile: tocca la foto per ingrandirla (sotto frecce/pallini,
          che restano a z-10 e mantengono la loro funzione). Elimina i "tocchi a
          vuoto" sulle foto camere rilevati da Clarity. */}
      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label={`Ingrandisci le foto — ${name}`}
        className="absolute inset-0 z-[5] cursor-zoom-in"
      />

      {/* Indizio visivo che la foto è ingrandibile */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-[6] flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </span>

      {total > 1 && (
        <>
          {/* Freccia sinistra */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto precedente"
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-dark shadow-soft backdrop-blur-sm transition-all hover:bg-white focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Freccia destra */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto successiva"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-dark shadow-soft backdrop-blur-sm transition-all hover:bg-white focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Indicatori: pallini quando le foto sono poche, altrimenti un
              contatore compatto (con 20-30 foto i pallini sforerebbero). */}
          {total <= 8 ? (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Vai alla foto ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div
              aria-hidden
              className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm"
            >
              {index + 1} / {total}
            </div>
          )}
        </>
      )}

      {/* ── Lightbox a schermo intero ─────────────────────────────────────── */}
      {zoom && createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto — ${name}`}
          onClick={() => setZoom(false)}
        >
          {/* Chiudi */}
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Chiudi"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Colonna centrata: foto + contatore + CTA subito SOTTO la foto.
              stopPropagation così i tap qui dentro non chiudono il lightbox. */}
          <div
            className="flex max-h-full w-full flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto con frecce sui bordi */}
            <div className="relative flex min-h-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[index]}
                alt={`${name} — foto ${index + 1} di ${total}`}
                className="max-h-[70vh] max-w-[92vw] select-none rounded-lg object-contain"
              />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto precedente"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Foto successiva"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Contatore + CTA disponibilità, subito sotto la foto */}
            <div className="flex flex-col items-center gap-2.5">
              {total > 1 && (
                <span
                  aria-hidden
                  className="rounded-full bg-white/10 px-3.5 py-1 text-sm font-medium tabular-nums text-white backdrop-blur-sm"
                >
                  {index + 1} / {total}
                </span>
              )}
              <button
                type="button"
                onClick={() => { setZoom(false); setAvailOpen(true); }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-secondary"
              >
                {availabilityLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Calendario disponibilità aperto dalla CTA del lightbox (montato solo
          quando serve, per non appesantire il caricamento pagina). */}
      {availOpen && (
        <BookingDateModal open={availOpen} onClose={() => setAvailOpen(false)} guests={guests} />
      )}
    </div>
  );
}
