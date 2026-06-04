/**
 * Disponibilità sincronizzata via iCal (una sola direzione: il sito LEGGE i
 * calendari dei portali, non scrive nulla verso di essi).
 *
 * ── COME ATTIVARE LA SINCRONIZZAZIONE ──────────────────────────────────────
 * Servono i link di esportazione iCal (.ics) dei portali (Airbnb, Booking…),
 * uno per ogni calendario. Si possono fornire in due modi:
 *
 *   1) Variabile d'ambiente (consigliato — si configura su Vercel senza toccare
 *      il codice): impostare ICAL_FEEDS con gli URL separati da virgola.
 *      Es:  ICAL_FEEDS="https://…/airbnb.ics,https://…/booking.ics"
 *
 *   2) In alternativa, incollarli qui sotto nell'array ICAL_FEEDS_FALLBACK.
 *
 * Finché non c'è nessun feed, la funzione restituisce un elenco vuoto → tutte
 * le date risultano disponibili e il calendario funziona comunque.
 * ───────────────────────────────────────────────────────────────────────────
 */

// Incolla qui gli URL .ics se non usi la variabile d'ambiente ICAL_FEEDS.
const ICAL_FEEDS_FALLBACK: string[] = [
  // "https://www.airbnb.it/calendar/ical/XXXXXXXX.ics?s=...",
  // "https://ical.booking.com/v1/export?t=...",
];

function getFeeds(): string[] {
  const fromEnv = (process.env.ICAL_FEEDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return fromEnv.length > 0 ? fromEnv : ICAL_FEEDS_FALLBACK;
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

/**
 * Scarica e unisce tutti i feed iCal, restituendo l'elenco ordinato e senza
 * duplicati delle date NON disponibili ("YYYY-MM-DD").
 * Resiliente: se un feed fallisce, viene semplicemente ignorato.
 */
export async function fetchUnavailableDates(): Promise<string[]> {
  const feeds = getFeeds();
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
