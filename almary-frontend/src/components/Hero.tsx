import { SITE } from "@/lib/site";
import BookingBar from "./BookingBar";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Video emozionale full-screen */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={SITE.heroPoster}
        aria-hidden="true"
      >
        <source src={SITE.heroVideo} type="video/mp4" />
      </video>
      {/* Overlay nero trasparente per leggibilità */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Contenuto */}
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 lg:px-8 lg:pt-32">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow !text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]">Almary Dream · Luxury B&B · Costa Smeralda</p>
            <h1 className="mt-4 font-serif text-[2.75rem] font-normal leading-[1.05] tracking-tightest text-white sm:text-6xl lg:text-7xl">
              Un respiro di <em className="italic text-accent">eleganza</em> sul mare
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
              Il tuo rifugio intimo a soli 100 metri dalle acque di Baja Sardinia.
              Tre camere esclusive, colazione inclusa, dove ogni risveglio profuma di mare.
            </p>
          </div>
        </div>

        {/* Barra di prenotazione — above the fold su desktop e mobile */}
        <div className="mx-auto w-full max-w-7xl px-5 pb-8 lg:px-8 lg:pb-12">
          <BookingBar className="animate-fade-up" />
        </div>
      </div>
    </section>
  );
}
