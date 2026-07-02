import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { fetchAvailability } from "@/lib/availability";
import { DEFAULT_LOCALE, isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Results from "./Results";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : DEFAULT_LOCALE);
  return {
    title: dict.results.metaTitle,
    // Pagina dinamica di ricerca: non va indicizzata.
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ checkin?: string; checkout?: string; guests?: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  const sp = await searchParams;
  // Disponibilità per-camera letta server-side (cache 1h sui feed iCal).
  const { rooms } = await fetchAvailability();

  const homeHref = localizedHref("/", locale);

  return (
    <>
      {/* Header dedicato (la navbar della home usa ancore non valide qui). */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <Link href={homeHref} aria-label="Almary Dream — home" className="flex items-center">
            <Image src="/Logo/logo.png" alt="Almary Dream" width={64} height={64} priority className="h-12 w-12 object-contain lg:h-16 lg:w-16" />
          </Link>
          <Link href={homeHref} className="text-sm font-medium text-muted transition-colors hover:text-primary">
            ← {dict.results.backHome}
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-offwhite">
        <Results
          checkin={sp.checkin ?? ""}
          checkout={sp.checkout ?? ""}
          guests={sp.guests ?? "2"}
          roomsAvailability={rooms}
        />
      </main>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
