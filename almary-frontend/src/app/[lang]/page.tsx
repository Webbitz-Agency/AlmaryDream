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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Intro / descrizione struttura */}
        <section id="struttura" className="relative overflow-hidden bg-white py-24 lg:py-40">
          {/* Sagoma decorativa della Sardegna dietro al testo (verticale) */}
          <SardiniaShape className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] -translate-x-1/2 -translate-y-1/2 text-primary/15 lg:h-[36rem]" />

          <Reveal className="relative mx-auto max-w-2xl px-5 text-center lg:px-8">
            <p className="eyebrow">Il B&amp;B</p>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tightest text-ink sm:text-5xl">
              Rilassati nel cuore della <em className="italic text-primary">Costa Smeralda</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Almary Dream è un boutique B&amp;B di lusso a soli 100 metri da Baja Sardinia,
              a tre minuti a piedi da Cala Battistoni. Tre camere esclusive, una luminosa
              area colazione e una zona relax esterna con gazebo: ogni dettaglio è pensato
              per regalarti freschezza, comfort ed eleganza, alimentato da energia
              interamente green.
            </p>
          </Reveal>
        </section>

        <Rooms />
        <Features />
        <Gallery />
        <Surroundings />
        <Testimonials />

        {/* CTA finale — arco attaccato al footer */}
        <section className="bg-offwhite pt-16 lg:pt-24">
          <Reveal className="relative overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-primary via-secondary to-dark px-5 pb-20 pt-16 text-center sm:rounded-t-[4rem] lg:rounded-t-[6rem] lg:pb-24 lg:pt-24">
            {/* glow decorativo soft */}
            <div className="pointer-events-none absolute -top-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="eyebrow !text-white">Almary Dream</p>
              <h2 className="mx-auto mt-4 font-serif text-4xl font-normal leading-tight tracking-tightest text-white sm:text-5xl lg:text-6xl">
                Il tuo risveglio sul mare ti <em className="italic text-accent">aspetta</em>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/80">
                Prenotazione diretta, semplice e sicura: scegli le date e verifica subito la
                disponibilità del tuo soggiorno in Costa Smeralda.
              </p>

              {/* Verifica disponibilità — come la sezione di prenotazione */}
              <div className="mt-9 text-left">
                <BookingBar />
              </div>

              {/* Note cauzione / tassa di soggiorno */}
              <div className="mx-auto mt-5 max-w-2xl space-y-1.5 text-left text-xs leading-relaxed text-white/65">
                <p>
                  * All&apos;arrivo gli ospiti verseranno una cauzione di €300, interamente
                  restituita al check-out salvo eventuali danni alla struttura.
                </p>
                <p>
                  ** Al check-out, in struttura, è dovuta la tassa di soggiorno come previsto
                  dalle normative vigenti.
                </p>
              </div>

              <p className="mt-7 text-sm text-white/70">
                Oppure scrivici su{" "}
                <a
                  href={bookingHref("Ciao Almary Dream! Vorrei verificare la disponibilità e prenotare.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  WhatsApp
                </a>{" "}
                · chiama{" "}
                <a href={SITE.phoneHref} className="font-semibold text-accent hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
