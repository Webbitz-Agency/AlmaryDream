import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/it";

/**
 * Loader dei dizionari. I file sono importati dinamicamente: nei Server
 * Components solo la lingua richiesta finisce nel bundle server, e il client
 * riceve solo l'oggetto già risolto passato dal DictionaryProvider.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  it: () => import("./dictionaries/it").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
  ro: () => import("./dictionaries/ro").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export type { Dictionary };
