/**
 * Structured data (schema.org JSON-LD) per la SEO.
 * Tipo BedAndBreakfast con le camere come HotelRoom.
 *
 * NOTE:
 * - NIENTE aggregateRating dalle recensioni Booking: violerebbe le linee guida
 *   Google (le review non sono raccolte dal sito stesso).
 * - `geo` (lat/lng) è volutamente OMESSO finché il cliente non fornisce le
 *   coordinate GPS reali. Quando arrivano, aggiungerle qui (vedi TODO).
 */

import { SITE, ROOMS } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/it";
import type { Locale } from "@/i18n/config";

export function bedAndBreakfastJsonLd(dict: Dictionary, locale: Locale) {
  const home = locale === "it" ? `${SITE.url}/` : `${SITE.url}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    "@id": `${SITE.url}/#bnb`,
    name: SITE.name,
    description: dict.hero.subtitle,
    url: home,
    inLanguage: locale,
    telephone: SITE.phone,
    email: SITE.email,
    image: [`${SITE.url}/images/og-image.jpg`],
    priceRange: "€230–€450",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      postalCode: SITE.zip,
      addressLocality: "Baja Sardinia",
      addressRegion: "SS",
      addressCountry: "IT",
    },
    // TODO(coordinate GPS): quando il cliente le fornisce, aggiungere:
    // geo: { "@type": "GeoCoordinates", latitude: <lat>, longitude: <lng> },
    hasMap: SITE.mapsUrl,
    sameAs: [SITE.instagram],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast included", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Barbecue", value: true },
    ],
    additionalProperty: [
      { "@type": "PropertyValue", name: "CIR", value: SITE.cir },
      { "@type": "PropertyValue", name: "CIN", value: SITE.cin },
    ],
    containsPlace: ROOMS.map((room) => ({
      "@type": "HotelRoom",
      name: dict.rooms[room.slug].name,
      description: dict.rooms[room.slug].description,
      occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests },
      bed: { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
      floorSize: {
        "@type": "QuantitativeValue",
        value: parseInt(room.size, 10),
        unitCode: "MTK",
      },
    })),
  };
}
