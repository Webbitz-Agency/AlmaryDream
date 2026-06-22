/**
 * POST /api/booking-request
 * Riceve una richiesta di prenotazione dal modal del sito e (in futuro) invia
 * una email alla struttura. Per ora valida i dati e risponde OK: l'invio email
 * è l'UNICO pezzo da collegare (vedi TODO sotto).
 *
 * Body atteso (JSON):
 *   { name, email, phone, message?, room?, checkin?, checkout?, guests? }
 */
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

  // Riepilogo richiesta (pronto per l'email).
  const summary = {
    name,
    email,
    phone,
    room: data.room ?? "—",
    checkin: data.checkin ?? "—",
    checkout: data.checkout ?? "—",
    guests: data.guests ?? "—",
    message: String(data.message ?? "").trim() || "—",
    receivedAt: new Date().toISOString(),
  };

  // Log lato server (visibile nei log Vercel) finché l'email non è collegata.
  console.log("[booking-request]", summary);

  // ─────────────────────────────────────────────────────────────────────────
  // TODO: COLLEGARE L'INVIO EMAIL QUI.
  // Esempio con Resend (consigliato, gratis fino a 3.000 email/mese):
  //   1) npm i resend
  //   2) imposta RESEND_API_KEY su Vercel (Settings → Environment Variables)
  //   3) decommenta:
  //
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Almary Dream <prenotazioni@almarydream.it>",
  //     to: "almarydream@gmail.com",
  //     replyTo: email,
  //     subject: `Nuova richiesta — ${summary.room} (${summary.checkin} → ${summary.checkout})`,
  //     text: `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone}\nCamera: ${summary.room}\n` +
  //           `Check-in: ${summary.checkin}\nCheck-out: ${summary.checkout}\nOspiti: ${summary.guests}\n\n` +
  //           `Messaggio:\n${summary.message}`,
  //   });
  // ─────────────────────────────────────────────────────────────────────────

  return Response.json({ ok: true });
}
