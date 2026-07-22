import Script from "next/script";
import { GA_ID, CONSENT_KEY } from "@/lib/analytics";

/**
 * Carica GA4 con Google Consent Mode v2.
 *
 * 1. `consent-default` (beforeInteractive, in <head> prima di gtag.js): imposta
 *    TUTTI gli storage a "denied" — requisito UE. Se l'utente aveva già accettato
 *    in una visita precedente, ripristina "granted" leggendo localStorage.
 * 2. `gtag.js` (afterInteractive): la libreria vera e propria.
 * 3. `ga-init` (afterInteractive): inizializza la proprietà, ma SOLO sul dominio
 *    di produzione — così localhost e le preview Vercel non sporcano i dati.
 */
export default function Analytics() {
  return (
    <>
      <Script
        id="consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
`,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
if (location.hostname.endsWith('almarydream.com')) {
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
}
`,
        }}
      />
    </>
  );
}
