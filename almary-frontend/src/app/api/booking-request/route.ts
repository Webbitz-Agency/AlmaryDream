/**
 * POST /api/booking-request
 * Riceve una richiesta di prenotazione dal modal e la inoltra via email alla
 * struttura usando l'API HTTP di Brevo (https://www.brevo.com) — niente SMTP.
 *
 * ── CONFIGURAZIONE (variabili d'ambiente su Vercel) ────────────────────────
 *   BREVO_API_KEY   (obbligatoria)  API key transazionale di Brevo
 *   BREVO_SENDER    (opzionale)     email mittente VALIDATA su Brevo
 *                                   default: hello@andreapannocchia.com
 *   BOOKING_TO      (opzionale)     destinatario delle richieste
 *                                   default: alexvanitelli@gmail.com
 *
 * ── SETUP (una tantum) ─────────────────────────────────────────────────────
 *   1. Crea un account gratuito su https://www.brevo.com con la mail mittente
 *      (es. hello@andreapannocchia.com).
 *   2. Valida quel mittente: Brevo invia un link di conferma in QUELLA casella.
 *   3. Crea una API key in "SMTP & API" → "API Keys" e impostala come
 *      BREVO_API_KEY su Vercel, poi fai Redeploy.
 *
 * Finché BREVO_API_KEY non è impostata, la richiesta viene solo registrata
 * nei log (non si rompe nulla) e l'API risponde comunque OK.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const runtime = "nodejs";

const DEFAULT_SENDER = "hello@andreapannocchia.com";
const DEFAULT_TO = "alexvanitelli@gmail.com";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dati non validi" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();

  // Validazione minima lato server.
  if (!name || !email || !phone) {
    return Response.json({ ok: false, error: "Nome, email e telefono sono obbligatori." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Email non valida." }, { status: 422 });
  }

  const room = String(data.room ?? "—");
  const checkin = String(data.checkin ?? "—");
  const checkout = String(data.checkout ?? "—");
  const guests = String(data.guests ?? "—");
  const message = String(data.message ?? "").trim() || "—";

  const { BREVO_API_KEY, BREVO_SENDER, BOOKING_TO } = process.env;

  const subject = `Nuova richiesta — ${room} (${checkin} → ${checkout})`;
  const body =
    `Nuova richiesta di prenotazione dal sito Almary Dream\n\n` +
    `Camera:     ${room}\n` +
    `Check-in:   ${checkin}\n` +
    `Check-out:  ${checkout}\n` +
    `Ospiti:     ${guests}\n\n` +
    `Nome:       ${name}\n` +
    `Email:      ${email}\n` +
    `Telefono:   ${phone}\n\n` +
    `Messaggio:\n${message}\n`;

  // Se Brevo non è configurato: log e OK (così il flusso funziona comunque).
  if (!BREVO_API_KEY) {
    console.log("[booking-request] (BREVO_API_KEY non configurata)\n" + body);
    return Response.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Almary Dream", email: BREVO_SENDER || DEFAULT_SENDER },
        to: [{ email: BOOKING_TO || DEFAULT_TO }],
        replyTo: { email, name },
        subject,
        textContent: body,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[booking-request] invio Brevo fallito:", res.status, detail);
      return Response.json({ ok: false, error: "Invio non riuscito, riprova più tardi." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[booking-request] invio Brevo fallito:", err);
    return Response.json({ ok: false, error: "Invio non riuscito, riprova più tardi." }, { status: 502 });
  }
}
