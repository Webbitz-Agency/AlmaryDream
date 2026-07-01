"use client";

import { useMemo, useState } from "react";
import { priceForDate } from "@/lib/pricing";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const MONTHS = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** Somma `n` giorni a una data "YYYY-MM-DD". */
function addDaysIso(d: string, n: number) {
  const [y, m, dd] = d.split("-").map(Number);
  const t = new Date(y, m - 1, dd + n);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

type Props = {
  checkin: string;
  checkout: string;
  /** Data minima selezionabile (oggi), formato "YYYY-MM-DD". */
  today: string;
  /** Insieme di date non disponibili ("YYYY-MM-DD"). */
  unavailable: Set<string>;
  onPickDay: (dayIso: string) => void;
  /** Sola lettura: mostra occupato/range senza permettere la selezione. */
  readOnly?: boolean;
  /** Fase di selezione corrente: "checkin" o "checkout". */
  selecting?: "checkin" | "checkout";
  /**
   * Pernottamento minimo (notti). Default 2.
   * Eccezione "gap night": una notte libera ISOLATA (occupata prima e dopo) è
   * comunque prenotabile per 1 sola notte.
   */
  minNights?: number;
};

export default function Calendar({
  checkin,
  checkout,
  today,
  unavailable,
  onPickDay,
  readOnly = false,
  selecting = "checkin",
  minNights = 2,
}: Props) {
  // Mese mostrato: parte dal check-in se presente, altrimenti dal mese di oggi.
  const base = (checkin || today).split("-").map(Number);
  const [view, setView] = useState({ year: base[0], month: base[1] - 1 });

  // Date occupate ordinate → per trovare la prima notte occupata dopo una data.
  const occupied = useMemo(() => Array.from(unavailable).sort(), [unavailable]);
  const firstBlockedAfter = (c: string) => {
    for (const o of occupied) if (o > c) return o;
    return null;
  };

  /** Una notte non utilizzabile: occupata o nel passato. */
  const blockedNight = (d: string) => unavailable.has(d) || d < today;

  /**
   * Info sul check-in candidato `c` (presunto libero):
   *  - gap1: c'è una sola notte libera in avanti (la notte successiva è occupata)
   *  - fb: prima notte occupata dopo c (o null se nessuna)
   */
  const startInfo = (c: string) => {
    const n1 = addDaysIso(c, 1);
    const gap1 = unavailable.has(n1);
    const fb = gap1 ? n1 : firstBlockedAfter(c);
    return { gap1, fb };
  };

  /** `c` può iniziare un soggiorno valido? */
  const canStart = (c: string) => {
    if (blockedNight(c)) return false;
    const { gap1 } = startInfo(c);
    if (!gap1) return true; // almeno 2 notti libere in avanti → ok per minimo ≤ 2
    if (minNights <= 1) return true;
    // Una sola notte libera: ammessa solo se ISOLATA (notte precedente occupata/passata).
    return blockedNight(addDaysIso(c, -1));
  };

  // Finestra di check-out valida per il check-in selezionato (fase "checkout").
  const selectingCheckout = !readOnly && selecting === "checkout" && Boolean(checkin);
  let checkoutMin = "";
  let checkoutMax: string | null = null;
  let boundary: string | null = null; // notte occupata ammessa come uscita
  if (selectingCheckout) {
    const { gap1, fb } = startInfo(checkin);
    const minN = gap1 ? 1 : Math.max(1, minNights);
    checkoutMin = addDaysIso(checkin, minN);
    checkoutMax = fb; // null = nessun limite superiore
    boundary = checkoutMax && unavailable.has(checkoutMax) ? checkoutMax : null;
  }

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

          let disabled: boolean;
          let blocked: boolean; // notte occupata → barrata
          if (readOnly) {
            disabled = true;
            blocked = unavailable.has(d);
          } else if (selectingCheckout) {
            blocked = unavailable.has(d) && d !== boundary;
            const inWindow = d >= checkoutMin && (!checkoutMax || d <= checkoutMax);
            const restart = d < checkin && canStart(d); // clic su un check-in alternativo precedente
            disabled = !(inWindow || restart);
          } else {
            // Fase check-in: selezionabile solo se può iniziare un soggiorno valido.
            blocked = unavailable.has(d);
            disabled = !canStart(d);
          }

          const isCheckin = d === checkin;
          const isCheckout = d === checkout;
          const inRange = checkin && checkout && d > checkin && d < checkout;
          const isEndpoint = isCheckin || isCheckout;

          // Tariffa mostrata sotto il numero (stile Booking/Airbnb): solo per
          // date valide (future, non occupate) con prezzo a listino.
          const price = d >= today && !blocked ? priceForDate(d) : null;
          const priceCls = isEndpoint
            ? "text-white/85"
            : inRange
              ? "text-primary/70"
              : "text-muted";

          return (
            <div key={d} className={`flex justify-center ${inRange ? "bg-primary/10" : ""} ${isCheckin && checkout ? "rounded-l-full bg-primary/10" : ""} ${isCheckout ? "rounded-r-full bg-primary/10" : ""}`}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onPickDay(d)}
                aria-label={price ? `${d} — €${price} a notte` : d}
                className={[
                  "flex h-11 w-11 flex-col items-center justify-center gap-0.5 rounded-full text-sm leading-none transition-colors",
                  isEndpoint
                    ? "bg-primary font-semibold text-white"
                    : blocked
                      ? "cursor-not-allowed text-black/20 line-through"
                      : disabled
                        ? "cursor-not-allowed text-black/25"
                        : readOnly
                          ? "cursor-default text-ink"
                          : "text-ink hover:bg-primary/15",
                  isEndpoint && !readOnly ? "hover:bg-secondary" : "",
                ].join(" ")}
              >
                <span>{day}</span>
                {price !== null && (
                  <span className={`text-[9px] font-medium leading-none ${priceCls}`}>€{price}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
