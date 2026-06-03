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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
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
