# Hareb Digital — harebdigital.de

Die Agenturseite. Deutsch, lokal, statisch ausgeliefert.

Getrennt vom Portfolio unter [issahareb.me](https://issahareb.me): das eine
verkauft **Issa** an Firmen (englisch, Entwicklerprofil), das hier verkauft
**Websites** an Unternehmen im Ruhrgebiet. Zwei Zielgruppen, zwei Sprachen,
zwei Suchintentionen — eine Seite kann das nicht.

## Aufbau

Next.js 15 App Router mit `output: "export"` — beim Build entstehen fertige
HTML-Dateien. Kein Server, kein Nachladen, läuft auf jedem Hoster.

```
/                                Startseite
/webdesign-essen                 lokaler Hauptbegriff
/website-erstellen-lassen        kommerzielle Suchabsicht
/landingpage-erstellen-lassen
/ki-agenten-fuer-unternehmen     der Vorsprung gegenüber lokalen Agenturen
/referenzen · /kontakt · /impressum · /datenschutz
```

Jede Leistung hat eine **eigene URL** mit eigenem Titel und eigener
Beschreibung. Das ist der Unterschied zur Vorgängerseite, die alles hinter
Ankern (`#leistungen`) versteckt hatte: Anker ranken nicht einzeln.

## Texte ändern

Alles steht in `content/site.ts`. Die Komponenten enthalten keine Inhalte.

## Vor dem Livegang

```bash
npm run pruefen
```

Bricht ab, solange irgendwo `PLATZHALTER` steht — Anschrift, Telefon,
E-Mail, USt-ID. Die Vorgängerseite hatte Platzhalter im Code mit einem
Kommentar „vor dem Livegang ersetzen"; ein Kommentar hält niemanden auf,
eine Prüfung schon.

**Die Datenschutzerklärung ist ein Gerüst**, kein fertiger Text. Sie deckt den
aktuellen Stand ab — keine Cookies, keine Analyse, keine fremden Schriften,
kein Formular. Sobald etwas davon dazukommt, gehört sie erweitert und von
jemandem geprüft, der dafür haftet.

## Befehle

```bash
npm run dev         # Entwicklung
npm run build       # statischer Export nach out/
npm run build:live  # Platzhalter-Prüfung + Build
npm run bilder      # Projektbilder aus dem Portfolio neu optimieren
```

## Bilder

`scripts/bilder-optimieren.mjs` holt die Projektbilder aus dem Portfolio-Repo
und schreibt AVIF + WebP nach `public/projekte/`. Beim ersten Lauf:
**9,72 MB → 0,61 MB**. Auf einem Portfolio fallen 2-MB-Screenshots kaum auf —
hier ist Ladezeit das Verkaufsargument gegen Agenturen, die WordPress mit
zwanzig Plugins ausliefern.

## Was bewusst NICHT übernommen wurde

Aus dem Portfolio: `scene.tsx`, `tech-orbs.tsx`, `lukas-brain.tsx`,
`cinematic-intro.tsx`, `preloader.tsx`. WebGL-Szenen und ein Intro-Film sind
auf einem Portfolio richtig — dort will man beeindrucken. Auf einer Seite, die
ranken und Anfragen erzeugen soll, kosten sie genau die Ladezeit, mit der hier
geworben wird.

Aus der alten Landingpage: die vier erfundenen Kundenstimmen. Stattdessen
echte Projekte mit den Beschreibungen aus dem Portfolio.
