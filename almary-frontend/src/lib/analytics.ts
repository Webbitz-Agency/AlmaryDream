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
}
