import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingBar from "@/components/BookingBar";
import Features from "@/components/Features";
import Rooms from "@/components/Rooms";
import Surroundings from "@/components/Surroundings";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SardiniaShape from "@/components/SardiniaShape";
import { bookingHref, SITE } from "@/lib/site";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero dict={dict} />

        {/* Intro / descrizione struttura */}
        <section id="struttura" className="relative overflow-hidden bg-white py-24 lg:py-40">
          {/* Sagoma decorativa della Sardegna dietro al testo (verticale) */}
          <SardiniaShape className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] -translate-x-1/2 -translate-y-1/2 text-primary/15 lg:h-[36rem]" />

          <Reveal className="relative mx-auto max-w-2xl px-5 text-center lg:px-8">
            <p className="eyebrow">{dict.intro.eyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
              {dict.intro.titleA}<em className="italic text-primary">{dict.intro.titleEm}</em>{dict.intro.titleB}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {dict.intro.body}
            </p>
          </Reveal>
        </section>

        <Rooms dict={dict} />
        <Features dict={dict} />
        <Gallery />
        <Surroundings />
        <Testimonials />

        {/* CTA finale — arco attaccato al footer */}
        <section className="bg-offwhite pt-16 lg:pt-24">
          <Reveal className="relative overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-primary via-secondary to-dark px-5 pb-20 pt-16 text-center sm:rounded-t-[4rem] lg:rounded-t-[6rem] lg:pb-24 lg:pt-24">
            {/* glow decorativo soft */}
            <div className="pointer-events-none absolute -top-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="eyebrow !text-white">{dict.finalCta.eyebrow}</p>
              <h2 className="mx-auto mt-4 font-serif text-4xl font-normal leading-tight tracking-tightest text-white sm:text-5xl lg:text-6xl">
                {dict.finalCta.titleA}<em className="italic text-accent">{dict.finalCta.titleEm}</em>{dict.finalCta.titleB}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/80">
                {dict.finalCta.subtitle}
              </p>

              {/* Verifica disponibilità — come la sezione di prenotazione */}
              <div className="mt-9 text-left">
                <BookingBar />
              </div>

              {/* Note cauzione / tassa di soggiorno */}
              <div className="mx-auto mt-5 max-w-2xl space-y-1.5 text-left text-xs leading-relaxed text-white/65">
                <p>{dict.finalCta.note1}</p>
                <p>{dict.finalCta.note2}</p>
              </div>

              <p className="mt-7 text-sm text-white/70">
                {dict.finalCta.orWrite}{" "}
                <a
                  href={bookingHref("Ciao Almary Dream! Vorrei verificare la disponibilità e prenotare.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  WhatsApp
                </a>{" "}
                {dict.finalCta.orCall}{" "}
                <a href={SITE.phoneHref} className="font-semibold text-accent hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
