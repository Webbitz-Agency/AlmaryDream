"use client";

import { useState } from "react";
import { bookingHref } from "@/lib/site";

/**
 * Barra di conversione (Check-in / Check-out / Ospiti / Verifica Disponibilità).
 * Solo visiva: al submit reindirizza a WhatsApp con messaggio precompilato.
 * Nessun backend → massima performance, zero impatto su CLS.
 */
export default function BookingBar({ className = "" }: { className?: string }) {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      "Ciao Almary Dream! Vorrei verificare la disponibilità.",
      checkin && `Check-in: ${checkin}`,
      checkout && `Check-out: ${checkout}`,
      `Ospiti: ${guests}`,
    ].filter(Boolean);
    window.open(bookingHref(parts.join("\n")), "_blank", "noopener,noreferrer");
  };

  const fieldBase =
    "w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-card sm:grid-cols-4 sm:items-end lg:p-5 ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="checkin" className="text-xs font-medium uppercase tracking-wide text-muted">
          Check-in
        </label>
        <input
          id="checkin"
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className={fieldBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="checkout" className="text-xs font-medium uppercase tracking-wide text-muted">
          Check-out
        </label>
        <input
          id="checkout"
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className={fieldBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="guests" className="text-xs font-medium uppercase tracking-wide text-muted">
          Ospiti
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className={fieldBase}
        >
          <option value="1">1 ospite</option>
          <option value="2">2 ospiti</option>
          <option value="3">3 ospiti</option>
          <option value="4">4 ospiti</option>
        </select>
      </div>

      <button
        type="submit"
        className="col-span-2 h-[46px] rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-secondary sm:col-span-1"
      >
        Verifica Disponibilità
      </button>
    </form>
  );
}
