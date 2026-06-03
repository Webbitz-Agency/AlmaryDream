"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Linea decorativa che riempie lo spazio a destra del titolo di sezione.
 * Entra dal bordo destro dello schermo (bleed) e si "disegna" verso sinistra
 * quando la sezione entra nel viewport. Rispetta prefers-reduced-motion.
 *
 * - `className`: override del gradiente/colore (default: teal del brand).
 * - `bleed`: se true (default) il bordo destro raggiunge il margine dello schermo.
 */
export default function HeaderLine({
  className = "from-secondary/45 via-secondary/20 to-transparent",
  bleed = true,
}: {
  className?: string;
  bleed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 25% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // Il wrapper ha dimensione reale (osservato dall'IO); la linea interna si scala.
    <div
      ref={ref}
      aria-hidden="true"
      className={`hidden h-px grow lg:block ${bleed ? "mr-[calc(50%_-_50vw)]" : ""}`}
    >
      <div
        className={`h-px w-full origin-right bg-gradient-to-r transition-transform duration-[1100ms] ease-out ${
          shown ? "scale-x-100" : "scale-x-0"
        } ${className}`}
      />
    </div>
  );
}
