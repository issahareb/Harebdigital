/** Zentrale, vom Inhaber bestätigte Unternehmens- und Kontaktdaten. */
/** Die eigene Domain. Steht in metadataBase, robots.txt und der Sitemap. */
export const DOMAIN = "https://hareb.digital";

/** Das Portfolio. Seit dem Umzug eine fremde Domain, kein Geschwisterpfad. */
export const PORTFOLIO = "https://issahareb.me";

export const marke = {
  name: "Hareb Digital",
  domain: DOMAIN,
  email: "kontakt@hareb.digital",
  kontaktEmail: "kontakt@hareb.digital",
  telefon: "+49 201 85393123",
  gruendungsjahr: "2026",
  // Ladungsfähige Post- und Zustellanschrift über den Dienst Online-Impressum.
  // Dort ist KEIN Geschäftssitz angemeldet: nie als Sitz, Standort oder
  // Herkunft ausgeben, nur mit dem c/o-Zusatz und nur als Postanschrift.
  co: "c/o Online-Impressum",
  strasse: "Europaring 90",
  plz: "53757",
  ort: "Sankt Augustin",
  postanschriftHinweis: "Postanschrift über Online-Impressum, kein Geschäftssitz",
  arbeitsort: "Essen",
  land: "DE",
  inhaber: "Issa Hareb",
  portfolio: PORTFOLIO,
} as const;
