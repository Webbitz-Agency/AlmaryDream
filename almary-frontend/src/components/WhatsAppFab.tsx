"use client";

import { useI18n } from "@/i18n/DictionaryProvider";
import { bookingHref } from "@/lib/site";

/**
 * Bolla WhatsApp flottante (mobile + desktop), presente su tutte le pagine.
 * Al tap apre WhatsApp con un messaggio pre-scritto nella lingua corrente.
 *
 * Il click è tracciato AUTOMATICAMENTE da <ContactTracker> (l'href contiene
 * `wa.me`) come evento GA4 `contact_whatsapp` → nessun tracciamento da aggiungere.
 *
 * Posizione speculare al LanguageSwitcher (bottom-left): qui bottom-right, z-40,
 * così resta sotto il modale (z-70) e sotto il banner cookie (z-60).
 */
export default function WhatsAppFab() {
  const { dict } = useI18n();

  return (
    <a
      href={bookingHref(dict.cta.whatsappFab)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.cta.whatsappAria}
      title={dict.cta.whatsappAria}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.2-.8-2.7-1.2-4.4-4-4.5-4.2-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2 1.3 2.3 1.4.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.3Z" />
      </svg>
    </a>
  );
}
