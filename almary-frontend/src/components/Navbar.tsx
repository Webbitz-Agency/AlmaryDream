"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";
import BookingDateModal from "./BookingDateModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/90 shadow-nav backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Topbar sottile: telefono a sinistra, email a destra */}
      <div
        className={`border-b transition-colors duration-300 ${
          solid ? "border-black/5" : "border-white/15"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 text-xs lg:px-8">
          <a
            href={SITE.phoneHref}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:text-accent ${
              solid ? "text-ink/80" : "text-white/90"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span>{SITE.phone}</span>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:text-accent ${
              solid ? "text-ink/80" : "text-white/90"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 6 10 7L22 6" />
            </svg>
            <span>{SITE.email}</span>
          </a>
        </div>
      </div>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
        {/* Logo — versione colori su navbar solida, bianca su hero trasparente */}
        <a href="#top" className="relative z-10 flex items-center" aria-label="Almary Dream — home">
          <Image
            src={solid ? "/Logo/logo.png" : "/Logo/logoBianco.png"}
            alt="Almary Dream"
            width={72}
            height={72}
            priority
            className="h-14 w-14 object-contain lg:h-[4.5rem] lg:w-[4.5rem]"
          />
        </a>

        {/* Link desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  solid ? "text-ink" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <button
          type="button"
          onClick={() => setDatesOpen(true)}
          className="hidden h-11 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary lg:inline-flex"
        >
          Prenota Ora
        </button>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-6 flex-col gap-1.5">
            <span className={`h-0.5 w-full transition-all ${solid ? "bg-ink" : "bg-white"} ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-full transition-all ${solid ? "bg-ink" : "bg-white"} ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full transition-all ${solid ? "bg-ink" : "bg-white"} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Menu mobile a tendina */}
      <div
        className={`bg-white transition-[max-height] duration-300 lg:hidden ${
          open
            ? "max-h-[calc(100dvh-6.25rem)] overflow-y-auto border-t border-black/5"
            : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setDatesOpen(true);
              }}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
            >
              Prenota Ora
            </button>
          </li>
        </ul>
      </div>

      <BookingDateModal open={datesOpen} onClose={() => setDatesOpen(false)} />
    </header>
  );
}
