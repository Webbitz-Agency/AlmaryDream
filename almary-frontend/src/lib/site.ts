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
  /** Foto di sfondo (solo per le card premium in evidenza). */
  image?: string;
};

/** Comfort & Servizi reali (8 item, come il riferimento) */
export const FEATURES: Feature[] = [
  { icon: "breakfast", title: "Colazione inclusa", description: "Specialità locali sarde o selezione internazionale, ogni mattina." },
  { icon: "wifi", title: "Wi-Fi alta velocità", description: "Connessione veloce in tutta la struttura." },
  { icon: "ac", title: "Aria climatizzata", description: "Climatizzazione autonoma in ogni camera." },
  { icon: "sea", title: "A 100 m dal mare", description: "Spiagge ampissime e attrezzate con tutti i servizi, a pochi passi dalla struttura." },
  { icon: "relax", title: "Zona relax esterna", description: "Gazebo, poltroncine e doccia all'aperto." },
  { icon: "green", title: "Energia green", description: "Impianto fotovoltaico con accumulo." },
  { icon: "shower", title: "Doccia emozionale", description: "Comfort premium in ogni bagno." },
  { icon: "barbecue", title: "Esperienza gourmet", description: "Barbecue all'aperto e, su richiesta, cene romantiche o esclusive per le tue occasioni speciali." },
];

/** Servizi premium in evidenza — due card grandi sotto la griglia (su richiesta). */
export const HIGHLIGHTS: Feature[] = [
  {
    icon: "wine",
    title: "Cantina & bollicine",
    description:
      "Vini pregiati, birre speciali e champagne per brindare ai tuoi momenti più importanti. Disponibili su richiesta per festeggiamenti e occasioni speciali.",
    image: "/images/Dintorni/cardBollicine.webp",
  },
  {
    icon: "boat",
    title: "Mare & esperienze",
    description:
      "Giri in barca, tour guidati, noleggio barche e auto: organizziamo per te le esperienze più belle della Costa Smeralda.",
    image: "/images/Dintorni/cardBarca.webp",
  },
];

export type Room = {
  slug: string;
  name: string;
  size: string;
  guests: string;
  /** Capienza massima (numero) — usata per filtrare le camere in base agli ospiti. */
  maxGuests: number;
  description: string;
  amenities: string[];
  /** Galleria foto reali — scorribili nel carosello (la prima è la copertina) */
  images: string[];
};

