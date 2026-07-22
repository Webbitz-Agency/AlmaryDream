import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";
import { SITE } from "@/lib/site";
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import ContactTracker from "@/components/ContactTracker";

/* Serif display per i titoli — stesso font del riferimento (napolintocore.it) */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

/* Sans minimale per testi e UI */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/** Pre-genera le 3 lingue in statico. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** URL assoluto della home per una lingua (IT alla root, le altre con prefisso). */
function homeUrl(locale: string): string {
  return locale === DEFAULT_LOCALE ? `${SITE.url}/` : `${SITE.url}/${locale}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);

  // hreflang per tutte le lingue + x-default (l'italiano). La home è l'unica
  // pagina indicizzabile: privacy e disponibilità restano noindex.
  const languages: Record<string, string> = { "x-default": homeUrl(DEFAULT_LOCALE) };
  for (const l of LOCALES) languages[l] = homeUrl(l);

  const canonical = homeUrl(locale);
  const description = dict.hero.subtitle;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: "Almary Dream — Luxury B&B in Costa Smeralda | Baja Sardinia",
      template: "%s | Almary Dream",
    },
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].bcp47.replace("-", "_"),
      url: canonical,
      siteName: "Almary Dream",
      title: "Almary Dream — Luxury B&B in Costa Smeralda",
      description,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Almary Dream Luxury B&B" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Almary Dream — Luxury B&B in Costa Smeralda",
      description,
      images: ["/images/og-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={LOCALE_META[lang].bcp47} className={`${fraunces.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white text-ink">
        <DictionaryProvider dict={dict} locale={lang}>
          {children}
          <LanguageSwitcher />
          <CookieBanner />
        </DictionaryProvider>
        <Analytics />
        <ContactTracker />
      </body>
    </html>
  );
}
