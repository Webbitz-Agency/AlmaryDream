/**
 * Template email HTML per le richieste di prenotazione.
 * Coerenti con l'identità del sito Almary Dream:
 *   - palette: dark #1c4d3e, primary #1f9f7c, accent #15cb9e, ink #1a1a1a,
 *     muted #6b7280, offwhite #fbfbfb
 *   - titoli serif (Georgia → richiama Fraunces), testi sans (Helvetica/Arial → Inter)
 *   - eyebrow maiuscola spaziata, card bianca, header/footer verde scuro
 *
 * Tecniche email-safe: layout a tabelle, CSS inline, niente immagini di sfondo,
 * font web-safe (i client email non caricano i font del sito in modo affidabile).
 */

import { SITE } from "./site";

export type BookingData = {
  room: string;
  checkin: string; // ISO "YYYY-MM-DD" oppure "—"
  checkout: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Totale stimato del soggiorno (numero come stringa, es. "990"); "" se su richiesta. */
  priceTotal?: string;
};

/* ── Palette ──────────────────────────────────────────────────────────────── */
const C = {
  dark: "#1c4d3e",
  primary: "#1f9f7c",
  accent: "#15cb9e",
  ink: "#1a1a1a",
  muted: "#6b7280",
  offwhite: "#fbfbfb",
  pageBg: "#eef2f0",
  border: "#e6ebe8",
  white: "#ffffff",
};

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** "2026-07-12" → "ven 12 lug 2026" */
function fmtDate(iso?: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

function nightsBetween(checkin?: string, checkout?: string): number {
  if (!checkin || !checkout || !/^\d{4}-\d{2}-\d{2}$/.test(checkin) || !/^\d{4}-\d{2}-\d{2}$/.test(checkout)) return 0;
  const [y1, m1, d1] = checkin.split("-").map(Number);
  const [y2, m2, d2] = checkout.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000);
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Riga del box riepilogo: etichetta a sinistra, valore a destra. */
function summaryRow(label: string, value: string, last = false): string {
  const border = last ? "" : `border-bottom:1px solid ${C.border};`;
  return `
    <tr>
      <td style="padding:11px 0;${border}font-family:${SANS};font-size:13px;color:${C.muted};text-transform:uppercase;letter-spacing:0.04em;">${esc(label)}</td>
      <td align="right" style="padding:11px 0;${border}font-family:${SANS};font-size:15px;color:${C.ink};font-weight:600;">${esc(value)}</td>
    </tr>`;
}

/* ── Layout condiviso ─────────────────────────────────────────────────────── */

type LayoutOpts = {
  logoUrl: string;
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string; // HTML
  bodyHtml: string; // HTML aggiuntivo (box, bottoni…)
};

function layout(o: LayoutOpts): string {
  const year = SITE.url ? new Date(2026, 0, 1).getFullYear() : 2026;
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(SITE.name)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.pageBg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${C.pageBg};">${esc(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.pageBg};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:${C.white};border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(28,77,62,0.08);">

        <!-- Header -->
        <tr>
          <td align="center" style="background-color:${C.dark};padding:34px 24px 30px;">
            <img src="${o.logoUrl}" width="120" alt="${esc(SITE.name)}" style="display:block;width:120px;height:auto;border:0;">
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 44px 8px;">
            <p style="margin:0 0 14px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${C.primary};">${esc(o.eyebrow)}</p>
            <h1 style="margin:0 0 18px;font-family:${SERIF};font-size:30px;line-height:1.18;font-weight:400;color:${C.ink};">${o.title}</h1>
            <div style="font-family:${SANS};font-size:15px;line-height:1.65;color:#4b5563;">${o.intro}</div>
          </td>
        </tr>

        <!-- Contenuto -->
        <tr>
          <td style="padding:22px 44px 40px;">
            ${o.bodyHtml}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:${C.dark};padding:34px 44px;">
            <p style="margin:0 0 4px;font-family:${SERIF};font-size:20px;color:${C.white};">${esc(SITE.name)}</p>
            <p style="margin:0 0 16px;font-family:${SANS};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${C.accent};">${esc(SITE.tagline)} · ${esc(SITE.location)}</p>
            <p style="margin:0 0 3px;font-family:${SANS};font-size:13px;line-height:1.6;color:#c9d6d0;">${esc(SITE.address)}, ${esc(SITE.zip)} ${esc(SITE.city)}</p>
            <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:#c9d6d0;">
              <a href="${SITE.phoneHref}" style="color:#c9d6d0;text-decoration:none;">${esc(SITE.phone)}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${SITE.email}" style="color:#c9d6d0;text-decoration:none;">${esc(SITE.email)}</a>
            </p>
            <p style="margin:18px 0 0;font-family:${SANS};font-size:11px;color:#7f998d;">© ${year} ${esc(SITE.name)}. Tutti i diritti riservati.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* ── Box riepilogo richiesta (condiviso) ──────────────────────────────────── */

function summaryBox(d: BookingData): string {
  const n = nightsBetween(d.checkin, d.checkout);
  const nightsLabel = n > 0 ? `${n} ${n === 1 ? "notte" : "notti"}` : "—";
  const total = d.priceTotal ? Number(d.priceTotal) : 0;
  const totalRow = total > 0 ? summaryRow("Totale stimato", `€${total.toLocaleString("it-IT")}`, true) : "";
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.offwhite};border:1px solid ${C.border};border-radius:14px;">
      <tr><td style="padding:6px 22px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${summaryRow("Camera", d.room || "—")}
          ${summaryRow("Check-in", fmtDate(d.checkin))}
          ${summaryRow("Check-out", fmtDate(d.checkout))}
          ${summaryRow("Notti", nightsLabel)}
          ${summaryRow("Ospiti", d.guests || "—", !totalRow)}
          ${totalRow}
        </table>
      </td></tr>
    </table>`;
}

/* ── Box contatti ospite (solo email all'host) ────────────────────────────── */

function guestContactBox(d: BookingData): string {
  const msg = d.message && d.message !== "—" ? d.message : "";
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;background-color:${C.white};border:1px solid ${C.border};border-radius:14px;">
      <tr><td style="padding:6px 22px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${summaryRow("Nome", d.name || "—")}
          ${summaryRow("Email", d.email || "—")}
          ${summaryRow("Telefono", d.phone || "—", !msg)}
        </table>
        ${
          msg
            ? `<div style="padding:14px 0 16px;border-top:1px solid ${C.border};margin-top:2px;">
                 <p style="margin:0 0 6px;font-family:${SANS};font-size:13px;color:${C.muted};text-transform:uppercase;letter-spacing:0.04em;">Messaggio</p>
                 <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink};">${esc(msg)}</p>
               </div>`
            : ""
        }
      </td></tr>
    </table>`;
}

