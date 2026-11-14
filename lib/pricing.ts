import type { HdLang } from './hd-texte'
export const WEBSITE_PRICE = 990
export const HOSTING_MONTHLY_PRICE = 39.99

export const WEBSITE_PACKAGE: Record<HdLang, { scope: string; timeline: string; extras: string }> = {
  de: {
    scope: 'Enthalten sind bis zu fünf Inhaltsseiten, zusätzlich Impressum und Datenschutz mit von dir bereitgestellten Rechtstexten, sowie zwei gebündelte Korrekturrunden am vereinbarten Entwurf.',
    timeline: 'Die Umsetzung dauert etwa vier bis fünf Wochen ab vollständiger Bereitstellung der Inhalte und Abstimmung des Projektumfangs. Den konkreten Starttermin vereinbaren wir gemeinsam.',
    extras: 'Zusätzliche Seiten, weitere Korrekturrunden, Buchungsfunktionen, Verwaltungsbereiche, Schnittstellen und KI-Telefonie werden separat angeboten.',
  },
  en: {
    scope: 'Includes up to five content pages, plus legal notice and privacy pages using legal texts supplied by you, and two consolidated revision rounds on the agreed design.',
    timeline: 'Delivery takes approximately four to five weeks once all content is provided and the project scope is agreed. We agree on the actual start date together.',
    extras: 'Additional pages, further revision rounds, booking features, administration areas, integrations and AI phone assistance are quoted separately.',
  },
  es: {
    scope: 'Incluye hasta cinco páginas de contenido, además del aviso legal y la política de privacidad con textos legales facilitados por ti, y dos rondas de revisiones agrupadas del diseño acordado.',
    timeline: 'La realización tarda aproximadamente de cuatro a cinco semanas a partir de la entrega completa de los contenidos y del acuerdo sobre el alcance. Acordamos juntos la fecha de inicio.',
    extras: 'Las páginas adicionales, otras rondas de revisión, funciones de reserva, áreas de administración, integraciones y asistencia telefónica con IA se presupuestan por separado.',
  },
}

export const PRICING: Record<HdLang, string[]> = {
  "de": [
    "Preise & Einstiegsangebote",
    "Was kostet eine Website?",
    `Eine Website kostet bei Hareb Digital 990 € einmalig. ${WEBSITE_PACKAGE.de.scope} Betreuung/Hosting kostet 39,99 € pro Monat. Domain und Lizenzen sind nicht pauschal enthalten.`,
    "Landingpage",
    "Unternehmenswebsite",
    "Terminwidget",
    "Website mit laufender Betreuung",
    "einmalig",
    "zzgl. 39,99 € pro Monat für Betreuung/Hosting",
    "Begrenztes Einstiegsangebot. Verfügbarkeit und genauer Leistungsumfang werden vor Auftragserteilung bestätigt. Endpreise gemäß § 19 UStG, ohne gesonderte Umsatzsteuer. Laufende Kosten und Erweiterungen werden separat vereinbart.",
    "Passendes Angebot anfragen"
  ],
  "en": [
    "Prices & introductory offers",
    "How much does a website cost?",
    `A website from Hareb Digital costs €990 one-time. ${WEBSITE_PACKAGE.en.scope} Support/hosting costs €39.99 per month. Domain and licences are not automatically included.`,
    "Landing page",
    "Business website",
    "Appointment widget",
    "Website with ongoing support",
    "one-time",
    "plus €39.99 per month for support/hosting",
    "Limited introductory offer. Availability and exact scope are confirmed before ordering. Final prices under German § 19 UStG, with no VAT charged separately. Ongoing costs and additions are agreed separately.",
    "Request an offer"
  ],
  "es": [
    "Precios y ofertas iniciales",
    "¿Cuánto cuesta una web?",
    `Una web de Hareb Digital cuesta 990 € en un pago único. ${WEBSITE_PACKAGE.es.scope} El mantenimiento/alojamiento cuesta 39,99 € al mes. Dominio y licencias no están incluidos de forma general.`,
    "Landing page",
    "Web de empresa",
    "Widget de citas",
    "Web con mantenimiento continuo",
    "pago único",
    "más 39,99 € al mes por mantenimiento/alojamiento",
    "Oferta inicial limitada. Disponibilidad y alcance se confirman antes del encargo. Precios finales conforme al § 19 UStG alemán, sin IVA desglosado. Gastos recurrentes y ampliaciones se acuerdan por separado.",
    "Solicitar oferta"
  ]
}
