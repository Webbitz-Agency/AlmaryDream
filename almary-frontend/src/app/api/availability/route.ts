import { fetchAvailability } from "@/lib/availability";

/**
 * GET /api/availability
 * Restituisce la disponibilità sincronizzata via iCal (lettura sola):
 *   {
 *     "unavailable": ["2026-07-01", ...],          // struttura al completo
 *     "rooms": { "smeraldo": ["2026-07-01", ...], ... }  // per camera
 *   }
 *
 * Le camere senza feed risultano sempre disponibili.
 * I singoli feed sono cache-ati 1h (vedi fetchAvailability).
 */
export async function GET() {
  try {
    const data = await fetchAvailability();
    return Response.json(data, {
      headers: {
        // Cache CDN: 1h fresca + 1h stale-while-revalidate.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
      },
    });
  } catch {
    // In caso di errore non blocchiamo nulla: nessuna data disabilitata.
    return Response.json({ unavailable: [], rooms: {} });
  }
}
