import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

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

export const metadata: Metadata = {
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white text-ink">{children}</body>
    </html>
  );
}
