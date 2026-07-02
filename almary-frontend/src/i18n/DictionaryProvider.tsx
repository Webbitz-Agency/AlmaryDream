"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/it";

type I18nValue = { dict: Dictionary; locale: Locale };

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Rende dizionario + lingua correnti disponibili ai Client Components.
 * Il dizionario è risolto server-side (nel layout [lang]) e passato qui come
 * prop: nessun fetch lato client, nessun flash di lingua sbagliata.
 */
export function DictionaryProvider({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  return <I18nContext.Provider value={{ dict, locale }}>{children}</I18nContext.Provider>;
}

/** Hook per i Client Components: `const { dict, locale } = useI18n();` */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n deve essere usato dentro <DictionaryProvider>");
  return ctx;
}
