import nodemailer from "nodemailer";
import { guestEmail, hostEmail, type BookingData } from "@/lib/emailTemplates";
import { SITE } from "@/lib/site";

/**
 * POST /api/booking-request
 * Riceve una richiesta di prenotazione dal modal e invia DUE email:
 *   1. all'host (struttura)  → avviso "nuova richiesta" + riepilogo + contatti ospite
 *   2. all'ospite            → ringraziamento + riepilogo + "rispondiamo entro 24h"
 * Invio via SMTP Gmail (Nodemailer).
 *
 * ── CONFIGURAZIONE (variabili d'ambiente su Vercel) ────────────────────────
 *   SMTP_HOST   smtp.gmail.com
 *   SMTP_PORT   465  (SSL)
 *   SMTP_USER   alexvanitelli@gmail.com   (la Gmail della struttura)
 *   SMTP_PASS   App Password a 16 cifre (SENZA spazi)
 *   SMTP_FROM   (opzionale) mittente mostrato; default = SMTP_USER
 *   BOOKING_TO  (opzionale) destinatario richieste; default = SMTP_USER
 *   SITE_URL    (opzionale) base URL pubblico per il logo nelle email;
 *               default = dominio di produzione Vercel, poi SITE.url
 *
 * Il logo nelle email è caricato da {SITE_URL}/Logo/logoBianco.png (URL assoluto).
 *
 * Finché SMTP_HOST/USER/PASS non sono impostate, la richiesta viene solo
 * registrata nei log (non si rompe nulla) e l'API risponde comunque OK.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const runtime = "nodejs";

/** Base URL pubblico per le immagini nelle email. */
function siteBaseUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return SITE.url;
}

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

  const booking: BookingData = {
    name,
    email,
    phone,
    room: String(data.room ?? "—"),
    checkin: String(data.checkin ?? "—"),
    checkout: String(data.checkout ?? "—"),
    guests: String(data.guests ?? "—"),
    message: String(data.message ?? "").trim() || "—",
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, BOOKING_TO } = process.env;

  const logoUrl = `${siteBaseUrl()}/Logo/logoBianco.png`;
  const host = hostEmail(booking, logoUrl);
  const guest = guestEmail(booking, logoUrl);

  // Se l'SMTP non è configurato: log e OK (così il flusso funziona comunque).
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("[booking-request] (SMTP non configurato)\n" + host.text);
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

    const from = `"${SITE.name}" <${SMTP_FROM || SMTP_USER}>`;
    const hostTo = BOOKING_TO || SMTP_USER;

    // 1. Email all'host (critica): se fallisce, restituiamo errore.
    await transporter.sendMail({
      from,
      to: hostTo,
      replyTo: `${name} <${email}>`,
      subject: host.subject,
      text: host.text,
      html: host.html,
    });

    // 2. Email di conferma all'ospite (best-effort): non blocca la risposta.
    try {
      await transporter.sendMail({
        from,
        to: email,
        replyTo: `${SITE.name} <${hostTo}>`,
        subject: guest.subject,
        text: guest.text,
        html: guest.html,
      });
    } catch (err) {
      console.error("[booking-request] email di conferma all'ospite non inviata:", err);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[booking-request] invio SMTP fallito:", err);
    return Response.json({ ok: false, error: "Invio non riuscito, riprova più tardi." }, { status: 502 });
  }
}
