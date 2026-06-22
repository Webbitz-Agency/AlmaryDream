"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ROOMS, bookingHref, type Room } from "@/lib/site";
import Calendar from "@/components/Calendar";
import BookingBar from "@/components/BookingBar";

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

  // Stato di ogni camera per le date/ospiti scelti.
  const evaluated = ROOMS.map((room) => {
    const unavailable = new Set(roomsAvailability[room.slug] ?? []);
    const fits = room.maxGuests >= guestsNum;
    const free = validRange && !hasBookedNight(unavailable, checkin, checkout);
    return { room, unavailable, fits, free, available: fits && free };
  });

  const available = evaluated.filter((e) => e.available);
  const others = evaluated.filter((e) => !e.available);

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
        </p>
      ) : (
        <p className="mt-4 text-base text-muted">Scegli le date per vedere le camere disponibili.</p>
      )}

      {/* Modifica ricerca */}
      <div className="mt-7 max-w-3xl">
        <BookingBar initialCheckin={checkin} initialCheckout={checkout} initialGuests={guests} />
      </div>

      {/* Camere disponibili */}
      <div className="mt-12">
        {validRange && available.length > 0 && (
          <>
            <h2 className="mb-5 text-lg font-semibold text-ink">
              {available.length} {available.length === 1 ? "camera disponibile" : "camere disponibili"}
            </h2>
            <div className="space-y-6">
              {available.map((e) => (
                <RoomResultCard
                  key={e.room.slug}
                  room={e.room}
                  unavailable={e.unavailable}
                  today={today}
                  checkin={checkin}
                  checkout={checkout}
                  guests={guestsNum}
                  available
                />
              ))}
            </div>
          </>
        )}

        {validRange && available.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-ink">Nessuna camera disponibile per questa ricerca</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              {guestsNum > Math.max(...ROOMS.map((r) => r.maxGuests))
                ? "Per il numero di ospiti scelto può servire più di una camera: scrivici e troviamo la soluzione giusta."
                : "Prova a modificare le date qui sopra, oppure scrivici: a volte abbiamo soluzioni non sincronizzate online."}
            </p>
            <a
              href={bookingHref(
                `Ciao Almary Dream! Vorrei verificare la disponibilità dal ${fmt(checkin)} al ${fmt(checkout)} per ${guestsNum} ospiti.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        )}

        {/* Altre camere (non disponibili per le date scelte) — calendario consultabile */}
        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 text-lg font-semibold text-muted">
              {validRange ? "Non disponibili per queste date" : "Le nostre camere"}
            </h2>
            <div className="space-y-6">
              {others.map((e) => (
                <RoomResultCard
                  key={e.room.slug}
                  room={e.room}
                  unavailable={e.unavailable}
                  today={today}
                  checkin={checkin}
                  checkout={checkout}
                  guests={guestsNum}
                  available={false}
                  reason={!e.fits ? "Capienza non sufficiente" : "Date già occupate"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RoomResultCard({
  room,
  unavailable,
  today,
  checkin,
  checkout,
  guests,
  available,
  reason,
}: {
  room: Room;
  unavailable: Set<string>;
  today: string;
  checkin: string;
  checkout: string;
  guests: number;
  available: boolean;
  reason?: string;
}) {
  const message = available
    ? `Ciao Almary Dream! Vorrei prenotare la ${room.name} dal ${fmt(checkin)} al ${fmt(checkout)} per ${guests} ${guests === 1 ? "ospite" : "ospiti"}.`
    : `Ciao Almary Dream! Sono interessato/a alla ${room.name}, vorrei verificare le date disponibili.`;

  return (
    <article className={`grid overflow-hidden rounded-2xl border md:grid-cols-2 ${available ? "border-black/10 bg-white" : "border-black/5 bg-white/60"}`}>
      {/* Foto */}
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px]">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover ${available ? "" : "opacity-70"}`}
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            available ? "bg-primary text-white" : "bg-black/60 text-white"
          }`}
        >
          {available ? "Disponibile" : reason}
        </span>
      </div>

      {/* Dettagli + calendario */}
      <div className="flex flex-col p-5 lg:p-6">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-secondary">
          <span>{room.size}</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span>{room.guests}</span>
        </div>
        <h3 className="mt-2 font-serif text-2xl font-normal leading-tight text-ink">{room.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{room.description}</p>

        <div className="mt-4 rounded-xl border border-black/5 bg-offwhite p-3">
          {today && (
            <Calendar
              checkin={available ? checkin : ""}
              checkout={available ? checkout : ""}
              today={today}
              unavailable={unavailable}
              onPickDay={() => {}}
              readOnly
            />
          )}
          <p className="mt-2 text-center text-[11px] text-muted">
            Le date barrate non sono disponibili per questa camera.
          </p>
        </div>

        <a
          href={bookingHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-colors ${
            available
              ? "bg-primary text-white hover:bg-secondary"
              : "border border-primary/30 text-primary hover:bg-primary/5"
          }`}
        >
          {available ? "Prenota questa camera" : "Chiedi altre date"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}
