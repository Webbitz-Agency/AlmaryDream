/**
 * Single source of truth — dati reali di Almary Dream (Luxury B&B, Costa Smeralda).
 * Fonte: almarydream.it. Modificando qui i contenuti, tutti i componenti si aggiornano.
 *
 * NOTA IMMAGINI: i path puntano a placeholder SVG in /public/images.
 * Per sostituirli con le foto reali: carica il file (.jpg/.webp) e aggiorna il path qui.
 * Le dimensioni del contenitore sono fisse nei componenti → nessun layout shift.
 */

import type { Dictionary } from "@/i18n/dictionaries/it";

export const SITE = {
  name: "Almary Dream",
  tagline: "Luxury B&B",
  location: "Baja Sardinia · Costa Smeralda",
  url: "https://almarydream.it",

  // Contatti reali
  phone: "+39 388 4773330",
  phoneHref: "tel:+393884773330",
  whatsapp: "https://wa.me/393884773330",
  email: "almarydream@gmail.com",
  // Social — TODO: confermare gli URL esatti (dominio almarydream.it momentaneamente sospeso)
  facebook: "https://www.facebook.com/almarydream",
  instagram: "https://www.instagram.com/almarydream",

  // Posizione
  address: "Via della Pineta 1",
  zip: "07021",
  city: "Baja Sardinia (SS)",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Almary+Dream+Via+della+Pineta+1+Baja+Sardinia",
  mapsEmbed:
    "https://www.google.com/maps?q=Via%20della%20Pineta%201%2C%2007021%20Baja%20Sardinia&output=embed",

  // Dati di licenza (dal logo ufficiale)
  cir: "090006C200T5153",
  cin: "090006C2000T153",

  // Hero: video di sfondo + poster (fotogramma reale del video, mostrato
  // durante il caricamento — niente placeholder colorato).
  heroVideo: "/images/hero/videoHero.mp4",
  heroPoster: "/images/hero/hero-poster.webp",
} as const;

/**
 * Genera un link WhatsApp con messaggio precompilato per le conversioni.
 */
