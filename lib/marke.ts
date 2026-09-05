/*
 * Die Angaben, die auf den Rechtsseiten stehen — an einer Stelle.
 *
 * Sie sind das, was vom bisherigen `content/site.ts` übrig ist. Die
 * Agenturseite mit ihren Leistungs-, Referenz- und Kontaktseiten ist der
 * Landingpage aus dem Portfolio gewichen; deren Texte stehen in
 * `lib/hd-texte.ts`, dreisprachig. Hier bleibt nur, was Impressum und
 * Datenschutzerklärung brauchen: dieselben Angaben, die vorher auch schon
 * hier standen, damit sie nicht an zwei Stellen auseinanderlaufen.
 *
 * Was noch fehlt, steht als PLATZHALTER da — und scripts/check-platzhalter.mjs
 * lässt den Build scheitern, solange davon etwas übrig ist.
 */
export const PLATZHALTER = "PLATZHALTER";

/** Die eigene Domain. Steht in metadataBase, robots.txt und der Sitemap. */
export const DOMAIN = "https://hareb.digital";

/** Das Portfolio. Seit dem Umzug eine fremde Domain, kein Geschwisterpfad. */
export const PORTFOLIO = "https://issahareb.me";

export const marke = {
  name: "Hareb Digital",
  domain: DOMAIN,
  /* Die Adresse, die auf der Landingpage im Fuss steht. Sie ist dieselbe
     geblieben; die Domain darunter ist neu. */
  email: "info@hareb.org",
  telefon: PLATZHALTER,
  strasse: PLATZHALTER,
  plz: PLATZHALTER,
  ort: "Essen",
  land: "DE",
  inhaber: "Issa Hareb",
  portfolio: PORTFOLIO,
} as const;
