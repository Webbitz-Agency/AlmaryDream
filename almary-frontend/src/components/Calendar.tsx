"use client";

import { useState } from "react";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const MONTHS = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

type Props = {
  checkin: string;
  checkout: string;
  /** Data minima selezionabile (oggi), formato "YYYY-MM-DD". */
  today: string;
  /** Insieme di date non disponibili ("YYYY-MM-DD"). */
  unavailable: Set<string>;
  onPickDay: (dayIso: string) => void;
};

export default function Calendar({ checkin, checkout, today, unavailable, onPickDay }: Props) {
  // Mese mostrato: parte dal check-in se presente, altrimenti dal mese di oggi.
  const base = (checkin || today).split("-").map(Number);
  const [view, setView] = useState({ year: base[0], month: base[1] - 1 });

  const firstOfMonth = new Date(view.year, view.month, 1);
  // Lunedì-primo: (getDay()+6)%7 → 0 = lunedì.
  const leading = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const goPrev = () =>
    setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const goNext = () =>
    setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  // Non si può tornare a mesi interamente passati.
  const monthIsPast = iso(view.year, view.month, daysInMonth) < today;

  const cells: (number | null)[] = [
    ...Array(leading).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="select-none">
      {/* Intestazione mese + navigazione */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={monthIsPast}
          aria-label="Mese precedente"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-25"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="font-serif text-lg text-ink">
          {MONTHS[view.month]} {view.year}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="Mese successivo"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-primary/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Giorni della settimana */}
      <div className="grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-wide text-muted">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1">{w}</span>
        ))}
      </div>

      {/* Griglia giorni */}
      <div className="mt-1 grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`e${i}`} />;
          const d = iso(view.year, view.month, day);

          const isPast = d < today;
          const isBooked = unavailable.has(d);
          const disabled = isPast || isBooked;

          const isCheckin = d === checkin;
          const isCheckout = d === checkout;
          const inRange = checkin && checkout && d > checkin && d < checkout;
          const isEndpoint = isCheckin || isCheckout;

          return (
            <div key={d} className={`flex justify-center ${inRange ? "bg-primary/10" : ""} ${isCheckin && checkout ? "rounded-l-full bg-primary/10" : ""} ${isCheckout ? "rounded-r-full bg-primary/10" : ""}`}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onPickDay(d)}
                aria-label={d}
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors",
                  isEndpoint
                    ? "bg-primary font-semibold text-white hover:bg-secondary"
                    : disabled
                      ? "cursor-not-allowed text-black/20 line-through"
                      : "text-ink hover:bg-primary/15",
                ].join(" ")}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
