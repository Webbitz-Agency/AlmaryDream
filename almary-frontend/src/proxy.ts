import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, PREFIXED_LOCALES } from "@/i18n/config";

/**
 * Instradamento lingue (Proxy = middleware in Next 16).
 *
 * - `/en/...`, `/de/...`            → passano così come sono al segmento [lang]
 * - `/it` o `/it/...`              → redirect 308 alla versione senza prefisso
 *                                    (l'italiano è canonico sulla root)
 * - qualsiasi altro path           → rewrite INTERNO a `/it/...`
 *                                    (l'URL resta pulito: almarydream.com/…)
 *
 * Il matcher esclude api, asset statici e file con estensione.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lingue con prefisso (en, de): lascia passare.
  const hasPrefix = PREFIXED_LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasPrefix) return NextResponse.next();

  // /it esplicito → redirect alla root senza prefisso (canonico).
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Tutto il resto (nessun prefisso) → rewrite interno al segmento italiano.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Salta api, _next e qualsiasi file con estensione (immagini, css, …).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
