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
  // Dominio canonico reale: www.almarydream.com (l'apex .com fa 308 → www).
  url: "https://www.almarydream.com",

  // Contatti reali
  phone: "+39 388 4773330",
  phoneHref: "tel:+393884773330",
  whatsapp: "https://wa.me/393884773330",
  email: "almarydream@gmail.com",
  // Social — Instagram ufficiale della struttura (Facebook inesistente → non mostrato)
  instagram: "https://www.instagram.com/almary_dream_bajasardinia/",

  // Posizione
  address: "Via della Pineta 1",
  zip: "07021",
  city: "Baja Sardinia (SS)",
  // Coordinate reali della struttura, ricavate dal Plus Code del pin Google
  // Business Profile (8FHF4FQH+2H, Baja Sardinia). L'indirizzo "Via della
  // Pineta 1" non è geolocalizzabile da Google → si usano le coordinate.
  lat: 41.137563,
  lng: 9.478937,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=41.137563,9.478937",
  mapsEmbed:
    "https://www.google.com/maps?q=41.137563,9.478937&z=16&output=embed",

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

/** Camere reali. NB: la colazione NON è compresa nella tariffa. */
export const ROOMS: Room[] = [
  {
    slug: "dream",
    size: "32 m²",
    maxGuests: 2,
    amenities: ["kingBed", "emotionalShower", "wifi", "ac", "fridge", "safe", "makeupVanity"],
    images: [
      // Servizio fotografico 2026 (selezione del cliente) — le vecchie foto
      // da smartphone sono state rimosse.
      "/images/Nuove/dream/d17.webp",
      "/images/Nuove/dream/d18.webp",
      "/images/Nuove/dream/d19.webp",
      "/images/Nuove/dream/d20.webp",
      "/images/Nuove/dream/d21.webp",
      "/images/Nuove/dream/d22.webp",
      "/images/Nuove/dream/d23.webp",
      "/images/Nuove/dream/d24.webp",
      "/images/Nuove/dream/d25.webp",
      "/images/Nuove/dream/d28.webp",
      "/images/Nuove/dream/d30.webp",
      "/images/Nuove/dream/d32.webp",
      "/images/Nuove/dream/d33.webp",
      "/images/Nuove/dream/d35.webp",
      "/images/Nuove/dream/d37.webp",
      "/images/Nuove/dream/d38.webp",
      "/images/Nuove/dream/d39.webp",
      "/images/Nuove/dream/d42.webp",
      "/images/Nuove/dream/d44.webp",
      "/images/Nuove/dream/d46.webp",
      "/images/Nuove/dream/d50.webp",
      "/images/Nuove/dream/d51.webp",
      "/images/Nuove/dream/d03.webp",
      "/images/Nuove/dream/d04.webp",
      "/images/Nuove/dream/d05.webp",
      "/images/Nuove/dream/d06.webp",
      "/images/Nuove/dream/d08.webp",
      "/images/Nuove/dream/d09.webp",
      "/images/Nuove/dream/d10.webp",
      "/images/Nuove/dream/d11.webp",
      "/images/Nuove/dream/d12.webp",
      "/images/Nuove/dream/d14.webp",
      "/images/Nuove/dream/d15.webp",
    ],
  },
  {
    slug: "blue-sky",
    size: "30 m²",
    maxGuests: 2,
    amenities: ["kingBed", "emotionalShower", "wifi", "ac", "safe", "makeupVanity"],
    images: [
      // Servizio fotografico 2026 (selezione del cliente) — le vecchie foto
      // da smartphone sono state rimosse.
      "/images/Nuove/bluesky/b35.webp",
      "/images/Nuove/bluesky/b36.webp",
      "/images/Nuove/bluesky/b39.webp",
      "/images/Nuove/bluesky/b41.webp",
      "/images/Nuove/bluesky/b43.webp",
      "/images/Nuove/bluesky/b02.webp",
      "/images/Nuove/bluesky/b05.webp",
      "/images/Nuove/bluesky/b06.webp",
      "/images/Nuove/bluesky/b08.webp",
      "/images/Nuove/bluesky/b09.webp",
      "/images/Nuove/bluesky/b10.webp",
      "/images/Nuove/bluesky/b11.webp",
      "/images/Nuove/bluesky/b13.webp",
      "/images/Nuove/bluesky/b15.webp",
      "/images/Nuove/bluesky/b17.webp",
      "/images/Nuove/bluesky/b19.webp",
      "/images/Nuove/bluesky/b21.webp",
      "/images/Nuove/bluesky/b22.webp",
      "/images/Nuove/bluesky/b25.webp",
      "/images/Nuove/bluesky/b27.webp",
      "/images/Nuove/bluesky/b29.webp",
      "/images/Nuove/bluesky/b30.webp",
      "/images/Nuove/bluesky/b32.webp",
      "/images/Nuove/bluesky/b33.webp",
    ],
  },
  {
    slug: "smeraldo",
    size: "30 m²",
    maxGuests: 2,
    amenities: ["kingBed", "emotionalShower", "wifi", "ac", "minibar", "groundFloor", "safe", "makeupVanity"],
    images: [
      // Servizio fotografico 2026 (camera Smeraldo, cartella Drive ROOM 3) — le
      // vecchie foto da smartphone sono state rimosse.
      "/images/Nuove/smeraldo/s163.webp",
      "/images/Nuove/smeraldo/s162.webp",
      "/images/Nuove/smeraldo/s166.webp",
      "/images/Nuove/smeraldo/s165.webp",
      "/images/Nuove/smeraldo/s167.webp",
      "/images/Nuove/smeraldo/s170.webp",
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
  { name: "Spiaggia del Principe", duration: "24 min", mode: "car", image: "/images/Spiagge/principe.webp" },
  { name: "Spiaggia del Grande Pevero", duration: "13 min", mode: "car", image: "/images/Spiagge/pevero.webp" },
  { name: "Spiaggia di Capriccioli", duration: "20 min", mode: "car", image: "/images/Spiagge/capriccioli.webp" },
  { name: "Spiaggia delle Vacche", duration: "1h 10 min", mode: "car", image: "/images/Spiagge/vacche.webp" },
  { name: "Spiaggia Rosa", duration: "", mode: "archipelago", image: "/images/Spiagge/rosa.webp" },
  { name: "Spargi e Budelli", duration: "", mode: "archipelago", image: "/images/Spiagge/spargi-budelli.webp" },
];

/** Ristoranti consigliati (lista concierge). Il tipo di cucina è in dict.restaurants[slug]. */
export type Restaurant = {
  slug: keyof Dictionary["restaurants"];
  name: string;
  duration: string; // es. "11 min"
  image: string;
};

export const RESTAURANTS: Restaurant[] = [
  { slug: "phi", name: "Phi Beach", duration: "4 min", image: "/images/Ristoranti/phi.webp" },
  { slug: "cue", name: "CUE Churrascaria", duration: "6 min", image: "/images/Ristoranti/cue.webp" },
  { slug: "zuma", name: "Zuma Porto Cervo", duration: "11 min", image: "/images/Ristoranti/zuma.webp" },
  { slug: "fingers", name: "Finger's Porto Cervo", duration: "11 min", image: "/images/Ristoranti/fingers.webp" },
  { slug: "mizuna", name: "Mizuna", duration: "18 min", image: "/images/Ristoranti/mizuna.webp" },
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
  { id: "esternoGranito", src: "/images/Nuove/comuni/c14.webp", w: 1600, h: 1067 },
  { id: "dehorGazebo", src: "/images/Nuove/dehor/e08.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e63.webp", w: 1600, h: 1067 },
  { id: "lounge", src: "/images/Nuove/comuni/c29.webp", w: 1600, h: 1067 },
  { id: "panorama", src: "/images/Gallery/panorama.webp", w: 1600, h: 1200 },
  { id: "vialetto", src: "/images/Nuove/comuni/c11.webp", w: 1600, h: 1067 },
  { id: "relaxEsterno", src: "/images/Nuove/dehor/e07.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e61.webp", w: 1600, h: 1067 },
  { id: "lounge", src: "/images/Nuove/comuni/c30.webp", w: 1600, h: 1067 },
  { id: "mare2", src: "/images/Gallery/mare2.webp", w: 1600, h: 1200 },
  { id: "targa", src: "/images/Nuove/comuni/c16.webp", w: 1600, h: 1067 },
  { id: "dehorTavolo", src: "/images/Nuove/dehor/e01.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e30.webp", w: 1600, h: 1067 },
  { id: "lounge", src: "/images/Nuove/comuni/c28.webp", w: 1600, h: 1067 },
  { id: "baja", src: "/images/Gallery/baja.webp", w: 1600, h: 1200 },
  { id: "portone", src: "/images/Nuove/comuni/c20.webp", w: 1600, h: 1067 },
  { id: "barbecue", src: "/images/Nuove/dehor/e15.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e31.webp", w: 1600, h: 1067 },
  { id: "angoloBar", src: "/images/Nuove/comuni/c32.webp", w: 1600, h: 1067 },
  { id: "giardino", src: "/images/Gallery/giardino.webp", w: 1600, h: 1200 },
  { id: "benvenuto", src: "/images/Nuove/comuni/c24.webp", w: 1600, h: 1067 },
  { id: "dehorGazebo", src: "/images/Nuove/dehor/e03.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e40.webp", w: 1600, h: 1067 },
  { id: "angoloBar", src: "/images/Nuove/comuni/c34.webp", w: 1600, h: 1067 },
  { id: "esterno1", src: "/images/Gallery/esterno1.webp", w: 1600, h: 1200 },
  { id: "scalaMarmo", src: "/images/Nuove/comuni/c01.webp", w: 1600, h: 1067 },
  { id: "docciaEsterna", src: "/images/Nuove/dehor/e71.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e45.webp", w: 1600, h: 1067 },
  { id: "angoloBar", src: "/images/Nuove/comuni/c39.webp", w: 1600, h: 1067 },
  { id: "esterno2", src: "/images/Gallery/esterno2.webp", w: 1512, h: 2016 },
  { id: "versoCamere", src: "/images/Nuove/comuni/c03.webp", w: 1600, h: 1067 },
  { id: "dehorTavolo", src: "/images/Nuove/dehor/e05.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e48.webp", w: 1600, h: 1067 },
  { id: "colazione1", src: "/images/Gallery/colazione1.webp", w: 1600, h: 1200 },
  { id: "pianerottolo", src: "/images/Nuove/comuni/c05.webp", w: 1600, h: 1067 },
  { id: "relaxEsterno", src: "/images/Nuove/dehor/e16.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e60.webp", w: 1600, h: 1067 },
  { id: "ospiti", src: "/images/Gallery/ospiti.webp", w: 1600, h: 1200 },
  { id: "vialetto", src: "/images/Nuove/comuni/c12.webp", w: 1600, h: 1067 },
  { id: "dehorGazebo", src: "/images/Nuove/dehor/e06.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e24.webp", w: 1600, h: 2401 },
  { id: "gazebo", src: "/images/Gallery/gazebo.webp", w: 1600, h: 1066 },
  { id: "pianerottolo", src: "/images/Nuove/comuni/c08.webp", w: 1600, h: 1067 },
  { id: "tavolaApparecchiata", src: "/images/Nuove/dehor/e11.webp", w: 1600, h: 1067 },
  { id: "buffet", src: "/images/Nuove/dehor/e27.webp", w: 1600, h: 2401 },
  { id: "relax", src: "/images/Gallery/relax.webp", w: 1600, h: 1066 },
  { id: "ingresso", src: "/images/Nuove/comuni/c19.webp", w: 1600, h: 1067 },
  { id: "docciaEsterna", src: "/images/Nuove/dehor/e73.webp", w: 1600, h: 1067 },
  { id: "colazione2", src: "/images/Gallery/colazione2.webp", w: 1600, h: 1066 },
  { id: "ingresso", src: "/images/Nuove/comuni/c23.webp", w: 1600, h: 1067 },
  { id: "dehorTavolo", src: "/images/Nuove/dehor/e13.webp", w: 1600, h: 1067 },
  { id: "targa", src: "/images/Nuove/comuni/c25.webp", w: 1600, h: 1067 },
  { id: "tavolaApparecchiata", src: "/images/Nuove/dehor/e68.webp", w: 1600, h: 1067 },
  { id: "docciaEsterna", src: "/images/Nuove/dehor/e74.webp", w: 1600, h: 1067 },
  { id: "tavolaApparecchiata", src: "/images/Nuove/dehor/e64.webp", w: 1600, h: 2401 },
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
