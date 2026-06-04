/**
 * Single source of truth — dati reali di Almary Dream (Luxury B&B, Costa Smeralda).
 * Fonte: almarydream.it. Modificando qui i contenuti, tutti i componenti si aggiornano.
 *
 * NOTA IMMAGINI: i path puntano a placeholder SVG in /public/images.
 * Per sostituirli con le foto reali: carica il file (.jpg/.webp) e aggiorna il path qui.
 * Le dimensioni del contenitore sono fisse nei componenti → nessun layout shift.
 */

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

  // Hero: video di sfondo + poster (mostrato durante il caricamento del video)
  heroVideo: "/images/hero/videoHero.mp4",
  heroPoster: "/images/hero/hero.svg",
} as const;

/**
 * Genera un link WhatsApp con messaggio precompilato per le conversioni.
 */
export function bookingHref(message: string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Feature = {
  title: string;
  description: string;
  /** chiave icona — vedi components/Features.tsx */
  icon: string;
};

/** Comfort & Servizi reali (8 item, come il riferimento) */
export const FEATURES: Feature[] = [
  { icon: "breakfast", title: "Colazione inclusa", description: "Specialità locali sarde o selezione internazionale, ogni mattina." },
  { icon: "wifi", title: "Wi-Fi alta velocità", description: "Connessione veloce in tutta la struttura." },
  { icon: "ac", title: "Aria climatizzata", description: "Climatizzazione autonoma in ogni camera." },
  { icon: "sea", title: "A 100 m dal mare", description: "Le acque di Baja Sardinia a pochi passi." },
  { icon: "relax", title: "Zona relax esterna", description: "Gazebo, lettini e doccia all'aperto." },
  { icon: "green", title: "Energia green", description: "Impianto fotovoltaico con accumulo." },
  { icon: "shower", title: "Doccia emozionale", description: "Comfort premium in ogni bagno." },
  { icon: "barbecue", title: "Esperienza gourmet", description: "Cena con barbecue all'aperto, su richiesta." },
];

export type Room = {
  slug: string;
  name: string;
  size: string;
  guests: string;
  description: string;
  amenities: string[];
  /** Galleria foto reali — scorribili nel carosello (la prima è la copertina) */
  images: string[];
};

/** Camere reali — colazione sempre inclusa */
export const ROOMS: Room[] = [
  {
    slug: "smeraldo",
    name: "Camera Smeraldo",
    size: "30 m²",
    guests: "2 ospiti",
    description:
      "Un'elegante fusione di freschezza e comfort, impreziosita dalla parete color Tiffany.",
    amenities: ["Letto king memory", "Doccia emozionale", "Wi-Fi", "Aria condizionata", "Minibar", "Cassaforte"],
    images: [
      "/images/Smeraldo/smeraldo1.webp",
      "/images/Smeraldo/smeraldo2.webp",
      "/images/Smeraldo/smeraldo3.webp",
      "/images/Smeraldo/smeraldo4.webp",
    ],
  },
  {
    slug: "dream",
    name: "Camera Dream",
    size: "32 m²",
    guests: "2 ospiti",
    description:
      "Un'oasi di comfort e calore con toni naturali, per un risveglio che profuma di mare.",
    amenities: ["Letto king memory", "Doccia emozionale", "Wi-Fi", "Aria condizionata", "Frigobar"],
    images: [
      "/images/Dream/dream1.webp",
      "/images/Dream/dream2.webp",
      "/images/Dream/dream3.webp",
      "/images/Dream/dream4.webp",
      "/images/Dream/dream5.webp",
      "/images/Dream/dream6.webp",
      "/images/Dream/dream7.webp",
      "/images/Dream/dream8.webp",
    ],
  },
  {
    slug: "blue-sky",
    name: "Camera Blue Sky",
    size: "30 m²",
    guests: "2 ospiti",
    description:
      "Luminosa camera al piano terra con parete color cielo, vicina alla sala colazione.",
    amenities: ["Letto king memory", "Doccia emozionale", "Wi-Fi", "Aria condizionata", "Piano terra"],
    images: [
      "/images/BlueSky/bs1.webp",
      "/images/BlueSky/bs2.webp",
      "/images/BlueSky/bs3.webp",
      "/images/BlueSky/bs4.webp",
    ],
  },
];

export type Activity = {
  title: string;
  description: string;
  /** foto reale (WebP ottimizzato) mostrata nella parte alta della card */
  image: string;
};

/** Cosa fare nei dintorni di Baja Sardinia (Costa Smeralda) — anche per la SEO locale */
export const ACTIVITIES: Activity[] = [
  {
    image: "/images/Dintorni/beach.webp",
    title: "Spiagge da sogno",
    description:
      "Cala Battistoni a 3 minuti a piedi, la spiaggia di Baja Sardinia e le calette di Cala Granu con acqua cristallina.",
  },
  {
    image: "/images/Dintorni/arcipelago.webp",
    title: "Arcipelago di La Maddalena",
    description:
      "Gite in barca tra Spargi, Budelli e la celebre Spiaggia Rosa, nel cuore del parco marino più bello del Mediterraneo.",
  },
  {
    image: "/images/Dintorni/phi.webp",
    title: "Phi Beach & aperitivi al tramonto",
    description:
      "Tramonti mozzafiato sugli scogli di Forte Cappellini, tra musica, cocktail e l'atmosfera glamour della Costa Smeralda.",
  },
  {
    image: "/images/Dintorni/portocervo.webp",
    title: "Porto Cervo",
    description:
      "A soli 15 minuti, lo shopping di lusso, il porto e la vita mondana del borgo simbolo della Costa Smeralda.",
  },
  {
    image: "/images/Dintorni/snorkeling.webp",
    title: "Snorkeling & diving",
    description:
      "Fondali di granito e acque trasparenti: immersioni e snorkeling tra le insenature più suggestive della costa.",
  },
  {
    image: "/images/Dintorni/trekking.webp",
    title: "Trekking & natura",
    description:
      "Sentieri panoramici tra macchia mediterranea, capo Ferro e il faro, alla scoperta di cale nascoste e viste sul mare.",
  },
];

export type Testimonial = {
  name: string;
  /** titolo della recensione (es. "Eccezionale") */
  title: string;
  date: string;
  quote: string;
  rating: number;
};

/** Recensioni reali Booking.com — punteggio struttura 9.3/10 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Tomsed13",
    title: "Eccezionale",
    date: "17 agosto 2025",
    quote:
      "B&b di recentissima ristrutturazione. Situato nel pieno centro di Baja Sardinia risulta essere la soluzione migliore per chi vuole usare poco la macchina e divertirsi. Phi Beach e Ritual raggiungibili tranquillamente a piedi. Il titolare Alessandro ha saputo creare una struttura moderna e di design. Colazione con prodotti selezionati e di qualità. Camere confortevoli e complete di tutto il necessario. Consigliatissimo.",
    rating: 5,
  },
  {
    name: "Giorgio",
    title: "Consigliato!",
    date: "21 settembre 2025",
    quote:
      "Struttura nuova, accogliente e pulita. Gentilissima e molto disponibile la signora Giusy.",
    rating: 5,
  },
  {
    name: "Matteo",
    title: "Eccezionale",
    date: "16 agosto 2025",
    quote: "Tutto semplicemente perfetto, torneremo sicuro.",
    rating: 5,
  },
  {
    name: "Silvia",
    title: "Bellissimo",
    date: "13 luglio 2025",
    quote:
      "Alessandro è stato molto gentile e attento, ci ha dato ottimi consigli su dove mangiare fuori e la colazione era meravigliosa.",
    rating: 5,
  },
  {
    name: "Macen",
    title: "Eccezionale",
    date: "14 luglio 2025",
    quote:
      "Ottima posizione, colazione deliziosa e aria condizionata perfetta. L'host ci ha persino aiutato a trasportare i bagagli dalla macchina all'interno.",
    rating: 5,
  },
];

export const NAV_LINKS = [
  { label: "Struttura", href: "#struttura" },
  { label: "Camere", href: "#camere" },
  { label: "Servizi", href: "#servizi" },
  { label: "Dintorni", href: "#dintorni" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Contatti", href: "#contatti" },
] as const;
