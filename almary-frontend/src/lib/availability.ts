/**
 * Disponibilità sincronizzata via iCal (una sola direzione: il sito LEGGE i
 * calendari dei portali, non scrive nulla verso di essi).
 *
 * ── ARCHITETTURA PER-CAMERA ────────────────────────────────────────────────
 * Ogni camera (per `slug`, vedi ROOMS in site.ts) ha i propri feed iCal: una
 * camera può essere presente su più portali (Airbnb, Booking…) → più .ics.
 *
 *   - Disponibilità PER CAMERA: unione delle date occupate dei suoi feed.
 *   - Disponibilità GLOBALE (homepage): una data è "occupata" SOLO se TUTTE le
 *     camere sono occupate quel giorno → intersezione degli insiemi per-camera.
 *     (Se anche una sola camera è libera, la struttura non è al completo.)
 *
 * ── COME AGGIUNGERE / AGGIORNARE I FEED ────────────────────────────────────
 * Incolla gli URL .ics nella mappa ROOM_FEEDS qui sotto, sotto lo slug giusto.
 * In alternativa si possono passare da variabile d'ambiente su Vercel:
 *   ICAL_FEEDS_SMERALDO, ICAL_FEEDS_DREAM, ICAL_FEEDS_BLUE_SKY
 * (URL separati da virgola). Se presenti, hanno la precedenza sulla mappa.
 *
 * Una camera senza feed risulta sempre disponibile (nessuna data occupata).
 * ───────────────────────────────────────────────────────────────────────────
 */

import { ROOMS } from "./site";

/** Feed iCal per camera (slug → elenco URL .ics). */
const ROOM_FEEDS: Record<string, string[]> = {
  smeraldo: [
    "https://www.airbnb.it/calendar/ical/1453393213067555812.ics?t=2639bcbd6b014c199c30a88257633368",
    // Booking: incolla qui il link .ics della camera Smeraldo
  ],
  dream: [
    "https://www.airbnb.it/calendar/ical/1444804249115645265.ics?t=88c896d5e24d435fb38be3f2b5682b33",
    // Booking: incolla qui il link .ics della camera Dream
  ],
  "blue-sky": [
    "https://www.airbnb.it/calendar/ical/1441101569343167994.ics?t=1b4d8a1cbcdb45f495300fa792e6f19b",
    // Booking: incolla qui il link .ics della camera Blue Sky
  ],
};

/** Legge gli eventuali feed da variabile d'ambiente per uno slug. */
function feedsFromEnv(slug: string): string[] {
  const key = `ICAL_FEEDS_${slug.toUpperCase().replace(/-/g, "_")}`;
  return (process.env[key] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Feed effettivi di una camera: env (se presente) altrimenti mappa statica. */
function feedsForRoom(slug: string): string[] {
  const fromEnv = feedsFromEnv(slug);
  return fromEnv.length > 0 ? fromEnv : (ROOM_FEEDS[slug] ?? []);
}

/** "YYYYMMDD" → "YYYY-MM-DD" */
function isoFromIcsDate(value: string): string | null {
  const m = value.match(/(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

/** Somma `days` giorni a una data ISO "YYYY-MM-DD" (in UTC, niente problemi di fuso/DST). */
function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d) + days * 86_400_000;
  const dt = new Date(t);
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${dt.getUTCFullYear()}-${mm}-${dd}`;
}

/**
 * Estrae dal testo .ics le notti occupate come insieme di date "YYYY-MM-DD".
 * Negli iCal di disponibilità gli eventi sono all-day: DTSTART (incluso) →
 * DTEND (escluso). Marchiamo quindi le notti da DTSTART fino a DTEND-1.
 */
function parseIcs(ics: string): string[] {
  // "Unfold": le righe continuano se iniziano con spazio o tab.
  const text = ics.replace(/\r?\n[ \t]/g, "");
  const days: string[] = [];

  const events = text.split(/BEGIN:VEVENT/).slice(1);
  for (const ev of events) {
    const block = ev.split(/END:VEVENT/)[0];
    const startLine = block.match(/DTSTART[^:]*:([0-9TZ]+)/);
    const endLine = block.match(/DTEND[^:]*:([0-9TZ]+)/);
    if (!startLine) continue;

    const start = isoFromIcsDate(startLine[1]);
    if (!start) continue;
    const end = endLine ? isoFromIcsDate(endLine[1]) : null;

    if (!end || end <= start) {
      days.push(start);
      continue;
    }
    for (let cur = start; cur < end; cur = addDays(cur, 1)) {
      days.push(cur);
    }
  }
  return days;
}

/** Scarica e unisce i feed di UNA camera → date occupate ordinate e uniche. */
async function fetchRoomUnavailable(slug: string): Promise<string[]> {
  const feeds = feedsForRoom(slug);
  if (feeds.length === 0) return [];

  const results = await Promise.allSettled(
    feeds.map(async (url) => {
      // Cache lato Next: ogni feed viene riletto al massimo ogni ora.
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`Feed ${url} → HTTP ${res.status}`);
      return parseIcs(await res.text());
    })
  );

  const set = new Set<string>();
  for (const r of results) {
    if (r.status === "fulfilled") r.value.forEach((d) => set.add(d));
  }
  return Array.from(set).sort();
}

export type AvailabilityData = {
  /** Date occupate per camera: { slug: ["YYYY-MM-DD", ...] }. */
  rooms: Record<string, string[]>;
  /** Date occupate a livello struttura (tutte le camere piene quel giorno). */
  unavailable: string[];
};

/**
 * Disponibilità completa: per-camera + globale (intersezione).
 * Resiliente: se un feed fallisce viene ignorato, le altre camere restano ok.
 */
export async function fetchAvailability(): Promise<AvailabilityData> {
  const slugs = ROOMS.map((r) => r.slug);
  const perRoom = await Promise.all(slugs.map((s) => fetchRoomUnavailable(s)));

  const rooms: Record<string, string[]> = {};
  slugs.forEach((slug, i) => (rooms[slug] = perRoom[i]));

  // Globale = intersezione: una data conta solo se occupata in OGNI camera.
  // (Se una camera non ha feed, il suo insieme è vuoto → niente è "globale".)
  const sets = slugs.map((slug) => new Set(rooms[slug]));
  const everyRoomHasData = sets.length > 0 && sets.every((s) => s.size > 0);
  let unavailable: string[] = [];
  if (everyRoomHasData) {
    const [first, ...rest] = sets;
    unavailable = Array.from(first)
      .filter((d) => rest.every((s) => s.has(d)))
      .sort();
  }

  return { rooms, unavailable };
}

/**
 * Retrocompatibilità: solo le date globalmente non disponibili.
 * Usata dalla BookingBar / API per il calendario unico della homepage.
 */
export async function fetchUnavailableDates(): Promise<string[]> {
  const { unavailable } = await fetchAvailability();
  return unavailable;
}
