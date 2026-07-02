/**
 * Configurazione i18n — Almary Dream (IT default, EN, DE).
 *
 * Strategia URL: l'italiano vive sulla root SENZA prefisso (almarydream.com),
 * inglese e tedesco su prefisso (/en, /de). La logica di instradamento è in
 * `src/proxy.ts` (il "middleware" di Next 16).
 */

export const LOCALES = ["it", "en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "it";

/** Locale non di default (quelle che compaiono come prefisso nell'URL). */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

/** Etichette + tag BCP-47 (per <html lang>, hreflang, Intl date formatting). */
export const LOCALE_META: Record<Locale, { label: string; bcp47: string; flag: string }> = {
  it: { label: "Italiano", bcp47: "it-IT", flag: "🇮🇹" },
  en: { label: "English", bcp47: "en-GB", flag: "🇬🇧" },
  de: { label: "Deutsch", bcp47: "de-DE", flag: "🇩🇪" },
};

/** Type guard: restringe una stringa qualsiasi a Locale. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Voci di navigazione: la label viene dal dizionario (dict.nav[key]). */
export const NAV_ITEMS = [
  { key: "struttura", href: "#struttura" },
  { key: "camere", href: "#camere" },
  { key: "servizi", href: "#servizi" },
  { key: "galleria", href: "#galleria" },
  { key: "dintorni", href: "#dintorni" },
  { key: "recensioni", href: "#recensioni" },
  { key: "contatti", href: "#contatti" },
] as const;

/**
 * Costruisce un href tenendo conto della lingua corrente.
 * Per l'italiano (default) nessun prefisso; per le altre `/en/...`, `/de/...`.
 * Le ancore (#...) e i link esterni restano invariati.
 */
export function localizedHref(path: string, locale: Locale): string {
  if (path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
