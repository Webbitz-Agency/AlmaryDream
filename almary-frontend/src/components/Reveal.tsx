"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** ritardo in ms per effetto staggered */
  delay?: number;
  /** direzione di entrata */
  from?: "up" | "left" | "right";
};

const OFFSET: Record<NonNullable<Props["from"]>, string> = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
};

/**
 * Anima l'entrata del contenuto quando entra nel viewport (una sola volta).
 * Usa transizioni CSS (no layout shift: opacity/transform non riflowano).
 * Rispetta prefers-reduced-motion mostrando subito il contenuto.
 */
export default function Reveal({ children, className = "", delay = 0, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    // Soglia 0: basta 1px visibile per far comparire il contenuto → molto più
    // affidabile del vecchio 0.15 (che a volte non scattava, lasciando le foto
    // della galleria invisibili nel layout a colonne).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Rete di sicurezza: se poco dopo il mount l'elemento è già dentro lo
    // schermo ma l'observer non ha fatto comparire nulla, mostralo comunque.
    // (Gli elementi ancora sotto la piega mantengono la loro animazione.)
    const failSafe = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setShown(true);
        io.disconnect();
      }
    }, 600);

    return () => {
      io.disconnect();
      clearTimeout(failSafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[850ms] ease-out will-change-[opacity,transform] ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : `${OFFSET[from]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}
