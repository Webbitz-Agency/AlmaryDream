/**
 * Dizionario ITALIANO — lingua di riferimento (default).
 * La forma di questo oggetto definisce il tipo `Dictionary`: en.ts e de.ts
 * devono avere ESATTAMENTE le stesse chiavi. Popolato progressivamente
 * (Fase 2: estrazione di tutti i testi da componenti + site.ts).
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
};

export default it;

/**
 * Tipo del dizionario: en.ts e de.ts devono conformarsi a questo.
 * (Niente `as const` sull'oggetto: i valori restano `string`, così le altre
 * lingue possono avere testi diversi mantenendo le stesse chiavi.)
 */
export type Dictionary = typeof it;