export function bookingHref(message: string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Comfort & Servizi — solo le chiavi icona (l'ordine è quello mostrato).
 * Titoli e descrizioni vivono in `dict.features[icon]`.
 */
export const FEATURE_ICONS = [
  "breakfast",
  "wifi",
  "ac",
  "sea",
  "relax",
  "green",
  "shower",
  "barbecue",
] as const;
export type FeatureIconKey = (typeof FEATURE_ICONS)[number];

/**
 * Servizi premium in evidenza — icona + foto di sfondo.
 * Testo in `dict.highlights[icon]`.
 */
export const HIGHLIGHTS = [
  { icon: "wine", image: "/images/Dintorni/cardBollicine.webp" },
  { icon: "boat", image: "/images/Dintorni/cardBarca.webp" },
] as const;

/** Chiavi comfort camera → testo in dict.amenities[key] (e icona in Rooms.tsx). */
export type AmenityKey = keyof Dictionary["amenities"];

export type Room = {
  slug: keyof Dictionary["rooms"]; // → nome e descrizione in dict.rooms[slug]
  size: string; // es. "32 m²" (non traducibile)
  /** Capienza massima (numero) — usata per filtrare le camere e mostrare "N ospiti". */
  maxGuests: number;
  amenities: AmenityKey[];
  /** Galleria foto reali — scorribili nel carosello (la prima è la copertina) */
  images: string[];
};

/** Camere reali — colazione sempre inclusa */
export const ROOMS: Room[] = [
  {
    slug: "dream",
    size: "32 m²",
    maxGuests: 2,
    amenities: ["kingBed", "emotionalShower", "wifi", "ac", "fridge", "safe", "makeupVanity"],
    images: [
      "/images/Dream/dream1.webp",
      "/images/Dream/dream8.webp",
      "/images/Dream/dream9.webp",
      "/images/Dream/dream4.webp",
      "/images/Dream/dream10.webp",
      "/images/Dream/dream11.webp",
    ],
  },
  {
    slug: "blue-sky",
    size: "30 m²",
    maxGuests: 2,
    amenities: ["kingBed", "emotionalShower", "wifi", "ac", "groundFloor", "safe", "makeupVanity"],
    images: [
      "/images/BlueSky/bs1.webp",
      "/images/BlueSky/bs5.webp",
      "/images/BlueSky/bs6.webp",
      "/images/BlueSky/bs2.webp",
      "/images/BlueSky/bs7.webp",
      "/images/BlueSky/bs3.webp",
    ],
  },
  {
    slug: "smeraldo",
    size: "30 m²",
    maxGuests: 2,
    amenities: ["kingBed", "emotionalShower", "wifi", "ac", "minibar", "safe", "makeupVanity"],
    images: [
      "/images/Smeraldo/smeraldo1.webp",
      "/images/Smeraldo/smeraldo5.webp",
      "/images/Smeraldo/smeraldo6.webp",
      "/images/Smeraldo/smeraldo3.webp",
      "/images/Smeraldo/smeraldo7.webp",
      "/images/Smeraldo/smeraldo8.webp",
    ],
  },
];

export type Activity = {
  slug: keyof Dictionary["activities"]; // → titolo e descrizione in dict.activities[slug]
  /** foto reale (WebP ottimizzato) mostrata nella parte alta della card */
  image: string;
};

/** Cosa fare nei dintorni di Baja Sardinia (Costa Smeralda) — anche per la SEO locale */
export const ACTIVITIES: Activity[] = [
  { slug: "maddalena", image: "/images/Dintorni/arcipelago2.webp" },
  { slug: "boat", image: "/images/Dintorni/cardBarca.webp" },
  { slug: "phi", image: "/images/Dintorni/phi.webp" },
  { slug: "ritual", image: "/images/Dintorni/ritual.webp" },
  { slug: "portocervo", image: "/images/Dintorni/portocervo2.webp" },
  { slug: "snorkeling", image: "/images/Dintorni/snorkeling.webp" },
  { slug: "trekking", image: "/images/Dintorni/trekking.webp" },
];

/**
 * Spiagge nei dintorni (blocco a griglia). Le foto arrivano dopo: finché
 * `image` è assente si mostra un placeholder. `mode: "archipelago"` per le
 * spiagge raggiungibili in barca (nessun tempo in auto).
 */
export type Beach = {
  name: string;
  /** Durata come stringa già pronta, es. "24 min" (vuoto se archipelago). */
  duration: string;
  mode: "car" | "archipelago";
  image?: string;
};

export const BEACHES: Beach[] = [
  { name: "Spiaggia del Principe", duration: "24 min", mode: "car" },
  { name: "Spiaggia del Grande Pevero", duration: "13 min", mode: "car" },
  { name: "Spiaggia di Capriccioli", duration: "20 min", mode: "car" },
  { name: "Spiaggia delle Vacche", duration: "1h 10 min", mode: "car" },
  { name: "Spiaggia Rosa", duration: "", mode: "archipelago" },
  { name: "Spargi e Budelli", duration: "", mode: "archipelago" },
];

/** Ristoranti consigliati (lista concierge). Il tipo di cucina è in dict.restaurants[slug]. */
export type Restaurant = {
  slug: keyof Dictionary["restaurants"];
  name: string;
  duration: string; // es. "11 min"
};

export const RESTAURANTS: Restaurant[] = [
  { slug: "phi", name: "Phi Beach", duration: "4 min" },
  { slug: "cue", name: "CUE Churrascaria", duration: "6 min" },
  { slug: "zuma", name: "Zuma Porto Cervo", duration: "11 min" },
  { slug: "fingers", name: "Finger's Porto Cervo", duration: "11 min" },
  { slug: "mizuna", name: "Mizuna", duration: "18 min" },
];

export type GalleryPhoto = {
  id: keyof Dictionary["gallery"]; // → didascalia in dict.gallery[id]
  src: string;
  /** Dimensioni reali del file → masonry senza layout shift. */
  w: number;
  h: number;
};

/** Galleria immersiva della struttura (foto reali ottimizzate WebP). */
export const GALLERY: GalleryPhoto[] = [
  { id: "mare1", src: "/images/Gallery/mare1.webp", w: 1600, h: 1200 },
  { id: "colazione1", src: "/images/Gallery/colazione1.webp", w: 1600, h: 1200 },
  { id: "esterno2", src: "/images/Gallery/esterno2.webp", w: 1512, h: 2016 },
  { id: "gazebo", src: "/images/Gallery/gazebo.webp", w: 1600, h: 1066 },
  { id: "mare2", src: "/images/Gallery/mare2.webp", w: 1600, h: 1200 },
  { id: "ospiti", src: "/images/Gallery/ospiti.webp", w: 1600, h: 1200 },
  { id: "panorama", src: "/images/Gallery/panorama.webp", w: 1600, h: 1200 },
  { id: "relax", src: "/images/Gallery/relax.webp", w: 1600, h: 1066 },
  { id: "giardino", src: "/images/Gallery/giardino.webp", w: 1600, h: 1200 },
  { id: "esterno1", src: "/images/Gallery/esterno1.webp", w: 1600, h: 1200 },
  { id: "colazione2", src: "/images/Gallery/colazione2.webp", w: 1600, h: 1066 },
  { id: "baja", src: "/images/Gallery/baja.webp", w: 1600, h: 1200 },
];

export type Testimonial = {
  key: keyof Dictionary["testimonials"]; // → titolo e testo in dict.testimonials[key]
  name: string;
  /** Paese di provenienza → dict.countries[countryKey] + bandiera (default: italia). */
  countryKey?: keyof Dictionary["countries"];
  /** Data in ISO — formattata per lingua via Intl.DateTimeFormat. */
  dateIso: string;
  rating: number;
};

/** Recensioni reali Booking.com — punteggio struttura 9.3/10 */
export const TESTIMONIALS: Testimonial[] = [
  { key: "miguel", name: "Miguel", countryKey: "spagna", dateIso: "2026-06-26", rating: 5 },
  { key: "marina", name: "Marina", countryKey: "germania", dateIso: "2026-06-20", rating: 5 },
  { key: "patricia", name: "Patricia", countryKey: "portogallo", dateIso: "2026-06-03", rating: 5 },
  { key: "tomsed13", name: "Tomsed13", dateIso: "2025-08-17", rating: 5 },
  { key: "macen", name: "Macen", dateIso: "2025-07-14", rating: 5 },
  { key: "silvia", name: "Silvia", dateIso: "2025-07-13", rating: 5 },
];

export const NAV_LINKS = [
  { label: "Struttura", href: "#struttura" },
  { label: "Camere", href: "#camere" },
  { label: "Servizi", href: "#servizi" },
  { label: "Galleria", href: "#galleria" },
  { label: "Dintorni", href: "#dintorni" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Contatti", href: "#contatti" },
] as const;
