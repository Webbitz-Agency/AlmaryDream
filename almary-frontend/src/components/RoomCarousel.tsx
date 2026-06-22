"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  name: string;
  /** true = la prima foto è above-the-fold → priority per LCP migliore */
  priority?: boolean;
  /** Override delle classi del contenitore (deve includere group/relative/overflow-hidden). */
  className?: string;
};

const DEFAULT_WRAPPER =
  "group relative aspect-[4/3] w-full overflow-hidden bg-offwhite sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[42rem]";

export default function RoomCarousel({ images, name, priority = false, className }: Props) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const go = (dir: number) => setIndex((p) => (p + dir + total) % total);

  return (
    <div className={className ?? DEFAULT_WRAPPER}>
      {/* Slide impilate con dissolvenza → nessun layout shift */}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} — foto ${i + 1} di ${total}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority && i === 0}
          loading={priority && i === 0 ? undefined : "lazy"}
          className={`object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {total > 1 && (
        <>
          {/* Freccia sinistra */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto precedente"
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-dark shadow-soft backdrop-blur-sm transition-all hover:bg-white focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Freccia destra */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto successiva"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-dark shadow-soft backdrop-blur-sm transition-all hover:bg-white focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Indicatori */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Vai alla foto ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
