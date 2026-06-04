import { fetchUnavailableDates } from "@/lib/availability";

/**
 * GET /api/availability
 * Restituisce le date NON disponibili (occupate sui portali via iCal):
 *   { "unavailable": ["2026-07-01", "2026-07-02", ...] }
 *
 * Finché non sono configurati feed iCal, restituisce un elenco vuoto.
 * I singoli feed sono cache-ati 1h (vedi fetchUnavailableDates).
 */
export async function GET() {
  try {
    const unavailable = await fetchUnavailableDates();
    return Response.json(
      { unavailable },
      {
        headers: {
          // Cache CDN: 1h fresca + 1h stale-while-revalidate.
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    // In caso di errore non blocchiamo il form: nessuna data disabilitata.
    return Response.json({ unavailable: [] });
  }
}
