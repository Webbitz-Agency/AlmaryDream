"use client";

import { useState } from "react";
import BookingDateModal from "./BookingDateModal";

/**
 * Bottone "Verifica disponibilità" delle card camera.
 * Apre lo stesso calendario dell'hero (BookingDateModal) e porta a /disponibilita.
 */
export default function RoomAvailabilityButton({
  guests = "2",
  className = "",
}: {
  guests?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary ${className}`}
      >
        Verifica disponibilità
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <BookingDateModal open={open} onClose={() => setOpen(false)} guests={guests} />
    </>
  );
}
