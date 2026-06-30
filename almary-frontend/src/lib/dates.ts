/** Helper date condivisi tra la BookingBar dell'hero e i bottoni delle camere. */

/** Data odierna in formato ISO "YYYY-MM-DD" (fuso locale). */
export function todayIso() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

/** Somma `days` giorni a una data ISO e restituisce ISO. */
export function addDaysIso(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const t = new Date(y, m - 1, d + days);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

/** "2026-07-12" → "ven 12 lug" */
export function fmtShort(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "numeric", month: "short" })
    .format(new Date(y, m - 1, d));
}