/** Bottone pieno (CTA) email-safe. */
function button(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr><td align="center" bgcolor="${C.primary}" style="border-radius:12px;">
        <a href="${href}" style="display:inline-block;padding:14px 30px;font-family:${SANS};font-size:14px;font-weight:600;color:${C.white};text-decoration:none;border-radius:12px;">${esc(label)}</a>
      </td></tr>
    </table>`;
}

/* ── Versioni testo (fallback) ────────────────────────────────────────────── */

function summaryText(d: BookingData): string {
  const n = nightsBetween(d.checkin, d.checkout);
  const total = d.priceTotal ? Number(d.priceTotal) : 0;
  return (
    `Camera:    ${d.room || "—"}\n` +
    `Check-in:  ${fmtDate(d.checkin)}\n` +
    `Check-out: ${fmtDate(d.checkout)}\n` +
    `Notti:     ${n > 0 ? n : "—"}\n` +
    `Ospiti:    ${d.guests || "—"}\n` +
    (total > 0 ? `Totale:    €${total.toLocaleString("it-IT")}\n` : "")
  );
}

/* ── Template 1 — email all'OSPITE (ringraziamento) ───────────────────────── */

export function guestEmail(d: BookingData, logoUrl: string) {
  const firstName = (d.name || "").split(" ")[0] || "";
  const subject = `Abbiamo ricevuto la tua richiesta — ${SITE.name}`;
  const intro =
    `<p style="margin:0 0 14px;">Ciao ${esc(firstName)},</p>` +
    `<p style="margin:0;">grazie per aver scelto <strong>${esc(SITE.name)}</strong>. Abbiamo ricevuto la tua richiesta di prenotazione e ti risponderemo <strong>entro 24 ore</strong> per confermare la disponibilità e i dettagli del soggiorno.</p>`;
  const bodyHtml =
    summaryBox(d) +
    `<p style="margin:20px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.muted};">Nessun pagamento è richiesto ora: questa è solo una richiesta. Per qualsiasi necessità puoi rispondere direttamente a questa email o contattarci ai recapiti qui sotto.</p>` +
    button("Scrivici su WhatsApp", SITE.whatsapp);

  const html = layout({
    logoUrl,
    preheader: "Abbiamo ricevuto la tua richiesta: ti rispondiamo entro 24 ore.",
    eyebrow: "Richiesta ricevuta",
    title: "Grazie, sarai contattato a breve",
    intro,
    bodyHtml,
  });

  const text =
    `Ciao ${firstName},\n\n` +
    `grazie per aver scelto ${SITE.name}. Abbiamo ricevuto la tua richiesta di prenotazione e ti risponderemo entro 24 ore.\n\n` +
    `RIEPILOGO RICHIESTA\n${summaryText(d)}\n` +
    `Nessun pagamento è richiesto ora: questa è solo una richiesta.\n\n` +
    `${SITE.name} · ${SITE.tagline} · ${SITE.location}\n` +
    `${SITE.phone} · ${SITE.email}\n`;

  return { subject, html, text };
}

/* ── Template 2 — email all'HOST (nuova richiesta) ────────────────────────── */

export function hostEmail(d: BookingData, logoUrl: string) {
  const subject = `Nuova richiesta — ${d.room || "Camera"} (${fmtDate(d.checkin)} → ${fmtDate(d.checkout)})`;
  const intro =
    `<p style="margin:0;">È arrivata una <strong>nuova richiesta di prenotazione</strong> dal sito. Di seguito tutti i dettagli. Rispondi all'ospite entro 24 ore.</p>`;
  const bodyHtml =
    summaryBox(d) +
    guestContactBox(d) +
    button("Rispondi all'ospite", `mailto:${d.email}?subject=${encodeURIComponent("Re: la tua richiesta — " + SITE.name)}`);

  const html = layout({
    logoUrl,
    preheader: `Nuova richiesta: ${d.room} · ${fmtDate(d.checkin)} → ${fmtDate(d.checkout)} · ${d.guests} ospiti`,
    eyebrow: "Nuova richiesta",
    title: "Hai una nuova richiesta di prenotazione",
    intro,
    bodyHtml,
  });

  const text =
    `NUOVA RICHIESTA DI PRENOTAZIONE\n\n` +
    `RIEPILOGO\n${summaryText(d)}\n` +
    `CONTATTI OSPITE\n` +
    `Nome:     ${d.name}\n` +
    `Email:    ${d.email}\n` +
    `Telefono: ${d.phone}\n` +
    (d.message && d.message !== "—" ? `\nMessaggio:\n${d.message}\n` : "") +
    `\nRispondi all'ospite: ${d.email}\n`;

  return { subject, html, text };
}
