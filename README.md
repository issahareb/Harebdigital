# Hareb Digital — hareb.digital

Individuelles Digitalstudio von Issa Hareb in Essen. Next.js 16, React 19 und Tailwind 4. Alle Inhaltsseiten werden beim Build als HTML vorgerendert; `next start` übernimmt die Auslieferung und Bildoptimierung.

## Entwicklung und Prüfung

```bash
npm ci
npm run dev
npm run build
npm run typecheck
npm run start
# Gegen den laufenden Produktionsserver, standardmäßig localhost:3000:
npm run check:seo
# Browserprüfung nach Installation des Testbrowsers:
npx playwright install chromium
npm run check:browser
npm run check:motion
# Separater Check der tatsächlichen Veröffentlichungsbereitschaft:
npm run pruefen
```

`SEO_BASE_URL` kann für `check:seo` einen anderen Testserver setzen. Der Test prüft die tatsächlich ausgelieferte HTML-Ausgabe aller 18 indexierbaren Seiten: Status, Sprache, genau eine H1, individuelle Titel, Beschreibungen, Canonicals, wechselseitige hreflang-Links, Open Graph, sichtbare FAQ-Inhalte, JSON-LD, Sitemap, Robots, interne Links, Fehlerseiten und Asset-Caching.

## Adressen und Sprachen

| Inhalt | Deutsch | Englisch | Spanisch |
| --- | --- | --- | --- |
| Startseite | `/` | `/en/` | `/es/` |
| Kontakt | `/kontakt/` | `/en/kontakt/` | `/es/kontakt/` |
| Leistungen | `/leistungen/[slug]/` | `/en/leistungen/[slug]/` | `/es/leistungen/[slug]/` |

`app/(de)` und `app/[lang]` haben eigene Root-Layouts mit korrektem HTML-Sprachattribut. Die Adresse legt die Sprache fest; Cookies, Geolocation und Accept-Language ändern den Seiteninhalt nicht. Alte deutsche Leistungsadressen bleiben erhalten. Impressum und Datenschutz bleiben deutsch und tragen `noindex, follow`; sie sind crawlbar, damit dieses Signal gelesen werden kann.

Die Sitemap enthält nur die 18 indexierbaren Seiten und deren Sprachen. Kein künstliches `lastmod` bei jedem Build. `public/llms.txt` ist eine zusätzliche Navigationshilfe, kein Ranking-Signal und keine AEO-Garantie.

## Gestaltung und Animation

Warmer Papierton, Anthrazit, Glas, Aluminium und limettengrüne Verbindungen bilden die Bildsprache. Die Homepage besteht größtenteils aus Server-Komponenten. Navigation, Scrollfilm, dezente Abschnittsübergänge und Anfrageformular benötigen Client-JavaScript. Alte Motion-/GSAP-Komponenten sind nicht im neuen Seitenbaum eingebunden.

`components/cinematic-hero.tsx` und `components/scroll-film.tsx` koppeln eine in Higgsfield erzeugte Kamerafahrt an den nativen Scrollfortschritt: durch architektonische Gänge, zunehmende Geschwindigkeit, dann Kabel als kosmische Energieströme. Vorwärts- und Rückwärtsscrollen wählen tatsächliche Filmbilder aus. Die Wiedergabe nutzt lokale WebP-Einzelbilder auf Canvas, ohne Video-Seeking oder einen ständig laufenden Render-Loop. Vier gleichzeitige Ladevorgänge und ein Fenster von höchstens 25 gehaltenen Bildern begrenzen die Ressourcen; der aktuelle Frame hat Vorrang. Mobil wird ein hochkant zugeschnittener Satz geladen.

Sieben zusätzliche Motive begleiten Leistungen, Studio, Social Media und Kontakt. Reale Projekt- und Instagram-Nachweise bleiben erhalten. Quellen, Prompts, Job-IDs und Dateigrößen stehen in `docs/asset-provenance.json`. Responsive AVIF-/WebP-Dateien und der Film liegen versioniert in `public/studio/impulse/`. Schriften und Medien werden über die eigene Domain ausgeliefert.

Ein sichtbarer Schalter deaktiviert die Animation. Bei `prefers-reduced-motion` und Datensparmodus werden keine Filmbilder geladen. Ohne JavaScript bleiben Poster und Inhalte nutzbar. Das animierte Vollbildmenü nutzt ein natives modales Dialogelement mit Fokusbegrenzung, Escape und Wiederherstellung des Fokus. `check:motion` prüft die tatsächlich gezeichneten Bilder in beide Scrollrichtungen sowie Menü und Fallbacks. Für einen vorhandenen Chromium-Browser kann `PLAYWRIGHT_CHROMIUM_EXECUTABLE` gesetzt werden.

## Inhalte und Kontakt

`lib/studio-copy.ts` enthält die neuen redaktionellen Texte und FAQ in drei Sprachen. `lib/hd-texte.ts` enthält die vorhandenen Leistungsdetails, Projekttexte und Formularbeschriftungen. Projektdaten werden nicht als aktuelle Ergebnisse oder garantierte Kundenerfolge ausgegeben. Die Organisation und der Gründer behalten die bereits im Portfolio und im Taxi-Projekt verwendeten Schema-IDs.

Das Formular bereitet eine E-Mail vor und öffnet das E-Mail-Programm. Es sendet nicht automatisch und zeigt keinen erfundenen Versand-Erfolg. Die Auswahl kann mit `?leistung=automatisierung` vorbelegt werden. Ohne JavaScript bleibt ein direkter E-Mail-Link verfügbar.

## Noch offene Angaben vor einer Veröffentlichung

Die bestätigte Geschäftsanschrift in Sankt Augustin ist im Impressum enthalten. Weitere Angaben werden nicht aus dem Design abgeleitet oder erfunden; `npm run pruefen` meldet die noch offenen Geschäftsdaten und rechtlichen Textprüfungen. Auf der Kontaktseite wird eine fehlende Telefonnummer nicht als defekter Telefonlink angeboten.

Die aktuellen Prüfergebnisse und ihre Grenzen stehen in `docs/verification.json`. Visuelle Vorschauen: `docs/preview-desktop.png`, `docs/preview-mobile.png`, `docs/preview-flight.png` und `docs/preview-menu.png`.

Die bestehende Railway-Konfiguration deployt `npm run build` aus `main`.
