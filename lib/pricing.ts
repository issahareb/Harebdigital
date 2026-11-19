import type { HdLang } from './hd-texte'
export const ONE_PAGER_PRICE = 490
export const WEBSITE_PRICE = 1290
export const SHOP_PRICE = 1490

export const SHOP_FEATURES = [
  'Individuelles Shopdesign, mobile Optimierung und technische SEO',
  'Katalog, Kategorien, Suche, Filter, Produktvarianten und Lagerbestand',
  'Warenkorb, Checkout, Kundenkonten und Gastbestellungen',
  'Zahlungsarten nach Anbieterfreigabe, etwa Karte, PayPal, Klarna, Apple Pay und Google Pay',
  'Versandzonen, Versandkosten, Steuern und Rabattcodes',
  'Bestellverwaltung, Bestellmails, Versandstatus, Rechnungen und Retouren',
  'Shop-Administration und Einweisung zur eigenständigen Pflege',
]

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
    `One-Pager starten bei 490 €, mehrseitige Websites bei 1.290 € und Onlineshops bei 1.490 €, jeweils einmalig. ${WEBSITE_PACKAGE.de.scope} Optional auf Wunsch: Verwaltung, Hosting und Pflege für 39,99 € im Monat. Domain und Lizenzen sind nicht pauschal enthalten.`,
    "One-Pager",
    "Unternehmenswebsite",
    "Terminwidget",
    "Website mit laufender Betreuung",
    "einmalig",
    "optional auf Wunsch: Verwaltung, Hosting und Pflege für 39,99 € im Monat",
    "Begrenztes Einstiegsangebot. Verfügbarkeit und genauer Leistungsumfang werden vor Auftragserteilung bestätigt. Endpreise gemäß § 19 UStG, ohne gesonderte Umsatzsteuer. Laufende Kosten und Erweiterungen werden separat vereinbart.",
    "Passendes Angebot anfragen", "Onlineshop"
  ],
  "en": [
    "Prices & introductory offers",
    "How much does a website cost?",
    `One-pagers start at €490, multi-page websites at €1,290 and online shops at €1,490, each as a one-time price. ${WEBSITE_PACKAGE.en.scope} Optional if you want: administration, hosting and maintenance for €39.99 per month. Domain and licences are not automatically included.`,
    "Landing page",
    "Business website",
    "Appointment widget",
    "Website with ongoing support",
    "one-time",
    "optional if you want: administration, hosting and maintenance for €39.99 per month",
    "Limited introductory offer. Availability and exact scope are confirmed before ordering. Final prices under German § 19 UStG, with no VAT charged separately. Ongoing costs and additions are agreed separately.",
    "Request an offer", "Online shop"
  ],
  "es": [
    "Precios y ofertas iniciales",
    "¿Cuánto cuesta una web?",
    `Las webs de una página parten de 490 €, las webs de varias páginas de 1.290 € y las tiendas online de 1.490 €, en un pago único. ${WEBSITE_PACKAGE.es.scope} Opcional si lo deseas: administración, alojamiento y mantenimiento por 39,99 € al mes. Dominio y licencias no están incluidos de forma general.`,
    "Landing page",
    "Web de empresa",
    "Widget de citas",
    "Web con mantenimiento continuo",
    "pago único",
    "opcional si lo deseas: administración, alojamiento y mantenimiento por 39,99 € al mes",
    "Oferta inicial limitada. Disponibilidad y alcance se confirman antes del encargo. Precios finales conforme al § 19 UStG alemán, sin IVA desglosado. Gastos recurrentes y ampliaciones se acuerdan por separado.",
    "Solicitar oferta", "Tienda online"
  ]
}
