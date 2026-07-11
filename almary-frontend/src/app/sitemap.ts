import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

/** URL assoluto della home per una lingua (IT alla root, le altre con prefisso). */
function homeUrl(locale: string): string {
  return locale === DEFAULT_LOCALE ? `${SITE.url}/` : `${SITE.url}/${locale}`;
}

/**
 * Sitemap: la home è l'unica pagina indicizzabile (privacy e disponibilità sono
 * noindex). L'entry porta i link alternate hreflang per tutte le lingue.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = homeUrl(l);

  return [
    {
      url: homeUrl(DEFAULT_LOCALE),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
  ];
}
