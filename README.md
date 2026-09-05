# Hareb Digital — hareb.digital

Die Landingpage. Dreisprachig, serverseitig gerendert.

Sie lag vorher als `/start` im Portfolio-Repo unter issahareb.me und trug dort
`noindex` — mit der ausdrücklichen Begründung, dass eine Seite, die erst unter
einer fremden Domain Bewertungen sammelt und dann umzieht, gegen sich selbst
anträte. Der Umzug ist passiert. Hier wird indexiert.

## Aufbau

```
/                Die Landingpage (de/en/es, siehe Sprachen)
/kontakt         E-Mail, Telefon, Sitz
/impressum       deutsch, noindex
/datenschutz     deutsch, noindex
```

Next.js 16 App Router, Tailwind 4, `motion` für die Bewegung, `gsap` für die
Galerie. Kein statischer Export mehr — warum, steht in `next.config.mjs`.

## Sprachen

Die Seite wählt ihre Sprache aus drei Quellen, in dieser Reihenfolge: der
ausdrücklichen Wahl im Schalter (Cookie `hd-sprache`), dem
`Accept-Language`-Kopf des Browsers, dem Land. **Nicht** aus der Adresse.

Das war unter `noindex` richtig: der Verkehr kam aus Anzeigen, und ein
Besucher sollte ohne Zwischenklick in seiner Sprache ankommen.

**Mit Index ist es das nicht mehr.** Derselbe Pfad liefert je nach Kopf einen
anderen Text; ein Crawler bekäme mal die eine und mal die andere Fassung unter
`/`. Der übliche Ausweg — `Vary: Accept-Language` — steht hier nicht zur
Verfügung: der App Router schreibt `Vary` für seine eigenen RSC-Anfragen und
überschreibt dabei alles, was aus `headers()` oder aus einer Middleware kommt.
Nachgemessen, beides kam nicht an.

Die Lösung sind eigene Adressen je Sprache (`/`, `/en`, `/es`) samt `hreflang`.
Das ist der nächste Umbau und bewusst nicht Teil des Umzugs.

## Was aus dem Portfolio NICHT mitgekommen ist

`/anfrage` samt Formular. Es reicht seine Eingaben an den L.U.K.A.S.-Server
weiter und hängt an einem Token, das hier nicht liegt. Der Ruf zur Tat führt
deshalb auf `/kontakt`. Ein nachgebautes Formular ohne Empfänger wäre die
schlechtere Lösung: es sähe vollständiger aus und wäre es nicht — der Besucher
glaubt, er habe Kontakt aufgenommen, und versucht es kein zweites Mal.

Zwei Sätze in `lib/hd-texte.ts` mussten dafür angepasst werden; sie
beschrieben das Formular („Fünf Felder, eines davon freiwillig").

## Was von der alten Agenturseite geblieben ist

Impressum und Datenschutz — beides Pflicht, beides deutsch, beides jetzt im
Gewand der Landingpage. Die Datenschutzerklärung stand vorher auf „keine
Cookies, keine Analyse, keine fremden Server". Der Sprachschalter setzt einen
Cookie, also stimmt der erste Teil nicht mehr; der Abschnitt „Sprachwahl" ist
neu.

Alles andere — Startseite, Leistungsseiten, Referenzen, `content/site.ts`,
`components/bausteine.tsx` — ist entfernt.

## Vor dem Livegang

```bash
npm run pruefen
```

Bricht ab, solange irgendwo `PLATZHALTER` steht: Anschrift, Telefon, USt-ID,
die ungeprüfte Datenschutzerklärung. Ein Kommentar hält niemanden auf, eine
Prüfung schon.

**Die Datenschutzerklärung ist ein Gerüst**, kein fertiger Text. Sie deckt den
aktuellen Stand ab. Sobald etwas dazukommt — ein Formular, Analyse, eine
Kartenansicht — gehört sie erweitert und von jemandem geprüft, der dafür
haftet.

## Befehle

```bash
npm run dev         # Entwicklung
npm run build       # Produktionsbau
npm run start       # den gebauten Server starten (liest PORT)
npm run pruefen     # Platzhalter-Prüfung
npm run build:live  # Prüfung + Bau
```
