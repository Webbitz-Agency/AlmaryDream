import type { Dictionary } from "./it";

/** Dizionario RUMENO. Deve avere le stesse chiavi di it.ts (Dictionary). */
const ro: Dictionary = {
  nav: {
    struttura: "Structura",
    camere: "Camere",
    servizi: "Servicii",
    galleria: "Galerie",
    dintorni: "Împrejurimi",
    recensioni: "Recenzii",
    contatti: "Contact",
  },
  cta: {
    book: "Rezervă Acum",
  },
  langSwitcher: {
    label: "Limbă",
  },

  hero: {
    eyebrow: "Almary Dream · Luxury B&B · Costa Smeralda",
    titleA: "O adiere de ",
    titleEm: "eleganță",
    titleB: " la malul mării",
    subtitle:
      "Refugiul tău intim, la doar 100 de metri de apele din Baja Sardinia. Trei camere exclusiviste de design, unde fiecare trezire are parfum de mare.",
  },

  intro: {
    eyebrow: "B&B-ul",
    titleA: "Relaxează-te în inima ",
    titleEm: "Costa Smeralda",
    titleB: "",
    body:
      "Almary Dream este un boutique B&B de lux, la doar 100 de metri de Baja Sardinia și la trei minute de mers pe jos de Cala Battistoni. Trei camere exclusiviste, o luminoasă zonă de mic dejun și un spațiu de relaxare exterior cu foișor: fiecare detaliu este gândit pentru a-ți oferi prospețime, confort și eleganță, alimentate în întregime cu energie verde.",
  },

  sections: {
    services: {
      eyebrow: "Confort & Servicii",
      titleA: "Tot ceea ce face special ",
      titleEm: "sejurul",
      titleB: " tău",
    },
    rooms: {
      eyebrow: "Camerele noastre",
      titleA: "Trei refugii pline de ",
      titleEm: "farmec",
      titleB: "",
      subtitle: "Fiecare cameră cu pat King Size, duș senzorial și finisaje de design.",
    },
    gallery: {
      eyebrow: "Galerie",
      titleA: "Trăiește ",
      titleEm: "Almary Dream",
      titleB: "",
      subtitle:
        "De la interioarele de design până la marea cristalină a Costa Smeralda: o privire asupra a ceea ce te așteaptă.",
    },
    surroundings: {
      eyebrow: "În împrejurimi",
      titleA: "Ce poți face în ",
      titleEm: "Baja Sardinia",
      titleB: "",
      subtitle:
        "În inima Costa Smeralda, Almary Dream este punctul de plecare ideal pentru plaje paradiziace, plimbări cu barca și seri de neuitat la malul mării.",
    },
    reviews: {
      eyebrow: "Recenzii",
      titleA: "Ce spun ",
      titleEm: "despre noi",
      titleB: "",
      badge: "Excelent",
    },
  },

  features: {
    breakfast: { title: "Mic dejun inclus", description: "Specialități locale sarde sau o selecție internațională, în fiecare dimineață." },
    wifi: { title: "Wi-Fi de mare viteză", description: "Conexiune rapidă în toată structura." },
    ac: { title: "Aer condiționat", description: "Climatizare independentă în fiecare cameră." },
    sea: { title: "La 100 m de mare", description: "Plaje largi și complet dotate cu toate serviciile, la câțiva pași de structură." },
    relax: { title: "Zonă de relaxare exterioară", description: "Foișor, fotolii și duș în aer liber." },
    green: { title: "Energie verde", description: "Instalație fotovoltaică cu acumulare." },
    shower: { title: "Duș senzorial", description: "Confort premium în fiecare baie." },
    barbecue: { title: "Experiență gourmet", description: "Grătar în aer liber și, la cerere, cine romantice sau exclusiviste pentru ocaziile tale speciale." },
  },

  highlights: {
    badge: "La cerere",
    wine: {
      title: "Cramă & spumante",
      description:
        "Vinuri fine, beri speciale și șampanie pentru a toasta în cele mai importante momente ale tale. Disponibile la cerere pentru sărbători și ocazii speciale.",
    },
    boat: {
      title: "Mare & experiențe",
      description:
        "Plimbări cu barca, tururi ghidate, închiriere de bărci și mașini: organizăm pentru tine cele mai frumoase experiențe din Costa Smeralda.",
    },
  },

  amenities: {
    kingBed: "Pat King Size",
    emotionalShower: "Duș senzorial",
    wifi: "Wi-Fi",
    ac: "Aer condiționat",
    fridge: "Minibar frigider",
    minibar: "Minibar",
    groundFloor: "Parter",
    safe: "Seif",
    makeupVanity: "Măsuță de machiaj",
  },

  roomMeta: {
    guests: "{n} oaspeți",
    from: "Începând de la",
    perNight: "/ noapte",
    priceNote: "Tarif în funcție de perioadă · mic dejun inclus",
    availabilityCta: "Verifică disponibilitatea",
  },

  rooms: {
    dream: {
      name: "Camera Dream",
      description: "O oază de confort și căldură cu tonuri naturale, pentru o trezire cu parfum de mare.",
    },
    "blue-sky": {
      name: "Camera Blue Sky",
      description: "Cameră luminoasă cu un perete de culoarea cerului, aproape de sala de mic dejun.",
    },
    smeraldo: {
      name: "Camera Smeraldo",
      description:
        "O fuziune elegantă de prospețime și confort la parter, înfrumusețată de peretele în nuanță Tiffany, cu garderobă la vedere.",
    },
  },

  activities: {
    beaches: {
      title: "Plaje de vis",
      description: "Cala Battistoni la 3 minute de mers pe jos, plaja din Baja Sardinia și golfurile din Cala Granu cu apă cristalină.",
    },
    maddalena: {
      title: "Arhipelagul La Maddalena",
      description: "Plimbări cu barca printre Spargi, Budelli și celebra Spiaggia Rosa, în inima celui mai frumos parc marin din Mediterana.",
    },
    boat: {
      title: "Cu barca pe Costa Smeralda",
      description: "Plimbări cu barca, tururi ghidate și închirieri: navighează printre golfuri ascunse și ape turcoaz. Organizăm noi experiența pe mare cea mai potrivită pentru tine.",
    },
    phi: {
      title: "Phi Beach & aperitive la apus",
      description: "Apusuri de-ți taie răsuflarea peste stâncile de la Forte Cappellini, între muzică, cocktailuri și atmosfera glamour a Costa Smeralda.",
    },
    ritual: {
      title: "Ritual Club",
      description:
        "Legendarul club săpat în stânca din Baja Sardinia, simbol al vieții de noapte de pe Costa Smeralda din 1970: muzică, design și o atmosferă exclusivistă la câțiva pași de Almary Dream.",
    },
    portocervo: {
      title: "Porto Cervo",
      description: "La doar 15 minute, shopping-ul de lux, portul și viața mondenă a localității-simbol a Costa Smeralda.",
    },
    snorkeling: {
      title: "Snorkeling & scufundări",
      description: "Funduri de granit și ape transparente: scufundări și snorkeling printre cele mai spectaculoase golfuri ale coastei.",
    },
    trekking: {
      title: "Drumeții & natură",
      description: "Poteci panoramice prin vegetația mediteraneană, Capo Ferro și far, în căutarea golfurilor ascunse și a priveliștilor spre mare.",
    },
  },

  gallery: {
    mare1: "Plajele din Baja Sardinia",
    colazione1: "Micul dejun de la Almary Dream",
    esterno2: "Intrarea în structură",
    gazebo: "Zonă de relaxare cu foișor",
    mare2: "Ape cristaline la câțiva pași",
    ospiti: "Mic dejun cu vedere la mare",
    panorama: "Costa Smeralda",
    relax: "Zonă lounge",
    giardino: "Grădina",
    esterno1: "Structura, cu energie verde",
    colazione2: "Sala de mic dejun",
    baja: "În inima Baja Sardinia",
  },

  reviewsBadge: {
    label: "Excelent",
    scale: "9.3/10",
  },

  countries: {
    italia: "Italia",
    germania: "Germania",
    portogallo: "Portugalia",
    spagna: "Spania",
    francia: "Franța",
    regnounito: "Regatul Unit",
    svizzera: "Elveția",
    austria: "Austria",
    olanda: "Olanda",
    belgio: "Belgia",
  },

  testimonials: {
    miguel: { title: "Excelent", quote: "" },
    marina: {
      title: "Absolut excepțional",
      quote:
        "Ne-a plăcut totul :-) Structura este la doar 3 minute de plaja din Baja Sardinia. Locuri de parcare gratuite chiar în fața ușii. Cazarea este mobilată recent, super modernă, curată, iar gazda noastră Aleks se asigură că nu ne lipsește nimic. Dimineața pregătește micul dejun cu drag. Te așteaptă produse de patiserie proaspete și o selecție de specialități italiene din mezeluri și brânzeturi, precum și dulciuri și fructe. Orice întrebare ai avea, el este mereu gata să te ajute. Ne-am simțit ca acasă și ne-ar plăcea mult să ne întoarcem.",
    },
    patricia: {
      title: "Excepțional",
      quote:
        "Un sejur de neratat dacă ești în zonă! Dormitorul era superb și confortabil, și impecabil de curat. Și micul dejun era excelent; proprietarul era prezent și a explicat despre ce era vorba la platoul cu mezeluri, oferind mai multe opțiuni bune pentru ambele zile. Proprietarul a fost cu adevărat amabil și disponibil. Și locația era excelentă, la câțiva pași de mai multe restaurante, de o piață cu câteva magazine și de plajă. Îl recomand 100%!",
    },
    tomsed13: {
      title: "Excepțional",
      quote:
        "B&B renovat foarte recent. Situat chiar în centrul Baja Sardinia, este cea mai bună alegere pentru cine vrea să folosească mașina cât mai puțin și să se distreze. Phi Beach și Ritual sunt ușor de ajuns pe jos. Proprietarul Alessandro a reușit să creeze o structură modernă și de design. Mic dejun cu produse selectate și de calitate. Camere confortabile și dotate cu tot ce este necesar. Recomand cu căldură.",
    },
    macen: {
      title: "Excepțional",
      quote:
        "Locație excelentă, mic dejun delicios și aer condiționat perfect. Gazda ne-a ajutat chiar să cărăm bagajele de la mașină înăuntru.",
    },
    silvia: {
      title: "Minunat",
      quote:
        "Alessandro a fost foarte amabil și atent, ne-a dat sfaturi excelente despre unde să mâncăm în oraș, iar micul dejun a fost minunat.",
    },
  },

  finalCta: {
    eyebrow: "Almary Dream",
    titleA: "Trezirea ta la malul mării te ",
    titleEm: "așteaptă",
    titleB: "",
    subtitle:
      "Rezervare directă, simplă și sigură: alege datele și verifică imediat disponibilitatea sejurului tău în Costa Smeralda.",
    note1:
      "* La sosire, oaspeții vor achita o garanție de 300 €, restituită integral la check-out, în lipsa unor eventuale daune aduse structurii.",
    note2:
      "** La check-out, în structură, se datorează taxa de sejur, conform reglementărilor în vigoare.",
    orCall: "Sună",
    orWrite: "sau scrie-ne pe",
  },

  common: {
    readMore: "Citește tot",
    readLess: "Arată mai puțin",
  },

  units: {
    night: "noapte",
    nights: "nopți",
    guest: "oaspete",
    guests: "oaspeți",
  },

  booking: {
    checkin: "Check-in",
    checkout: "Check-out",
    guestsLabel: "Oaspeți",
    checkAvailability: "Verifică Disponibilitatea",
    selectCheckin: "Selectează check-in-ul",
    selectCheckout: "Selectează check-out-ul",
    confirm: "Confirmă",
    close: "Închide",
    minStay: "Sejur minim 2 nopți",
    minStayBarred: " · datele barate nu sunt disponibile",
    monthPrev: "Luna anterioară",
    monthNext: "Luna următoare",
    perNightAria: "pe noapte",
  },

  request: {
    dialogAria: "Cerere de rezervare",
    eyebrow: "Cerere de rezervare",
    titleFallback: "Sejurul tău",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Oaspeți",
    estimatedTotal: "Total estimat",
    rateOnRequest: "Tarif la cerere pentru aceste date",
    nameLabel: "Nume și prenume *",
    namePlaceholder: "Ion Popescu",
    emailLabel: "Email *",
    emailPlaceholder: "ion@email.com",
    phoneLabel: "Telefon *",
    phonePlaceholder: "+40 721 234 567",
    messageLabel: "Mesaj (opțional)",
    messagePlaceholder: "Cerințe speciale, ora de sosire…",
    submit: "Trimite cererea",
    submitting: "Se trimite…",
    noPayment: "Nicio plată acum: trimiți doar o cerere, îți vom confirma disponibilitatea.",
    errorGeneric: "Trimiterea a eșuat. Încearcă din nou.",
    sentTitle: "Cerere trimisă!",
    sentBody: "Mulțumim {name}, am primit cererea ta. Îți vom răspunde cât mai curând pentru a confirma disponibilitatea.",
    close: "Închide",
  },

  results: {
    eyebrow: "Disponibilitate",
    titleA: "Camerele pentru ",
    titleEm: "sejurul tău",
    titleB: "",
    chooseDatesIntro: "Alege datele pentru a vedea camerele disponibile.",
    roomAvailableOne: "cameră disponibilă",
    roomAvailableMany: "camere disponibile",
    availableForDates: "Disponibilă pentru datele tale",
    roomsAvailableCount: "{n} camere disponibile",
    multiRoomNote: "Pentru {n} oaspeți poate fi nevoie de mai mult de o cameră: alege oricum o cameră mai jos și scrie-ne, sau contactează-ne pentru a combina mai multe camere.",
    noneForDates: "Nicio cameră disponibilă pentru aceste date. Modifică datele de mai sus sau verifică mai jos când este liberă fiecare cameră.",
    unavailableForDates: "Indisponibile pentru aceste date",
    otherRooms: "Celelalte camere",
    changeDatesHint: "Schimbă datele în calendarul fiecărei camere pentru a afla când este liberă.",
    badgeCapacity: "Capacitate insuficientă",
    badgeAvailable: "Disponibilă",
    badgeChooseCheckout: "Alege check-out-ul",
    badgeChooseDates: "Alege datele",
    badgeUnavailable: "Indisponibilă",
    reasonBooked: "Date ocupate",
    stayLabel: "Sejur:",
    totalWord: "total",
    perNight: "/noapte",
    rateOnRequest: "Tarif la cerere pentru aceste date",
    bookThisRoom: "Rezervă această cameră",
    selectAvailableDates: "Selectează date disponibile",
    minStayNote: "Sejur minim 2 nopți.",
    clear: "Șterge",
    backHome: "Înapoi la pagina principală",
    metaTitle: "Disponibilitate — Almary Dream",
  },

  footer: {
    claim: "Luxury B&B în Baja Sardinia. O adiere de eleganță la malul mării, în inima Costa Smeralda.",
    menu: "Meniu",
    contact: "Contact",
    whereWeAre: "Unde ne aflăm",
    callNow: "Sună acum",
    openInMaps: "Deschide în Google Maps",
    rights: "Toate drepturile rezervate",
    privacy: "Politica de Confidențialitate",
  },

  privacy: {
    back: "Înapoi la pagina principală",
    title: "Politica de Confidențialitate",
    body:
      "Aceasta este o pagină provizorie. Inserați aici politica de confidențialitate completă a Almary Dream (operatorul de date, scopurile, temeiul juridic, cookie-urile, drepturile persoanei vizate și datele de contact pentru exercitarea drepturilor).",
    contactLabel: "Pentru informații:",
  },

  cookie: {
    title: "Îți respectăm confidențialitatea",
    message:
      "Folosim cookie-uri de analiză (Google Analytics) pentru a înțelege cum este utilizat site-ul și a-l îmbunătăți. Poți accepta sau refuza — alegerea ta nu afectează navigarea.",
    accept: "Accept",
    reject: "Refuz",
    more: "Politica de confidențialitate",
  },

  surround: {
    experiences: "Experiențe",
    beaches: "Plajele",
    beachesNote: "Golfuri și plaje iconice ale Costa Smeralda, toate la mică distanță.",
    dining: "Unde să mănânci",
    diningNote: "Adresele noastre selectate, la câteva minute de structură.",
    byCar: "cu mașina",
    archipelago: "Arhipelag · cu barca",
    photoSoon: "Foto în curând",
  },

  restaurants: {
    phi: "Bucătărie mediteraneană",
    cue: "Churrascaria braziliană și sardă",
    zuma: "Bucătărie japoneză",
    fingers: "Bucătărie italo-japoneză",
    mizuna: "Bucătărie japoneză",
  },
};

export default ro;
