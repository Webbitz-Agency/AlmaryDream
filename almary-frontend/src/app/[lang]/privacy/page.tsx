import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
      <Link href="/" className="text-sm font-semibold text-primary hover:text-secondary">
        ← Torna alla home
      </Link>
      <h1 className="mt-6 font-serif text-4xl font-normal tracking-tightest text-ink sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        {/* TODO: sostituire con il testo legale reale fornito dal cliente. */}
        Questa è una pagina segnaposto. Inserire qui l&apos;informativa privacy completa di{" "}
        {SITE.name} (titolare del trattamento, finalità, base giuridica, cookie, diritti
        dell&apos;interessato e contatti per l&apos;esercizio dei diritti).
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        Per informazioni: <a className="text-primary hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </main>
  );
}
