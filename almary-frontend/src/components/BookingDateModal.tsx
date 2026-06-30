"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Calendar from "./Calendar";
import { todayIso, addDaysIso, fmtShort } from "@/lib/dates";

/**
 * Modale calendario condiviso: scegli check-in/check-out e vieni portato alla
 * pagina /disponibilita, esattamente come la ricerca dell'hero.
 * Controllato dall'esterno (open/onClose) così può essere aperto da più
 * trigger (card camere, CTA "Prenota Ora" della navbar, …).
 * Resta sempre montato (rende null da chiuso) per pre-caricare la disponibilità.
 */
export default function BookingDateModal({
  open,
  onClose,
  guests = "2",
}: {
  open: boolean;
  onClose: () => void;
  guests?: string;
}) {
  const router = useRouter();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [step, setStep] = useState<"checkin" | "checkout">("checkin");
  const [today, setToday] = useState("");
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());

  // Carica una sola volta: oggi + date occupate.
  useEffect(() => {
    setToday(todayIso());
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data: { unavailable?: string[] }) => {
        if (Array.isArray(data.unavailable)) setUnavailable(new Set(data.unavailable));
      })
      .catch(() => {});
  }, []);

  // Reset della selezione a ogni apertura.
  useEffect(() => {
    if (open) {
      setCheckin("");
      setCheckout("");
      setStep("checkin");
    }
  }, [open]);

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
      setCheckin(d);
      setCheckout("");
      setStep("checkout");
      return;
    }
    setCheckout(d);
  };

  const goToResults = () => {
    if (!checkin || !checkout) return;
    const params = new URLSearchParams({ checkin, checkout, guests });
    router.push(`/disponibilita?${params.toString()}`);
  };

  if (!open || !today) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full rounded-t-2xl bg-white p-5 shadow-card sm:w-auto sm:max-w-sm sm:rounded-2xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">
            {step === "checkin" || !checkin ? "Seleziona il check-in" : "Seleziona il check-out"}
          </p>
          <button
            type="button"
            onClick={onClose}
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
            {checkin ? fmtShort(checkin) : "—"} → {checkout ? fmtShort(checkout) : "—"}
          </span>
          <button
            type="button"
            onClick={goToResults}
            disabled={!checkin || !checkout}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Verifica disponibilità
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-muted">
          Soggiorno minimo 2 notti{unavailable.size > 0 ? " · le date barrate non sono disponibili" : ""}.
        </p>
      </div>
    </div>,
    document.body
  );
}
