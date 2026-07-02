import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { DEFAULT_LOCALE, isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : DEFAULT_LOCALE);
  return { title: dict.privacy.title, robots: { index: false, follow: true } };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
      <Link href={localizedHref("/", locale)} className="text-sm font-semibold text-primary hover:text-secondary">
        ← {dict.privacy.back}
      </Link>
      <h1 className="mt-6 font-serif text-4xl font-normal tracking-tightest text-ink sm:text-5xl">
        {dict.privacy.title}
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        {/* TODO: sostituire con il testo legale reale fornito dal cliente. */}
        {dict.privacy.body}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {dict.privacy.contactLabel}{" "}
        <a className="text-primary hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </main>
  );
}
