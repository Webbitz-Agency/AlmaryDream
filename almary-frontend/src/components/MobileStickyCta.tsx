"use client";

import { useEffect, useState } from "react";
import BookingDateModal from "./BookingDateModal";
import { useI18n } from "@/i18n/DictionaryProvider";

/**
 * CTA "Verifica disponibilità" flottante e fissa, solo su mobile/tablet.
 * Compare dopo aver scrollato oltre l'hero, così la prenotazione è sempre
 * raggiungibile mentre si scorre la pagina (95% del traffico è da cellulare).
 *
 * Posizione: centrata in basso, TRA il LanguageSwitcher (bottom-left) e la bolla
 * WhatsApp (bottom-right) — z-30, quindi sotto quei FAB (z-40) e sotto il banner
 * cookie (z-60), senza sovrapporsi.
 */
export default function MobileStickyCta() {
  const { dict } = useI18n();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-5 left-1/2 z-30 -translate-x-1/2 lg:hidden ${
          shown ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        } transition-all duration-300`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-colors hover:bg-secondary"
        >
          {dict.roomMeta.availabilityCta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {open && <BookingDateModal open={open} onClose={() => setOpen(false)} guests="2" />}
    </>
  );
}
