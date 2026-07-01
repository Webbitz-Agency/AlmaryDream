/**
 * Tariffe per notte — UGUALI per tutte e tre le camere, variabili per periodo.
 * I periodi sono definiti per giorno/mese (MMDD) e si ripetono ogni anno,
 * così le tariffe restano valide anche per le stagioni successive.
 *
 * Fonte (listino cliente):
 *   01/07–09/07  320   |  10/07–24/07  350  |  25/07–31/07  400
 *   01/08–31/08  450   |  01/09–10/09  380  |  11/09–18/09  320
 *   19/09–02/10  270   |  03/10–31/10  230
 *
 * Fuori da questi periodi (bassa stagione) non c'è tariffa a listino:
 * la tariffa è "su richiesta" (priceForDate → null).
 */

type PriceBand = { start: number; end: number; price: number };

/** MMDD = mese*100 + giorno (es. 25 luglio = 725, 2 ottobre = 1002). */
const PRICE_BANDS: PriceBand[] = [
  { start: 701, end: 709, price: 320 },
  { start: 710, end: 724, price: 350 },
  { start: 725, end: 731, price: 400 },
  { start: 801, end: 831, price: 450 },
  { start: 901, end: 910, price: 380 },
  { start: 911, end: 918, price: 320 },
  { start: 919, end: 1002, price: 270 },
  { start: 1003, end: 1031, price: 230 },
];

/** Tariffa per notte per una data "YYYY-MM-DD" (null se fuori listino). */
export function priceForDate(isoDate: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const [, m, d] = isoDate.split("-").map(Number);
  const mmdd = m * 100 + d;
  for (const b of PRICE_BANDS) if (mmdd >= b.start && mmdd <= b.end) return b.price;
  return null;
}

/** Tariffa minima e massima del listino (per messaggi "a partire da"). */
export function priceRange(): { min: number; max: number } {
  const prices = PRICE_BANDS.map((b) => b.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

function addDaysIso(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const t = new Date(y, m - 1, d + days);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

export type StayCost = {
  /** Numero di notti [checkin, checkout). */
  nights: number;
  /** Totale del soggiorno (somma delle tariffe di ogni notte). */
  total: number;
  /** Tariffa media a notte, arrotondata. */
  avg: number;
  /** false se almeno una notte è fuori listino (tariffa da concordare). */
  allPriced: boolean;
};

/** Calcola il costo del soggiorno sommando la tariffa di ogni notte. */
export function stayCost(checkin: string, checkout: string): StayCost | null {
  if (!checkin || !checkout || checkout <= checkin) return null;
  let nights = 0;
  let total = 0;
  let allPriced = true;
  for (let cur = checkin; cur < checkout; cur = addDaysIso(cur, 1)) {
    const p = priceForDate(cur);
    if (p === null) allPriced = false;
    else total += p;
    nights++;
  }
  const avg = nights > 0 ? Math.round(total / nights) : 0;
  return { nights, total, avg, allPriced };
}

/** "1280" → "€1.280" (formato italiano, senza decimali). */
export function formatEuro(n: number): string {
  return `€${n.toLocaleString("it-IT")}`;
}
