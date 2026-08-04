/**
 * Google Analytics 4 + Google Consent Mode v2 (conforme UE/EEA).
 *
 * Il consenso parte NEGATO per tutti gli storage (vedi Analytics.tsx): GA gira
 * in modalità "cookieless ping" finché l'utente non accetta dal banner. La
 * scelta è persistita in localStorage così il banner non riappare.
 */

/** ID misurazione GA4 della proprietà "Almary Dream" (identificatore pubblico). */
export const GA_ID = "G-BMWK57T25N";

/** Chiave localStorage con la scelta cookie dell'utente. */
export const CONSENT_KEY = "almary-consent";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ritorna la scelta salvata, o `null` se l'utente non ha ancora deciso. */
export function getStoredConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Aggiorna il consenso su gtag (tutti gli storage) e lo persiste.
 * Chiamata dal banner al click Accetta/Rifiuta.
 */
export function setConsent(granted: boolean): void {
  const value: ConsentChoice = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* localStorage non disponibile (private mode): la scelta vale per la sessione */
  }
  // Notifica i componenti che dipendono dal consenso (es. Clarity) così partono
  // subito al click "Accetta", senza ricaricare la pagina.
  window.dispatchEvent(new Event("almary-consent-change"));
}

/**
 * Traccia una richiesta di prenotazione andata a buon fine come evento GA4
 * `generate_lead` (evento consigliato per la lead generation). Questo è
 * l'evento da contrassegnare come "evento chiave" in GA4 e importare in Google
 * Ads come conversione primaria. In assenza di consenso, il Consent Mode lo
 * invia in forma anonima/modellata.
 */
export function trackLead(params?: { value?: number; room?: string }): void {
  window.gtag?.("event", "generate_lead", {
    currency: "EUR",
    value: params?.value ?? 0,
    ...(params?.room ? { room: params.room } : {}),
  });
}

/**
 * Traccia un contatto diretto (click su telefono o WhatsApp) come evento GA4.
 * Eventi `contact_phone` / `contact_whatsapp`: da poter contrassegnare come
 * eventi chiave e importare in Ads come conversioni secondarie (per un B&B molti
 * ospiti prenotano chiamando o via WhatsApp, non solo dal modulo).
 */
export function trackContact(method: "phone" | "whatsapp"): void {
  window.gtag?.("event", method === "phone" ? "contact_phone" : "contact_whatsapp", {
    method,
  });
}
