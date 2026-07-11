import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Le pagine "strumento" (ricerca disponibilità) e le pagine privacy sono già
 * `noindex` via metadata: le lasciamo crawlabili così Google legge il noindex.
 * Qui blocchiamo solo le API. Il canonical assoluto verso www.almarydream.com
 * evita che eventuali domini alternativi (es. *.vercel.app) creino duplicati.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
