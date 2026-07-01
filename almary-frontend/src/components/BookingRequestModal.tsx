"use client";

import { useEffect, useState } from "react";
import { stayCost, formatEuro } from "@/lib/pricing";

/** "2026-07-12" → "ven 12 lug" */
function fmt(isoDate?: string) {
  if (!isoDate) return "—";
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "numeric", month: "short" })
    .format(new Date(y, m - 1, d));
}

function nights(checkin?: string, checkout?: string) {
  if (!checkin || !checkout) return 0;
  const [y1, m1, d1] = checkin.split("-").map(Number);
  const [y2, m2, d2] = checkout.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000);
}

type Props = {
  open: boolean;
  onClose: () => void;
  room?: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
};

type Status = "idle" | "sending" | "sent" | "error";

export default function BookingRequestModal({ open, onClose, room, checkin, checkout, guests }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset alla riapertura + Esc + blocco scroll del body.
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorMsg("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const nightsCount = nights(checkin, checkout);
  const cost = checkin && checkout ? stayCost(checkin, checkout) : null;
  const priceTotal = cost && cost.allPriced ? String(cost.total) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, room, checkin, checkout, guests, priceTotal }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Invio non riuscito.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Invio non riuscito. Riprova.");
    }
  };

  const fieldCls =
    "w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
  const labelCls = "mb-1 block text-xs font-medium text-ink";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Richiesta di prenotazione"
    >
      <div
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-card sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "sent" ? (
          // ── Conferma ──────────────────────────────────────────────────────
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-2xl text-ink">Richiesta inviata!</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Grazie {name.split(" ")[0]}, abbiamo ricevuto la tua richiesta per la {room ?? "tua camera"}.
              Ti risponderemo al più presto per confermare la disponibilità.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary"
            >
              Chiudi
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow text-primary">Richiesta di prenotazione</p>
            <h3 className="mt-2 font-serif text-2xl font-normal text-ink">
              {room ? room : "Il tuo soggiorno"}
            </h3>

            {/* Riepilogo precompilato */}
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-offwhite p-3 text-center text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted">Check-in</p>
                <p className="mt-0.5 font-semibold text-ink">{fmt(checkin)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted">Check-out</p>
                <p className="mt-0.5 font-semibold text-ink">{fmt(checkout)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted">Ospiti</p>
                <p className="mt-0.5 font-semibold text-ink">{guests ?? "—"}</p>
              </div>
            </div>
            {nightsCount > 0 && (
              <p className="mt-1.5 text-center text-xs text-muted">
                {nightsCount} {nightsCount === 1 ? "notte" : "notti"}
              </p>
            )}
            {cost && cost.nights > 0 && (
              cost.allPriced ? (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
                  <span className="text-sm text-muted">Totale stimato</span>
                  <span className="font-serif text-xl text-ink">{formatEuro(cost.total)}</span>
                </div>
              ) : (
                <p className="mt-3 rounded-xl bg-offwhite px-4 py-3 text-center text-sm text-muted">
                  Tariffa su richiesta per queste date
                </p>
              )
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label htmlFor="br-name" className={labelCls}>Nome e cognome *</label>
                <input id="br-name" required value={name} onChange={(e) => setName(e.target.value)} className={fieldCls} placeholder="Mario Rossi" />
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="br-email" className={labelCls}>Email *</label>
                  <input id="br-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={fieldCls} placeholder="mario@email.it" />
                </div>
                <div>
                  <label htmlFor="br-phone" className={labelCls}>Telefono *</label>
                  <input id="br-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={fieldCls} placeholder="+39 333 1234567" />
                </div>
              </div>
              <div>
                <label htmlFor="br-msg" className={labelCls}>Messaggio (facoltativo)</label>
                <textarea id="br-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${fieldCls} resize-none`} placeholder="Richieste particolari, orario di arrivo…" />
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:opacity-60"
              >
                {status === "sending" ? "Invio in corso…" : "Invia richiesta"}
              </button>
              <p className="text-center text-[11px] text-muted">
                Nessun pagamento ora: invii solo una richiesta, ti confermeremo la disponibilità.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
