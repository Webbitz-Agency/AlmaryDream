import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";
import { SITE } from "@/lib/site";
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const base: Metadata = {
    metadataBase: new URL(SITE.url),
    title: {
      default: "Almary Dream — Luxury B&B in Costa Smeralda | Baja Sardinia",
      template: "%s | Almary Dream",
    },
    description:
      "B&B di lusso a 100 metri dal mare di Baja Sardinia. Tre camere esclusive con colazione inclusa, letto king memory e doccia emozionale. Il tuo rifugio di charme in Costa Smeralda.",
    keywords: [
      "B&B Costa Smeralda",
      "Luxury B&B Baja Sardinia",
      "Almary Dream",
      "bed and breakfast Sardegna",
      "camere Costa Smeralda",
    ],
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: SITE.url,
      siteName: "Almary Dream",
      title: "Almary Dream — Luxury B&B in Costa Smeralda",
      description:
        "Il tuo rifugio di lusso a 100 metri da Baja Sardinia. Tre camere esclusive, colazione inclusa, eleganza sul mare.",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Almary Dream Luxury B&B" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Almary Dream — Luxury B&B in Costa Smeralda",
      description:
        "Il tuo rifugio di lusso a 100 metri da Baja Sardinia. Tre camere esclusive, colazione inclusa, eleganza sul mare.",
      images: ["/images/og-image.jpg"],
    },
    robots: { index: true, follow: true },
  };

  // Finché EN/DE non sono completamente tradotte: non indicizzarle.
  if (lang !== DEFAULT_LOCALE) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
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
        </DictionaryProvider>
      </body>
    </html>
  );
}
