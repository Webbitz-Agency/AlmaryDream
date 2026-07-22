/**
 * Dizionario ITALIANO — lingua di riferimento (default).
 * La forma di questo oggetto definisce il tipo `Dictionary`: en.ts e de.ts
 * devono avere ESATTAMENTE le stesse chiavi.
 *
 * I titoli spezzati (titleA / em / titleB) permettono di evidenziare in corsivo
 * accento una parola chiave, mantenendo la traduzione naturale in ogni lingua.
 */
const it = {
  nav: {
    struttura: "Struttura",
    camere: "Camere",
    servizi: "Servizi",
    galleria: "Galleria",
    dintorni: "Dintorni",
    recensioni: "Recensioni",
    contatti: "Contatti",
  },
  cta: {
    book: "Prenota Ora",
  },
  langSwitcher: {
    label: "Lingua",
  },

  hero: {
    eyebrow: "Almary Dream · Luxury B&B · Costa Smeralda",
    titleA: "Un respiro di ",
    titleEm: "eleganza",
    titleB: " sul mare",
    subtitle:
      "Il tuo rifugio intimo a soli 100 metri dalle acque di Baja Sardinia. Tre camere esclusive di design, dove ogni risveglio profuma di mare.",
  },

  intro: {
    eyebrow: "Il B&B",
    titleA: "Rilassati nel cuore della ",
    titleEm: "Costa Smeralda",
    titleB: "",
    body:
      "Almary Dream è un boutique B&B di lusso a soli 100 metri da Baja Sardinia, a tre minuti a piedi da Cala Battistoni. Tre camere esclusive, una luminosa area colazione e una zona relax esterna con gazebo: ogni dettaglio è pensato per regalarti freschezza, comfort ed eleganza, alimentato da energia interamente green.",
  },

  sections: {
    services: {
      eyebrow: "Comfort & Servizi",
      titleA: "Tutto ciò che rende speciale il tuo ",
      titleEm: "soggiorno",
      titleB: "",
    },
    rooms: {
      eyebrow: "Le nostre camere",
      titleA: "Tre rifugi di ",
      titleEm: "charme",
      titleB: "",
      subtitle: "Ogni camera con letto King Size, doccia emozionale e finiture di design.",
    },
    gallery: {
      eyebrow: "Galleria",
      titleA: "Vivi ",
      titleEm: "Almary Dream",
      titleB: "",
      subtitle:
        "Dagli interni di design al mare cristallino della Costa Smeralda: uno sguardo a ciò che ti aspetta.",
    },
    surroundings: {
      eyebrow: "Nei dintorni",
      titleA: "Cosa fare a ",
      titleEm: "Baja Sardinia",
      titleB: "",
      subtitle:
        "Nel cuore della Costa Smeralda, Almary Dream è il punto di partenza ideale per spiagge paradisiache, gite in barca e serate indimenticabili sul mare.",
    },
    reviews: {
      eyebrow: "Recensioni",
      titleA: "Cosa dicono ",
      titleEm: "di noi",
      titleB: "",
      badge: "Eccellente",
    },
  },

  features: {
    breakfast: { title: "Colazione inclusa", description: "Specialità locali sarde o selezione internazionale, ogni mattina." },
    wifi: { title: "Wi-Fi alta velocità", description: "Connessione veloce in tutta la struttura." },
    ac: { title: "Aria climatizzata", description: "Climatizzazione autonoma in ogni camera." },
    sea: { title: "A 100 m dal mare", description: "Spiagge ampissime e attrezzate con tutti i servizi, a pochi passi dalla struttura." },
    relax: { title: "Zona relax esterna", description: "Gazebo, poltroncine e doccia all'aperto." },
    green: { title: "Energia green", description: "Impianto fotovoltaico con accumulo." },
    shower: { title: "Doccia emozionale", description: "Comfort premium in ogni bagno." },
    barbecue: { title: "Esperienza gourmet", description: "Barbecue all'aperto e, su richiesta, cene romantiche o esclusive per le tue occasioni speciali." },
  },

  highlights: {
    badge: "Su richiesta",
    wine: {
      title: "Cantina & bollicine",
      description:
        "Vini pregiati, birre speciali e champagne per brindare ai tuoi momenti più importanti. Disponibili su richiesta per festeggiamenti e occasioni speciali.",
    },
    boat: {
      title: "Mare & esperienze",
      description:
        "Gite in barca, tour guidati, noleggio barche e auto: organizziamo per te le esperienze più belle della Costa Smeralda.",
    },
  },

  amenities: {
    kingBed: "Letto King Size",
    emotionalShower: "Doccia emozionale",
    wifi: "Wi-Fi",
    ac: "Aria condizionata",
    fridge: "Frigobar",
    minibar: "Minibar",
    groundFloor: "Piano terra",
    safe: "Cassaforte",
    makeupVanity: "Toilette trucco",
  },

  roomMeta: {
    guests: "{n} ospiti",
    from: "A partire da",
    perNight: "/ notte",
    priceNote: "Tariffa in base al periodo · colazione inclusa",
    availabilityCta: "Verifica disponibilità",
  },

  rooms: {
    dream: {
      name: "Camera Dream",
      description: "Un'oasi di comfort e calore con toni naturali, per un risveglio che profuma di mare.",
    },
    "blue-sky": {
      name: "Camera Blue Sky",
      description: "Luminosa camera con parete color cielo, vicina alla sala colazione.",
    },
    smeraldo: {
      name: "Camera Smeraldo",
      description:
        "Un'elegante fusione di freschezza e comfort al piano terra, impreziosita dalla parete color Tiffany, con guardaroba a vista.",
    },
  },

  activities: {
    beaches: {
      title: "Spiagge da sogno",
      description: "Cala Battistoni a 3 minuti a piedi, la spiaggia di Baja Sardinia e le calette di Cala Granu con acqua cristallina.",
    },
    maddalena: {
      title: "Arcipelago di La Maddalena",
      description: "Gite in barca tra Spargi, Budelli e la celebre Spiaggia Rosa, nel cuore del parco marino più bello del Mediterraneo.",
    },
    boat: {
      title: "In barca sulla Costa Smeralda",
      description: "Gite in barca, tour guidati e noleggio: naviga tra cale nascoste e acque turchesi. Organizziamo noi l'esperienza in mare più adatta a te.",
    },
    phi: {
      title: "Phi Beach & aperitivi al tramonto",
      description: "Tramonti mozzafiato sugli scogli di Forte Cappellini, tra musica, cocktail e l'atmosfera glamour della Costa Smeralda.",
    },
    ritual: {
      title: "Ritual Club",
      description:
        "La leggendaria discoteca scavata nella roccia di Baja Sardinia, dal 1970 simbolo della vita notturna della Costa Smeralda: musica, design e atmosfera esclusiva a pochi passi da Almary Dream.",
    },
    portocervo: {
      title: "Porto Cervo",
      description: "A soli 15 minuti, lo shopping di lusso, il porto e la vita mondana del borgo simbolo della Costa Smeralda.",
    },
    snorkeling: {
      title: "Snorkeling & diving",
      description: "Fondali di granito e acque trasparenti: immersioni e snorkeling tra le insenature più suggestive della costa.",
    },
    trekking: {
      title: "Trekking & natura",
      description: "Sentieri panoramici tra macchia mediterranea, capo Ferro e il faro, alla scoperta di cale nascoste e viste sul mare.",
    },
  },

  gallery: {
    mare1: "Le spiagge di Baja Sardinia",
    colazione1: "La colazione di Almary Dream",
    esterno2: "L'ingresso della struttura",
    gazebo: "Zona relax con gazebo",
    mare2: "Acque cristalline a pochi passi",
    ospiti: "Colazione vista mare",
    panorama: "Costa Smeralda",
    relax: "Area lounge",
    giardino: "Il giardino",
    esterno1: "La struttura, con energia green",
    colazione2: "La sala colazione",
    baja: "Nel cuore di Baja Sardinia",
  },

  reviewsBadge: {
    label: "Eccellente",
    scale: "9.3/10",
  },

  countries: {
    italia: "Italia",
    germania: "Germania",
    portogallo: "Portogallo",
    spagna: "Spagna",
    francia: "Francia",
    regnounito: "Regno Unito",
    svizzera: "Svizzera",
    austria: "Austria",
    olanda: "Olanda",
    belgio: "Belgio",
  },

  testimonials: {
    miguel: { title: "Eccellente", quote: "" },
    marina: {
      title: "Assolutamente eccezionale",
      quote:
        "Ci è piaciuto tutto :-) La struttura dista solo 3 minuti dalla spiaggia di Baja Sardinia. Posti auto gratuiti proprio fuori dalla porta. L'alloggio è arredato di recente, super moderno, pulito e il nostro ospite Aleks si assicura che non ci manchi nulla. Al mattino prepara la colazione con amore. Vi aspettano pasticcini freschi e una selezione di specialità italiane a base di salumi e formaggi, oltre a dolci e frutta. Qualunque sia la tua domanda, lui è sempre pronto ad aiutarti. Ci siamo sentiti completamente a casa e ci piacerebbe molto tornare.",
    },
    patricia: {
      title: "Eccezionale",
      quote:
        "Un soggiorno imperdibile se vi trovate in zona! La camera da letto era splendida e confortevole, e pulitissima. Anche la colazione era ottima; il proprietario era presente e ha spiegato di cosa si trattava il tagliere di salumi, offrendo diverse e valide opzioni per entrambi i giorni. Il proprietario è stato davvero gentile e disponibile. Anche la posizione era ottima, a pochi passi da diversi ristoranti, da una piazza con alcuni negozi e dalla spiaggia. Lo consiglio al 100%!",
    },
    tomsed13: {
      title: "Eccezionale",
      quote:
        "B&b di recentissima ristrutturazione. Situato nel pieno centro di Baja Sardinia risulta essere la soluzione migliore per chi vuole usare poco la macchina e divertirsi. Phi Beach e Ritual raggiungibili tranquillamente a piedi. Il titolare Alessandro ha saputo creare una struttura moderna e di design. Colazione con prodotti selezionati e di qualità. Camere confortevoli e complete di tutto il necessario. Consigliatissimo.",
    },
    macen: {
      title: "Eccezionale",
      quote:
        "Ottima posizione, colazione deliziosa e aria condizionata perfetta. L'host ci ha persino aiutato a trasportare i bagagli dalla macchina all'interno.",
    },
    silvia: {
      title: "Bellissimo",
      quote:
        "Alessandro è stato molto gentile e attento, ci ha dato ottimi consigli su dove mangiare fuori e la colazione era meravigliosa.",
    },
  },

  finalCta: {
    eyebrow: "Almary Dream",
    titleA: "Il tuo risveglio sul mare ti ",
    titleEm: "aspetta",
    titleB: "",
    subtitle:
      "Prenotazione diretta, semplice e sicura: scegli le date e verifica subito la disponibilità del tuo soggiorno in Costa Smeralda.",
    note1:
      "* All'arrivo gli ospiti verseranno una cauzione di €300, interamente restituita al check-out salvo eventuali danni alla struttura.",
    note2:
      "** Al check-out, in struttura, è dovuta la tassa di soggiorno come previsto dalle normative vigenti.",
    orCall: "Chiama",
    orWrite: "oppure scrivici su",
  },

  common: {
    readMore: "Leggi tutto",
    readLess: "Mostra meno",
  },

  units: {
    night: "notte",
    nights: "notti",
    guest: "ospite",
    guests: "ospiti",
  },

  booking: {
    checkin: "Check-in",
    checkout: "Check-out",
    guestsLabel: "Ospiti",
    checkAvailability: "Verifica Disponibilità",
    selectCheckin: "Seleziona il check-in",
    selectCheckout: "Seleziona il check-out",
    confirm: "Conferma",
    close: "Chiudi",
    minStay: "Soggiorno minimo 2 notti",
    minStayBarred: " · le date barrate non sono disponibili",
    monthPrev: "Mese precedente",
    monthNext: "Mese successivo",
    perNightAria: "a notte",
  },

  request: {
    dialogAria: "Richiesta di prenotazione",
    eyebrow: "Richiesta di prenotazione",
    titleFallback: "Il tuo soggiorno",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Ospiti",
    estimatedTotal: "Totale stimato",
    rateOnRequest: "Tariffa su richiesta per queste date",
    nameLabel: "Nome e cognome *",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email *",
    emailPlaceholder: "mario@email.it",
    phoneLabel: "Telefono *",
    phonePlaceholder: "+39 333 1234567",
    messageLabel: "Messaggio (facoltativo)",
    messagePlaceholder: "Richieste particolari, orario di arrivo…",
    submit: "Invia richiesta",
    submitting: "Invio in corso…",
    noPayment: "Nessun pagamento ora: invii solo una richiesta, ti confermeremo la disponibilità.",
    errorGeneric: "Invio non riuscito. Riprova.",
    sentTitle: "Richiesta inviata!",
    sentBody: "Grazie {name}, abbiamo ricevuto la tua richiesta. Ti risponderemo al più presto per confermare la disponibilità.",
    close: "Chiudi",
  },

  results: {
    eyebrow: "Disponibilità",
    titleA: "Le camere per il tuo ",
    titleEm: "soggiorno",
    titleB: "",
    chooseDatesIntro: "Scegli le date per vedere le camere disponibili.",
    roomAvailableOne: "camera disponibile",
    roomAvailableMany: "camere disponibili",
    availableForDates: "Disponibile per le tue date",
    roomsAvailableCount: "{n} camere disponibili",
    multiRoomNote: "Per {n} ospiti può servire più di una camera: scegli comunque una camera qui sotto e scrivici, oppure contattaci per combinare più stanze.",
    noneForDates: "Nessuna camera disponibile per queste date. Modifica le date qui sopra o controlla qui sotto quando ogni camera è libera.",
    unavailableForDates: "Non disponibili per queste date",
    otherRooms: "Le altre camere",
    changeDatesHint: "Cambia le date sul calendario di ogni camera per scoprire quando è libera.",
    badgeCapacity: "Capienza non sufficiente",
    badgeAvailable: "Disponibile",
    badgeChooseCheckout: "Scegli il check-out",
    badgeChooseDates: "Scegli le date",
    badgeUnavailable: "Non disponibile",
    reasonBooked: "Date occupate",
    stayLabel: "Soggiorno:",
    totalWord: "totale",
    perNight: "/notte",
    rateOnRequest: "Tariffa su richiesta per queste date",
    bookThisRoom: "Prenota questa camera",
    selectAvailableDates: "Seleziona date disponibili",
    minStayNote: "Soggiorno minimo 2 notti.",
    clear: "Cancella",
    backHome: "Torna alla home",
    metaTitle: "Disponibilità — Almary Dream",
  },

  footer: {
    claim: "Luxury B&B a Baja Sardinia. Un respiro di eleganza sul mare, nel cuore della Costa Smeralda.",
    menu: "Menu",
    contact: "Contatti",
    whereWeAre: "Dove siamo",
    callNow: "Chiama ora",
    openInMaps: "Apri in Google Maps",
    rights: "Tutti i diritti riservati",
    privacy: "Privacy Policy",
  },

  privacy: {
    back: "Torna alla home",
    title: "Privacy & Cookie Policy",
    updated: "Ultimo aggiornamento: luglio 2026",
    intro:
      "La presente informativa descrive come Almary Dream tratta i dati personali degli utenti che visitano questo sito, in conformità al Regolamento (UE) 2016/679 (GDPR).",
    controllerTitle: "Titolare del trattamento",
    controllerBody:
      "Il titolare del trattamento è Almary Dream, con sede in Via della Pineta 1, 07021 Baja Sardinia (SS), Italia. Per qualsiasi richiesta puoi contattarci ai recapiti indicati in fondo a questa pagina.",
    dataTitle: "Dati che raccogliamo",
    dataBrowsingTitle: "Dati di navigazione",
    dataBrowsingBody:
      "Durante la visita raccogliamo, tramite cookie e strumenti analoghi, dati statistici sull'uso del sito (pagine viste, durata della visita, tipo di dispositivo, paese di provenienza, pagina di provenienza). Per i cookie analitici questi dati sono trattati solo previo tuo consenso.",
    dataFormTitle: "Dati forniti volontariamente",
    dataFormBody:
      "Se invii una richiesta di prenotazione tramite il modulo del sito, raccogliamo i dati che ci fornisci: nome, email, telefono, date e camera di interesse ed eventuali messaggi. Li usiamo esclusivamente per rispondere alla tua richiesta, che non è vincolante e non comporta alcun pagamento.",
    purposesTitle: "Finalità e base giuridica",
    purposesBody:
      "I dati del modulo sono trattati per rispondere alle tue richieste (base giuridica: misure precontrattuali adottate su tua richiesta). I dati analitici sono trattati per migliorare il sito sulla base del tuo consenso, che puoi revocare in qualsiasi momento.",
    cookieTitle: "Cookie",
    cookieBody: "Utilizziamo due categorie di cookie:",
    cookieTechnical:
      "Cookie tecnici/necessari — indispensabili al funzionamento del sito (ad esempio la memorizzazione della tua scelta sui cookie). Non richiedono consenso.",
    cookieAnalytics:
      "Cookie analitici — Google Analytics 4, per capire come viene usato il sito. Si attivano solo se acconsenti dal banner. In assenza di consenso Google Analytics opera in modalità anonima (Consent Mode), senza cookie identificativi.",
    analyticsTitle: "Google Analytics",
    analyticsBody:
      "Questo sito utilizza Google Analytics 4, fornito da Google Ireland Ltd., che tratta i dati come responsabile del trattamento per nostro conto. L'indirizzo IP è trattato in forma anonimizzata. Alcuni dati possono essere trasferiti verso Paesi extra-UE nel rispetto delle garanzie previste dal GDPR. Maggiori informazioni: policies.google.com/privacy.",
    retentionTitle: "Conservazione dei dati",
    retentionBody:
      "I dati delle richieste di prenotazione sono conservati per il tempo necessario a gestire la richiesta e i relativi adempimenti. I dati analitici sono conservati secondo le impostazioni di Google Analytics (fino a 14 mesi).",
    rightsTitle: "I tuoi diritti",
    rightsBody:
      "In qualsiasi momento puoi chiedere l'accesso, la rettifica, la cancellazione o la limitazione dei tuoi dati, opporti al trattamento e revocare il consenso. Hai inoltre diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali.",
    changesTitle: "Modifiche",
    changesBody:
      "Ci riserviamo di aggiornare questa informativa. Le eventuali modifiche saranno pubblicate su questa pagina con la relativa data di aggiornamento.",
    contactTitle: "Contatti",
    contactLabel: "Per esercitare i tuoi diritti o per qualsiasi domanda scrivi a:",
  },

  cookie: {
    title: "Rispettiamo la tua privacy",
    message:
      "Usiamo cookie di analisi (Google Analytics) per capire come viene usato il sito e migliorarlo. Puoi accettarli o rifiutarli: la tua scelta non influisce sulla navigazione.",
    accept: "Accetta",
    reject: "Rifiuta",
    more: "Privacy Policy",
  },

  surround: {
    experiences: "Esperienze",
    beaches: "Le spiagge",
    beachesNote: "Cale e spiagge iconiche della Costa Smeralda, tutte a breve distanza.",
    dining: "Dove mangiare",
    diningNote: "I nostri indirizzi selezionati, a pochi minuti dalla struttura.",
    byCar: "in auto",
    archipelago: "Arcipelago · in barca",
    photoSoon: "Foto in arrivo",
  },

  restaurants: {
    phi: "Cucina mediterranea",
    cue: "Churrascaria brasiliana e sarda",
    zuma: "Cucina giapponese",
    fingers: "Cucina italo-giapponese",
    mizuna: "Cucina giapponese",
  },
};

export default it;

/**
 * Tipo del dizionario: en.ts e de.ts devono conformarsi a questo.
 * (Niente `as const` sull'oggetto: i valori restano `string`, così le altre
 * lingue possono avere testi diversi mantenendo le stesse chiavi.)
 */
export type Dictionary = typeof it;
