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
# Deterministische Prüfung der Scrollfilm-Wiedergabe ohne Browser:
node scripts/check-scroll-film.mjs
# Separater Check der tatsächlichen Veröffentlichungsbereitschaft:
npm run pruefen
```

`SEO_BASE_URL` kann für `check:seo` einen anderen Testserver setzen. Der Test prüft die tatsächlich ausgelieferte HTML-Ausgabe der 21 mehrsprachigen Seiten: Status, Sprache, genau eine H1, individuelle Titel, Beschreibungen, Canonicals, wechselseitige hreflang-Links, Open Graph, sichtbare FAQ-Inhalte und JSON-LD. Auf den fünf ausschließlich deutschen Leistungs- und Projektseiten prüft er zusätzlich Status, Sprache, Canonical und die Sprachschalter: EN und ES führen auf vorhandene Startseiten. Sitemap, Robots, interne Links, Fehlerseiten und Asset-Caching werden ebenfalls geprüft.

## Adressen und Sprachen

| Inhalt | Deutsch | Englisch | Spanisch |
| --- | --- | --- | --- |
| Startseite | `/` | `/en/` | `/es/` |
| Kontakt | `/kontakt/` | `/en/kontakt/` | `/es/kontakt/` |
| Leistungen | `/leistungen/[slug]/` | `/en/leistungen/[slug]/` | `/es/leistungen/[slug]/` |

`app/(de)` und `app/[lang]` haben eigene Root-Layouts mit korrektem HTML-Sprachattribut. Die Adresse legt die Sprache fest; Cookies, Geolocation und Accept-Language ändern den Seiteninhalt nicht. Alte deutsche Leistungsadressen bleiben erhalten. Impressum und Datenschutz bleiben deutsch und tragen `noindex, follow`; sie sind crawlbar, damit dieses Signal gelesen werden kann.

Die Sitemap enthält die 21 mehrsprachigen Seiten und die fünf ausschließlich deutschen Leistungs- und Projektseiten. Kein künstliches `lastmod` bei jedem Build. `public/llms.txt` ist eine zusätzliche Navigationshilfe, kein Ranking-Signal und keine AEO-Garantie.

## Gestaltung und Animation

Warmer Papierton, Anthrazit, Glas, Aluminium und limettengrüne Verbindungen bilden die Bildsprache. Die Homepage besteht größtenteils aus Server-Komponenten. Navigation, Scrollfilm, dezente Abschnittsübergänge und Anfrageformular benötigen Client-JavaScript. Alte Motion-/GSAP-Komponenten sind nicht im neuen Seitenbaum eingebunden.

`components/cinematic-hero.tsx` und `components/scroll-film.tsx` koppeln eine räumliche Kamerafahrt an den nativen Scrollfortschritt. Die zuvor verwendete Higgsfield-Bildfolge ist durch eine feste Architekturszene ersetzt. Die ursprünglichen Mediendateien bleiben als Quellen erhalten.

Die Hero-Kamerafahrt wird seit dem 02.11.2026 direkt mit WebGL gerendert (`lib/hero-scene.ts`). Architektur, Boden und Lime-Lichtleisten bestehen aus unveränderlicher Geometrie; nur die Kamera bewegt sich. Der Renderer verwendet Kantenglättung und bis zu doppelte CSS-Auflösung mit einem Limit von fünf Millionen Pixeln. Es werden keine Einzelbilder mehr geladen oder überblendet. Scroll-Dämpfung ist zeitbasiert, vorwärts und rückwärts. Eine kleine begrenzte Kamerabewegung hält die Szene auch beim Scrollstopp lebendig. Der Render-Loop pausiert außerhalb des Heros und in versteckten Tabs. Ausschalter, reduzierte Bewegung und Datensparmodus zeigen das statische Poster; bei fehlendem WebGL oder Kontextverlust fällt der Hero ebenfalls darauf zurück.

`node scripts/check-scroll-film.mjs` prüft unveränderliche Geometrie, Auflösung, Pixelbudget, Kamerarückkehr, begrenzte Ruhebewegung, Pause und Bereinigung. Die tatsächliche Bildrate hängt vom Gerät und seiner Displayfrequenz ab.

Sieben zusätzliche Motive begleiten Leistungen, Studio, Social Media und Kontakt. Reale Projekt- und Instagram-Nachweise bleiben erhalten. Quellen, Prompts, Job-IDs und Dateigrößen stehen in `docs/asset-provenance.json`. Responsive AVIF-/WebP-Dateien und der Film liegen versioniert in `public/studio/impulse/`. Schriften und eigene Medien werden über die eigene Domain ausgeliefert.

`components/website-showcase.tsx` zeigt vier externe Pinterest-Designinspirationen mit Quellenlinks. Die Videoadressen und Poster stehen in `lib/website-clips.ts`; sie werden direkt von Pinterest geladen. Die Galerie bleibt beim nativen vertikalen Scrollen stehen, bewegt die Videos horizontal und gibt den Seitenverlauf nach dem letzten Clip wieder frei. Nur das sichtbare Video läuft, Hintergrund-Tabs pausieren. Pfeile, Tastatur und Pause-Schalter ergänzen das Scrollen. Bei reduzierter Bewegung und sehr niedrigen Fenstern bleibt ein normaler Wischbereich; reduzierte Bewegung und Datensparmodus starten Videos erst auf Anforderung. Die frühere Studio-Codekarte zeigt den tatsächlichen Wort-Farbeffekt über `ScrollAccent`.

Beim ersten Scrollen öffnet sich der eingerahmte Hero über einen weich interpolierten Ausschnitt auf die gesamte Bildschirmfläche. Zurückscrollen stellt denselben Ausschnitt wieder her. Die Navigation fährt mit dem oberen Rand aus dem Bild, kehrt nach dem Hero zurück und bleibt per Tastatur erreichbar. Die Filmtexte erläutern SEO/AEO und automatisierte Anfragen. `check:motion` prüft den kontinuierlichen Übergang, alle vier Vollbildecken, die Umkehr und die Rückkehr der Navigation zusätzlich zur Kamerafahrt.

Ein sichtbarer Schalter deaktiviert den Hero-Film. Bei `prefers-reduced-motion` und Datensparmodus werden keine Filmbilder geladen. Ohne JavaScript bleiben Poster und Inhalte nutzbar. Das animierte Vollbildmenü nutzt ein natives modales Dialogelement mit Fokusbegrenzung, Escape und Wiederherstellung des Fokus. `check:motion` prüft auch Menü und Fallbacks. Für einen vorhandenen Chromium-Browser kann `PLAYWRIGHT_CHROMIUM_EXECUTABLE` gesetzt werden.

In „Der Anspruch“ färbt `components/scroll-accent.tsx` die zweite Überschriftszeile beim Scrollen Wort für Wort von Grau zum grünen Textakzent. Der Scrollstand bestimmt die Farbe auch beim Zurückscrollen. Die vollständige Überschrift bleibt im HTML; bei reduzierter Bewegung erscheint die zweite Zeile statisch grün. Das dekorative Sternsymbol entfällt. Vorschau: `docs/preview-approach.webp`.

## Inhalte und Kontakt

`lib/studio-copy.ts` enthält die neuen redaktionellen Texte und FAQ in drei Sprachen. `lib/hd-texte.ts` enthält die vorhandenen Leistungsdetails, Projekttexte und Formularbeschriftungen. Projektdaten werden nicht als aktuelle Ergebnisse oder garantierte Kundenerfolge ausgegeben. Die Organisation und der Gründer behalten die bereits im Portfolio und im Taxi-Projekt verwendeten Schema-IDs.

Die Social-Nachweise stammen vom ehemaligen Instagram-Account dailyraphood und sind entsprechend als Archiv gekennzeichnet. Der sichtbare Profil-Link „Mr Han“ führt zu TikTok (`@issa3701`).

Das Formular bereitet eine E-Mail vor und öffnet das E-Mail-Programm. Es sendet nicht automatisch und zeigt keinen erfundenen Versand-Erfolg. Die Auswahl kann mit `?leistung=automatisierung` vorbelegt werden. Ohne JavaScript bleibt ein direkter E-Mail-Link verfügbar.

## Noch offene Angaben vor einer Veröffentlichung

Die bestätigte Geschäftsanschrift in Sankt Augustin ist im Impressum enthalten. Weitere Angaben werden nicht aus dem Design abgeleitet oder erfunden; `npm run pruefen` meldet die noch offenen Geschäftsdaten und rechtlichen Textprüfungen. Auf der Kontaktseite wird eine fehlende Telefonnummer nicht als defekter Telefonlink angeboten.

Die aktuellen Prüfergebnisse und ihre Grenzen stehen in `docs/verification.json`. Visuelle Vorschauen: `docs/preview-desktop.png`, `docs/preview-mobile.png`, `docs/preview-flight.png`, `docs/preview-fullscreen.webp` und `docs/preview-menu.png`.

Die bestehende Railway-Konfiguration deployt `npm run build` aus `main`.

Die Telefonie-Sektion verwendet eine offene Gestaltung auf dem Seitenhintergrund, ohne äußere Karte, verschachtelte Rahmen oder Status-Kacheln. Angebotsgalerie, Navigation und Datenschutzschalter verzichten ebenfalls auf zusätzliche dekorative Umrandungen; Fokusmarkierungen bleiben erhalten.

Das mobile Menü öffnet als kompaktes cremefarbenes Dialogfeld mit begrenzter Höhe. `components/service-experience.tsx` zeigt einen bedienbaren Vorher-Nachher-Vergleich im AREAL-Beispielkonzept, einen animierten Ablauf mit manueller Schrittauswahl sowie umschaltbare Suche-/KI-Antwort-Darstellungen. Animationen respektieren reduzierte Bewegung, Sichtbarkeit und Hintergrund-Tabs. Die Designgalerie ist wieder an vertikales Scrollen gekoppelt; auf kurzen Bildschirmen und bei reduzierter Bewegung bleibt sie direkt wischbar. Nur der aktive sichtbare Clip spielt. Der ChatGPT-Beleg zeigt einen als Auszug markierten Ausschnitt bis vor dem separaten Einordnung-Absatz; die unveränderte Originalaufnahme bleibt verlinkt. Unicode-Pfeile in sichtbaren Verweisen sind durch SVG-Symbole ersetzt.
