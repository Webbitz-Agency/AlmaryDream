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

/** Sezione titolata con uno o più paragrafi. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-normal tracking-tightest text-ink">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  const p = dict.privacy;

  return (
    <main className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
      <Link href={localizedHref("/", locale)} className="text-sm font-semibold text-primary hover:text-secondary">
        ← {p.back}
      </Link>

      <h1 className="mt-6 font-serif text-4xl font-normal tracking-tightest text-ink sm:text-5xl">
        {p.title}
      </h1>
      <p className="mt-3 text-sm text-muted">{p.updated}</p>
      <p className="mt-6 leading-relaxed text-muted">{p.intro}</p>

      <Section title={p.controllerTitle}>
        <p>{p.controllerBody}</p>
      </Section>

      <Section title={p.dataTitle}>
        <p>
          <strong className="font-medium text-ink">{p.dataBrowsingTitle}.</strong> {p.dataBrowsingBody}
        </p>
        <p>
          <strong className="font-medium text-ink">{p.dataFormTitle}.</strong> {p.dataFormBody}
        </p>
      </Section>

      <Section title={p.purposesTitle}>
        <p>{p.purposesBody}</p>
      </Section>

      <Section title={p.cookieTitle}>
        <p>{p.cookieBody}</p>
        <ul className="mt-1 space-y-2 border-l-2 border-accent/40 pl-4">
          <li>{p.cookieTechnical}</li>
          <li>{p.cookieAnalytics}</li>
        </ul>
      </Section>

      <Section title={p.analyticsTitle}>
        <p>{p.analyticsBody}</p>
      </Section>

      <Section title={p.retentionTitle}>
        <p>{p.retentionBody}</p>
      </Section>

      <Section title={p.rightsTitle}>
        <p>{p.rightsBody}</p>
      </Section>

      <Section title={p.changesTitle}>
        <p>{p.changesBody}</p>
      </Section>

      <Section title={p.contactTitle}>
        <p>
          {p.contactLabel}{" "}
          <a className="text-primary hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          {" · "}
          <a className="text-primary hover:underline" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
        </p>
      </Section>
    </main>
  );
}
