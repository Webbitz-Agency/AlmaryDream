"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/DictionaryProvider";
import { localizedHref } from "@/i18n/config";
import { getStoredConsent, setConsent } from "@/lib/analytics";

/**
 * Banner cookie con Google Consent Mode v2.
 * Appare solo se l'utente non ha ancora scelto (nessun valore in localStorage).
 * Accetta / Rifiuta aggiornano il consenso su gtag e nascondono il banner.
 */
export default function CookieBanner() {
  const { dict, locale } = useI18n();
  const [open, setOpen] = useState(false);

  // Decidiamo la visibilità solo lato client (localStorage) per evitare
  // mismatch di hydration: il server non conosce la scelta dell'utente.
  useEffect(() => {
    if (getStoredConsent() === null) setOpen(true);
  }, []);

  if (!open) return null;

  function choose(granted: boolean) {
    setConsent(granted);
    setOpen(false);
  }

  const privacyHref = localizedHref("/privacy", locale);

  return (
    <div
      role="dialog"
      aria-label={dict.cookie.title}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-black/5 bg-white/95 p-5 shadow-card backdrop-blur sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex-1 text-sm leading-relaxed text-ink">
          <p className="mb-1 font-serif text-base text-dark">{dict.cookie.title}</p>
          <p className="text-muted">
            {dict.cookie.message}{" "}
            <Link href={privacyHref} className="underline underline-offset-2 hover:text-secondary">
              {dict.cookie.more}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-ink transition hover:border-black/20 hover:bg-black/[0.03]"
          >
            {dict.cookie.reject}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
          >
            {dict.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
