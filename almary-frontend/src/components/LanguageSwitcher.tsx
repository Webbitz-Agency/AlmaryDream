"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/i18n/DictionaryProvider";
import {
  LOCALES,
  LOCALE_META,
  PREFIXED_LOCALES,
  localizedHref,
  type Locale,
} from "@/i18n/config";

/**
 * Selettore lingua flottante (in basso a sinistra): bandiera in un cerchio,
 * al click apre le 3 lingue e naviga alla stessa pagina nella lingua scelta,
 * conservando eventuali parametri (es. date su /disponibilita). Default IT.
 */
export default function LanguageSwitcher() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Chiudi cliccando fuori o con Esc.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Percorso senza prefisso lingua (es. "/en/disponibilita" → "/disponibilita").
  const barePath = PREFIXED_LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
    ? pathname.replace(/^\/[a-z]{2}/, "") || "/"
    : pathname;

  const go = (l: Locale) => {
    setOpen(false);
    if (l === locale) return;
    const search = typeof window !== "undefined" ? window.location.search : "";
    router.push(localizedHref(barePath, l) + search);
  };

  return (
    <div ref={ref} className="fixed bottom-5 left-5 z-40">
      {/* Menu lingue */}
      <div
        className={`absolute bottom-full left-0 mb-2 min-w-[9.5rem] origin-bottom-left overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card transition-all duration-200 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        role="menu"
      >
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            role="menuitem"
            onClick={() => go(l)}
            className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-offwhite ${
              l === locale ? "font-semibold text-ink" : "text-muted"
            }`}
          >
            <span className="text-lg leading-none">{LOCALE_META[l].flag}</span>
            <span>{LOCALE_META[l].label}</span>
            {l === locale && (
              <svg className="ml-auto text-primary" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Pulsante circolare con la bandiera corrente */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.langSwitcher.label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-2xl shadow-card transition-transform hover:scale-105"
      >
        <span className="leading-none">{LOCALE_META[locale].flag}</span>
      </button>
    </div>
  );
}
