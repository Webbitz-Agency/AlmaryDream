"use client";

import { useEffect } from "react";
import { CLARITY_ID } from "@/lib/clarity";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Carica Microsoft Clarity in modo conforme al GDPR.
 *
 * Lo script parte SOLO se l'utente ha accettato i cookie dal banner (stesso
 * consenso di GA4, persistito in localStorage con CONSENT_KEY) e SOLO sul
 * dominio di produzione — così localhost e le preview Vercel non sporcano i dati.
 *
 * `setConsent()` (in analytics.ts) emette l'evento `almary-consent-change`: così
 * Clarity si avvia all'istante al click "Accetta", senza ricaricare la pagina.
 */

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

export default function Clarity() {
  useEffect(() => {
    function isGranted(): boolean {
      try {
        return localStorage.getItem(CONSENT_KEY) === "granted";
      } catch {
        return false;
      }
    }

    function loadClarity(): void {
      if (!CLARITY_ID) return;
      if (!location.hostname.endsWith("almarydream.com")) return;

      const w = window as Window & { clarity?: ClarityFn };
      if (w.clarity) return; // già caricato

      // Coda temporanea: raccoglie le chiamate finché lo script vero non è pronto.
      const clarity: ClarityFn = (...args: unknown[]) => {
        (clarity.q = clarity.q || []).push(args);
      };
      w.clarity = clarity;

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
      document.head.appendChild(script);

      // Segnala a Clarity che il consenso ai cookie è stato concesso.
      w.clarity("consent");
    }

    if (isGranted()) loadClarity();

    function onConsentChange(): void {
      if (isGranted()) loadClarity();
    }
    window.addEventListener("almary-consent-change", onConsentChange);
    return () => window.removeEventListener("almary-consent-change", onConsentChange);
  }, []);

  return null;
}
