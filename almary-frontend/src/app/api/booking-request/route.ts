import nodemailer from "nodemailer";

/**
 * POST /api/booking-request
 * Riceve una richiesta di prenotazione dal modal e la inoltra via email alla
 * struttura tramite SMTP Gmail (Nodemailer).
 *
 * ── CONFIGURAZIONE (variabili d'ambiente su Vercel) ────────────────────────
 *   SMTP_HOST   smtp.gmail.com
 *   SMTP_PORT   465  (SSL)
 *   SMTP_USER   alexvanitelli@gmail.com   (la Gmail della struttura)
 *   SMTP_PASS   App Password a 16 cifre (SENZA spazi)
 *   SMTP_FROM   (opzionale) mittente mostrato; default = SMTP_USER
 *   BOOKING_TO  (opzionale) destinatario richieste; default = SMTP_USER
 *
 * NB: l'App Password si genera solo con la verifica in 2 passaggi attiva
 * sull'account Google. Il segreto vive SOLO nelle env di Vercel, mai nel repo.
 *
 * Finché SMTP_HOST/USER/PASS non sono impostate, la richiesta viene solo
 * registrata nei log (non si rompe nulla) e l'API risponde comunque OK.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const runtime = "nodejs";

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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, BOOKING_TO } = process.env;

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

  // Se l'SMTP non è configurato: log e OK (così il flusso funziona comunque).
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("[booking-request] (SMTP non configurato)\n" + body);
    return Response.json({ ok: true });
  }

  try {
    const port = Number(SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // 465 = SSL; 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: BOOKING_TO || SMTP_USER,
      replyTo: `${name} <${email}>`,
      subject,
      text: body,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[booking-request] invio SMTP fallito:", err);
    return Response.json({ ok: false, error: "Invio non riuscito, riprova più tardi." }, { status: 502 });
  }
}
