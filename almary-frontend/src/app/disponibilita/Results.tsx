"use client";

import { useEffect, useState } from "react";
import { ROOMS, type Room } from "@/lib/site";
import Calendar from "@/components/Calendar";
import BookingBar from "@/components/BookingBar";
import RoomCarousel from "@/components/RoomCarousel";
import BookingRequestModal from "@/components/BookingRequestModal";

/** "2026-07-12" → "ven 12 lug" */
function fmt(isoDate: string) {
  if (!isoDate) return "—";
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "numeric", month: "short" })
    .format(new Date(y, m - 1, d));
}

function addDaysIso(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const t = new Date(y, m - 1, d + days);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

/** Numero di notti tra due date ISO. */
function nights(checkin: string, checkout: string) {
  if (!checkin || !checkout) return 0;
  let n = 0;
  for (let cur = checkin; cur < checkout; cur = addDaysIso(cur, 1)) n++;
  return n;
}

/** true se una qualsiasi notte del soggiorno [checkin, checkout) è occupata. */
function hasBookedNight(unavailable: Set<string>, checkin: string, checkout: string) {
  for (let cur = checkin; cur < checkout; cur = addDaysIso(cur, 1)) {
    if (unavailable.has(cur)) return true;
  }
  return false;
}

/**
 * Rispetta il minimo di 2 notti, con eccezione "gap night": 1 notte è ammessa
 * solo se isolata (notte precedente e successiva occupate/passate).
 */
function meetsMinNights(unavailable: Set<string>, today: string, checkin: string, checkout: string) {
  const n = nights(checkin, checkout);
  if (n >= 2) return true;
  if (n === 1) {
    const prev = addDaysIso(checkin, -1);
    const prevBlocked = unavailable.has(prev) || (today !== "" && prev < today);
    const nextBlocked = unavailable.has(checkout); // notte successiva alla singola notte
    return prevBlocked && nextBlocked;
  }
  return false;
}

type Props = {
  checkin: string;
  checkout: string;
  guests: string;
  roomsAvailability: Record<string, string[]>;
};

export default function Results({ checkin, checkout, guests, roomsAvailability }: Props) {
  const [today, setToday] = useState("");
  useEffect(() => {
    const n = new Date();
    setToday(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`);
  }, []);

  const guestsNum = Number(guests) || 1;
  const validRange = Boolean(checkin && checkout && checkout > checkin);
  const nightsCount = nights(checkin, checkout);

  // Stato di ogni camera per la ricerca corrente.
  const evaluated = ROOMS.map((room) => {
    const unavailable = new Set(roomsAvailability[room.slug] ?? []);
    const fits = room.maxGuests >= guestsNum;
    const free =
      validRange &&
      !hasBookedNight(unavailable, checkin, checkout) &&
      meetsMinNights(unavailable, today, checkin, checkout);
    const reason = !fits ? "Capienza non sufficiente" : "Date occupate";
    return { room, unavailable, fits, available: fits && free, reason };
  });

  const available = evaluated.filter((e) => e.available);
  const others = evaluated.filter((e) => !e.available);
  const noneFitsGuests = evaluated.every((e) => !e.fits);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
      {/* Intestazione + riepilogo ricerca */}
      <p className="eyebrow text-primary">Disponibilità</p>
      <h1 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
        Le camere per il tuo <em className="italic text-primary">soggiorno</em>
      </h1>
      {validRange ? (
        <p className="mt-4 text-base text-muted">
          <span className="font-semibold text-ink">{fmt(checkin)}</span> → <span className="font-semibold text-ink">{fmt(checkout)}</span>
          {" · "}{nightsCount} {nightsCount === 1 ? "notte" : "notti"}
          {" · "}{guestsNum} {guestsNum === 1 ? "ospite" : "ospiti"}
          {" · "}
          <span className={available.length > 0 ? "font-semibold text-primary" : "font-semibold text-ink"}>
            {available.length} {available.length === 1 ? "camera disponibile" : "camere disponibili"}
          </span>
        </p>
      ) : (
        <p className="mt-4 text-base text-muted">Scegli le date per vedere le camere disponibili.</p>
      )}

      {/* Modifica ricerca globale */}
      <div className="mt-7 max-w-3xl">
        <BookingBar initialCheckin={checkin} initialCheckout={checkout} initialGuests={guests} />
      </div>

      {noneFitsGuests && (
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-ink">
          Per <strong>{guestsNum} ospiti</strong> può servire più di una camera: scegli comunque una camera qui
          sotto e scrivici, oppure contattaci per combinare più stanze.
        </div>
      )}

      {/* ── CAMERE DISPONIBILI (card grandi) ───────────────────────────── */}
      {available.length > 0 && (
        <div className="mt-12">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <h2 className="text-lg font-semibold text-ink">
              {available.length === 1 ? "Disponibile per le tue date" : `${available.length} camere disponibili`}
            </h2>
          </div>
          <div className="space-y-6">
            {available.map((e) => (
              <RoomCard
                key={e.room.slug}
                room={e.room}
                unavailable={e.unavailable}
                today={today}
                fits={e.fits}
                guests={guestsNum}
                initialCheckin={validRange ? checkin : ""}
                initialCheckout={validRange ? checkout : ""}
              />
            ))}
          </div>
        </div>
      )}

      {available.length === 0 && validRange && (
        <p className="mt-12 text-base text-ink">
          Nessuna camera disponibile per queste date. Modifica le date qui sopra o controlla qui sotto quando ogni
          camera è libera.
        </p>
      )}

      {/* ── CAMERE NON DISPONIBILI (card compatte + calendario) ─────────── */}
      {others.length > 0 && (
        <div className="mt-12 border-t border-black/10 pt-10">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-black/30" />
            <h2 className="text-lg font-semibold text-ink/80">
              {validRange ? "Non disponibili per queste date" : "Le altre camere"}
            </h2>
          </div>
          <p className="mb-5 text-sm text-muted">Cambia le date sul calendario di ogni camera per scoprire quando è libera.</p>
          <div className="space-y-5">
            {others.map((e) => (
              <RoomCard
                key={e.room.slug}
                small
                room={e.room}
                unavailable={e.unavailable}
                today={today}
                fits={e.fits}
                guests={guestsNum}
                reason={e.reason}
                initialCheckin={validRange ? checkin : ""}
                initialCheckout={validRange ? checkout : ""}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function RoomCard({
  room,
  unavailable,
  today,
  fits,
  guests,
  reason,
  initialCheckin,
  initialCheckout,
  small = false,
}: {
  room: Room;
  unavailable: Set<string>;
  today: string;
  fits: boolean;
  guests: number;
  reason?: string;
  initialCheckin: string;
  initialCheckout: string;
  /** Versione più compatta (sezione "non disponibili"): foto più bassa. */
  small?: boolean;
}) {
  // Date modificabili per QUESTA camera (partono dalla ricerca globale).
  const [ci, setCi] = useState(initialCheckin);
  const [co, setCo] = useState(initialCheckout);
  const [step, setStep] = useState<"checkin" | "checkout">("checkin");
  const [modalOpen, setModalOpen] = useState(false);

  const onPickDay = (d: string) => {
    if (step === "checkin" || !ci) {
      setCi(d);
      setCo("");
      setStep("checkout");
      return;
    }
    if (d <= ci || hasBookedNight(unavailable, ci, d)) {
      setCi(d);
      setCo("");
      setStep("checkout");
      return;
    }
    setCo(d);
    setStep("checkin");
  };

  const resetDates = () => {
    setCi("");
    setCo("");
    setStep("checkin");
  };

  const hasRange = Boolean(ci && co && co > ci);
  const free =
    fits && hasRange && !hasBookedNight(unavailable, ci, co) && meetsMinNights(unavailable, today, ci, co);
  const nightsCount = nights(ci, co);

  const badge = !fits
    ? { text: "Capienza non sufficiente", cls: "bg-black/60 text-white" }
    : free
      ? { text: "Disponibile", cls: "bg-primary text-white" }
      : !hasRange
        ? { text: step === "checkout" && ci ? "Scegli il check-out" : "Scegli le date", cls: "bg-black/50 text-white" }
        : { text: reason ?? "Non disponibile", cls: "bg-black/60 text-white" };

  return (
    <article className={`grid overflow-hidden rounded-2xl border md:grid-cols-2 ${free ? "border-primary/30 bg-white" : "border-black/10 bg-white"}`}>
      <div className="relative md:h-full">
        <RoomCarousel
          images={room.images}
          name={room.name}
          className={`group relative aspect-[4/3] w-full overflow-hidden bg-offwhite md:aspect-auto md:h-full ${small ? "md:min-h-[300px]" : "md:min-h-[420px]"}`}
        />
        <span className={`pointer-events-none absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold ${badge.cls}`}>
          {badge.text}
        </span>
      </div>

      <div className={`flex flex-col ${small ? "p-4 lg:p-5" : "p-5 lg:p-6"}`}>
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-secondary">
          <span>{room.size}</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span>{room.guests}</span>
        </div>
        <h3 className={`mt-2 font-serif font-normal leading-tight text-ink ${small ? "text-xl" : "text-2xl"}`}>{room.name}</h3>
        <p className={`mt-2 leading-relaxed text-muted ${small ? "text-xs" : "text-sm"}`}>{room.description}</p>

        <div className="mt-4 rounded-xl border border-black/5 bg-offwhite p-3">
          {today && (
            <Calendar
              checkin={ci}
              checkout={co}
              today={today}
              unavailable={unavailable}
              onPickDay={onPickDay}
              selecting={step}
              minNights={2}
            />
          )}
          <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted">
            <span>Soggiorno minimo 2 notti.</span>
            {(ci || co) && (
              <button type="button" onClick={resetDates} className="font-medium text-primary hover:underline">
                Cancella
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm">
          <span className="text-muted">Soggiorno: </span>
          <span className="font-semibold text-ink">{fmt(ci)} → {fmt(co)}</span>
          {hasRange && <span className="text-muted"> · {nightsCount} {nightsCount === 1 ? "notte" : "notti"}</span>}
        </p>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-colors ${
            free ? "bg-primary text-white hover:bg-secondary" : "border border-primary/30 text-primary hover:bg-primary/5"
          } ${small ? "h-11" : "h-12"}`}
        >
          {free ? "Prenota questa camera" : "Richiedi questa camera"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <BookingRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        room={room.name}
        checkin={ci}
        checkout={co}
        guests={guests}
      />
    </article>
  );
}
