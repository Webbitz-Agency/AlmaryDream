import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { fetchAvailability } from "@/lib/availability";
import Results from "./Results";

export const metadata: Metadata = {
  title: "Disponibilità — Almary Dream",
  // Pagina dinamica di ricerca: non va indicizzata.
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ checkin?: string; checkout?: string; guests?: string }>;
}) {
  const sp = await searchParams;
  // Disponibilità per-camera letta server-side (cache 1h sui feed iCal).
  const { rooms } = await fetchAvailability();

  return (
    <>
      {/* Header dedicato (la navbar della home usa ancore non valide qui). */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <Link href="/" aria-label="Almary Dream — home" className="flex items-center">
            <Image src="/Logo/logo.png" alt="Almary Dream" width={64} height={64} priority className="h-12 w-12 object-contain lg:h-16 lg:w-16" />
          </Link>
          <Link href="/" className="text-sm font-medium text-muted transition-colors hover:text-primary">
            ← Torna alla home
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

      <Footer />
    </>
  );
}
