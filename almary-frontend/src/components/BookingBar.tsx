"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Calendar from "./Calendar";
import { todayIso, addDaysIso, fmtShort as fmt } from "@/lib/dates";

/**
 * Barra di conversione (Check-in / Check-out / Ospiti / Verifica Disponibilità).
 * I campi data aprono un calendario custom in stile col sito (niente datepicker
 * di sistema). Le date occupate arrivano da /api/availability (sync iCal,
 * unidirezionale): il calendario unico della homepage usa la disponibilità
 * "globale" (struttura al completo).
 * Al submit porta alla pagina /disponibilita con le camere libere per le date
 * e gli ospiti scelti.
 */

export default function BookingBar({
  className = "",
  initialCheckin = "",
  initialCheckout = "",
  initialGuests = "2",
}: {
  className?: string;
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: string;
}) {
  const router = useRouter();
  const [checkin, setCheckin] = useState(initialCheckin);
  const [checkout, setCheckout] = useState(initialCheckout);
  const [guests, setGuests] = useState(initialGuests);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"checkin" | "checkout">("checkin");
  const [today, setToday] = useState("");
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());

  useEffect(() => {
    setToday(todayIso());
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data: { unavailable?: string[] }) => {
        if (Array.isArray(data.unavailable)) setUnavailable(new Set(data.unavailable));
      })
      .catch(() => {});
  }, []);

  const openPicker = (which: "checkin" | "checkout") => {
    if (which === "checkin" || !checkin) {
      setCheckin("");
      setCheckout("");
      setStep("checkin");
    } else {
      setCheckout("");
      setStep("checkout");
    }
    setOpen(true);
  };

  const hasBookedBetween = (start: string, end: string) => {
    for (let cur = addDaysIso(start, 1); cur < end; cur = addDaysIso(cur, 1)) {
      if (unavailable.has(cur)) return true;
    }
    return false;
  };

  const onPickDay = (d: string) => {
    if (step === "checkin" || !checkin) {
      setCheckin(d);
      setCheckout("");
      setStep("checkout");
      return;
    }
    // step === "checkout"
    if (d <= checkin || hasBookedBetween(checkin, d)) {
      // data non valida come uscita → ricomincia da qui come check-in
      setCheckin(d);
      setCheckout("");
      setStep("checkout");
      return;
    }
    setCheckout(d);
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guida l'utente a completare le date prima di cercare.
    if (!checkin) return openPicker("checkin");
    if (!checkout) return openPicker("checkout");
    const params = new URLSearchParams({ checkin, checkout, guests });
    router.push(`/disponibilita?${params.toString()}`);
  };

  const labelCls = "text-[10px] font-medium uppercase tracking-wide text-muted sm:text-xs";
  const fieldBase =
    "w-full rounded-lg border border-black/10 bg-white px-2.5 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-3";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-3 gap-2.5 rounded-xl bg-white p-4 shadow-card sm:grid-cols-4 sm:items-end sm:gap-3 lg:p-5 ${className}`}
      >
        <div className="flex flex-col gap-1.5">
          <span className={labelCls}>Check-in</span>
          <button type="button" onClick={() => openPicker("checkin")} className={`${fieldBase} text-left`}>
            {checkin ? fmt(checkin) : <span className="text-muted">–</span>}
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={labelCls}>Check-out</span>
          <button type="button" onClick={() => openPicker("checkout")} className={`${fieldBase} text-left`}>
            {checkout ? fmt(checkout) : <span className="text-muted">–</span>}
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="guests" className={labelCls}>Ospiti</label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={fieldBase}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-3 h-[46px] rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-secondary sm:col-span-1"
        >
          Verifica Disponibilità
        </button>
      </form>

      {/* Pannello calendario: bottom-sheet su mobile, card centrata su desktop */}
      {open && today && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full rounded-t-2xl bg-white p-5 shadow-card sm:w-auto sm:max-w-sm sm:rounded-2xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">
                {step === "checkin" || !checkin ? "Seleziona il check-in" : "Seleziona il check-out"}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <Calendar
              checkin={checkin}
              checkout={checkout}
              today={today}
              unavailable={unavailable}
              onPickDay={onPickDay}
              selecting={step}
              minNights={2}
            />

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-4">
              <span className="text-xs text-muted">
                {checkin ? fmt(checkin) : "—"} → {checkout ? fmt(checkout) : "—"}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
              >
                Conferma
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-muted">
              Soggiorno minimo 2 notti{unavailable.size > 0 ? " · le date barrate non sono disponibili" : ""}.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
