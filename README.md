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

Warmer Papierton, Anthrazit, zurückhaltendes Citron und ein Travertin-H als Leitmotiv. Die Homepage besteht größtenteils aus Server-Komponenten. Nur Navigation, Scrollbühne und Anfrageformular benötigen Client-JavaScript. Die frühere umfangreiche globale Stylesammlung wurde durch ein auf diese Seite abgestimmtes Stylesheet ersetzt. Alte Motion-/GSAP-Komponenten sind nicht im neuen Seitenbaum eingebunden.

`components/cinematic-hero.tsx` koppelt Verschiebung und Zoom des in Higgsfield erzeugten Motivs an den Scrollfortschritt. Ein einzelner passiver Scroll-Listener wird über `requestAnimationFrame` gebündelt; es gibt keinen ständig laufenden Render-Loop und kein Abfangen des Scrollens. Ein sichtbarer Schalter deaktiviert die Animation, `prefers-reduced-motion` wird berücksichtigt. Ohne JavaScript bleiben die vollständigen Inhalte nutzbar.

Die zwei neuen Bilder wurden über Higgsfield erzeugt. Die Quelle, Job-IDs und die Optimierungsziele stehen in `docs/asset-provenance.json`. Responsive AVIF-/WebP-Dateien liegen versioniert in `public/studio/`. Schriften, Bilder und später mögliche Filme werden über die eigene Domain ausgeliefert.

Die gewünschte individuelle Video-Kamerafahrt konnte wegen fehlender Higgsfield-Credits nicht erzeugt werden. Das ausgelieferte Motiv ist ein scrollanimiertes Standbild, kein generierter Film. Der genaue Videoprompt ist dokumentiert. `CinematicHero` kann später einen lokalen `videoSrc` erhalten; der Download beginnt erst bei Scrollinteraktion und unterbleibt bei reduzierter Bewegung oder Datensparmodus. Vor Verwendung eines Films sind Encoding, Seek-Verhalten und Browserdarstellung gesondert zu prüfen.

## Inhalte und Kontakt

`lib/studio-copy.ts` enthält die neuen redaktionellen Texte und FAQ in drei Sprachen. `lib/hd-texte.ts` enthält die vorhandenen Leistungsdetails, Projekttexte und Formularbeschriftungen. Projektdaten werden nicht als aktuelle Ergebnisse oder garantierte Kundenerfolge ausgegeben. Die Organisation und der Gründer behalten die bereits im Portfolio und im Taxi-Projekt verwendeten Schema-IDs.

Das Formular bereitet eine E-Mail vor und öffnet das E-Mail-Programm. Es sendet nicht automatisch und zeigt keinen erfundenen Versand-Erfolg. Die Auswahl kann mit `?leistung=automatisierung` vorbelegt werden. Ohne JavaScript bleibt ein direkter E-Mail-Link verfügbar.

## Noch offene Angaben vor einer Veröffentlichung

Im Ausgangsrepo fehlen Geschäftsanschrift, Postleitzahl, Telefonnummer und Angaben zur Umsatzsteuer. Auch die rechtliche Prüfung des Datenschutztexts ist als offen markiert. Diese Angaben wurden nicht erfunden. Das bestehende `npm run pruefen` schlägt deshalb weiterhin an; der Produktionsbau für eine lokale Vorschau ist davon getrennt. Auf der Kontaktseite wird eine fehlende Telefonnummer nicht als defekter Telefonlink angeboten.

Die Prüfergebnisse und ihre Grenzen stehen in `docs/verification.json`. Visuelle Vorschauen: `docs/preview-desktop.webp`, `docs/preview-mobile.webp` und `docs/preview-full.webp`.

Die bestehende Railway-Konfiguration deployt `npm run build`. Deshalb ist die gesonderte Prüfung vor einem Merge/Livegang notwendig. Das Redesign wird auf einem separaten Review-Branch vorbereitet; die Live-Seite wird dadurch nicht verändert.