/** Camere reali — colazione sempre inclusa */
export const ROOMS: Room[] = [
  {
    slug: "dream",
    name: "Camera Dream",
    size: "32 m²",
    guests: "2 ospiti",
    maxGuests: 2,
    description:
      "Un'oasi di comfort e calore con toni naturali, per un risveglio che profuma di mare.",
    amenities: ["Letto King Size", "Doccia emozionale", "Wi-Fi", "Aria condizionata", "Frigobar", "Cassaforte", "Toilette trucco"],
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
    name: "Camera Blue Sky",
    size: "30 m²",
    guests: "2 ospiti",
    maxGuests: 2,
    description:
      "Luminosa camera al piano terra con parete color cielo, vicina alla sala colazione.",
    amenities: ["Letto King Size", "Doccia emozionale", "Wi-Fi", "Aria condizionata", "Piano terra", "Cassaforte", "Toilette trucco"],
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
    name: "Camera Smeraldo",
    size: "30 m²",
    guests: "2 ospiti",
    maxGuests: 2,
    description:
      "Un'elegante fusione di freschezza e comfort, impreziosita dalla parete color Tiffany. Al piano terra, con guardaroba a vista.",
    amenities: ["Letto King Size", "Doccia emozionale", "Wi-Fi", "Aria condizionata", "Minibar", "Cassaforte", "Toilette trucco"],
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
  title: string;
  description: string;
  /** foto reale (WebP ottimizzato) mostrata nella parte alta della card */
  image: string;
};

/** Cosa fare nei dintorni di Baja Sardinia (Costa Smeralda) — anche per la SEO locale */
export const ACTIVITIES: Activity[] = [
  {
    image: "/images/Dintorni/spiagge_sogno.webp",
    title: "Spiagge da sogno",
    description:
      "Cala Battistoni a 3 minuti a piedi, la spiaggia di Baja Sardinia e le calette di Cala Granu con acqua cristallina.",
  },
  {
    image: "/images/Dintorni/arcipelago2.webp",
    title: "Arcipelago di La Maddalena",
    description:
      "Gite in barca tra Spargi, Budelli e la celebre Spiaggia Rosa, nel cuore del parco marino più bello del Mediterraneo.",
  },
  {
    image: "/images/Dintorni/cardBarca.webp",
    title: "In barca sulla Costa Smeralda",
    description:
      "Giri in barca, tour guidati e noleggio: naviga tra cale nascoste e acque turchesi. Organizziamo noi l'esperienza in mare più adatta a te.",
  },
  {
    image: "/images/Dintorni/phi.webp",
    title: "Phi Beach & aperitivi al tramonto",
    description:
      "Tramonti mozzafiato sugli scogli di Forte Cappellini, tra musica, cocktail e l'atmosfera glamour della Costa Smeralda.",
  },
  {
    image: "/images/Dintorni/ritual.webp",
    title: "Ritual Club",
    description:
      "La leggendaria discoteca scavata nella roccia di Baja Sardinia, dal 1970 simbolo della vita notturna della Costa Smeralda: musica, design e atmosfera esclusiva a pochi passi da Almary Dream.",
  },
  {
    image: "/images/Dintorni/portocervo2.webp",
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

export type GalleryPhoto = {
  src: string;
  /** Didascalia (mostrata in hover + lightbox) e alt SEO. */
  caption: string;
  /** Dimensioni reali del file → masonry senza layout shift. */
  w: number;
  h: number;
};

/** Galleria immersiva della struttura (foto reali ottimizzate WebP). */
export const GALLERY: GalleryPhoto[] = [
  { src: "/images/Gallery/mare1.webp", caption: "Le spiagge di Baja Sardinia", w: 1600, h: 1200 },
  { src: "/images/Gallery/colazione1.webp", caption: "La colazione di Almary Dream", w: 1600, h: 1200 },
  { src: "/images/Gallery/esterno2.webp", caption: "L'ingresso della struttura", w: 1512, h: 2016 },
  { src: "/images/Gallery/gazebo.webp", caption: "Zona relax con gazebo", w: 1600, h: 1066 },
  { src: "/images/Gallery/mare2.webp", caption: "Acque cristalline a pochi passi", w: 1600, h: 1200 },
  { src: "/images/Gallery/ospiti.webp", caption: "Colazione vista mare", w: 1600, h: 1200 },
  { src: "/images/Gallery/panorama.webp", caption: "Costa Smeralda", w: 1600, h: 1200 },
  { src: "/images/Gallery/relax.webp", caption: "Area lounge", w: 1600, h: 1066 },
  { src: "/images/Gallery/giardino.webp", caption: "Il giardino", w: 1600, h: 1200 },
  { src: "/images/Gallery/esterno1.webp", caption: "La struttura, con energia green", w: 1600, h: 1200 },
  { src: "/images/Gallery/colazione2.webp", caption: "La sala colazione", w: 1600, h: 1066 },
  { src: "/images/Gallery/baja.webp", caption: "Nel cuore di Baja Sardinia", w: 1600, h: 1200 },
];

export type Testimonial = {
  name: string;
  /** Paese di provenienza dell'ospite (mostrato accanto al nome). */
  country?: string;
  /** titolo della recensione (es. "Eccezionale") */
  title: string;
  date: string;
  /** Testo della recensione (alcune recensioni Booking non hanno testo). */
  quote?: string;
  rating: number;
};

/** Recensioni reali Booking.com — punteggio struttura 9.3/10 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Miguel",
    country: "Spagna",
    title: "Eccellente",
    date: "26 giugno 2026",
    rating: 5,
  },
  {
    name: "Marina",
    country: "Germania",
    title: "Assolutamente eccezionale",
    date: "20 giugno 2026",
    quote:
      "Ci è piaciuto tutto :-) La struttura dista solo 3 minuti dalla spiaggia di Baja Sardinia. Posti auto gratuiti proprio fuori dalla porta. L'alloggio è arredato di recente, super moderno, pulito e il nostro ospite Aleks si assicura che non ci manchi nulla. Al mattino prepara la colazione con amore. Vi aspettano pasticcini freschi e una selezione di specialità italiane a base di salumi e formaggi, oltre a dolci e frutta. Qualunque sia la tua domanda, lui è sempre pronto ad aiutarti. Ci siamo sentiti completamente a casa e ci piacerebbe molto tornare.",
    rating: 5,
  },
  {
    name: "Patricia",
    country: "Portogallo",
    title: "Eccezionale",
    date: "3 giugno 2026",
    quote:
      "Un soggiorno imperdibile se vi trovate in zona! La camera da letto era splendida e confortevole, e pulitissima. Anche la colazione era ottima; il proprietario era presente e ha spiegato di cosa si trattava il tagliere di salumi, offrendo diverse e valide opzioni per entrambi i giorni. Il proprietario è stato davvero gentile e disponibile. Anche la posizione era ottima, a pochi passi da diversi ristoranti, da una piazza con alcuni negozi e dalla spiaggia. Lo consiglio al 100%!",
    rating: 5,
  },
  {
    name: "Tomsed13",
    title: "Eccezionale",
    date: "17 agosto 2025",
    quote:
      "B&b di recentissima ristrutturazione. Situato nel pieno centro di Baja Sardinia risulta essere la soluzione migliore per chi vuole usare poco la macchina e divertirsi. Phi Beach e Ritual raggiungibili tranquillamente a piedi. Il titolare Alessandro ha saputo creare una struttura moderna e di design. Colazione con prodotti selezionati e di qualità. Camere confortevoli e complete di tutto il necessario. Consigliatissimo.",
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
  {
    name: "Silvia",
    title: "Bellissimo",
    date: "13 luglio 2025",
    quote:
      "Alessandro è stato molto gentile e attento, ci ha dato ottimi consigli su dove mangiare fuori e la colazione era meravigliosa.",
    rating: 5,
  },
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
