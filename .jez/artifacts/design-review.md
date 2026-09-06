# Design Review: Hareb Digital

**Datum**: 2026-09-06
**URL**: http://localhost:8080/ (entspricht hareb.digital)
**Geprüft**: Desktop 1600×950, iPhone 13 (390×844, dpr 3), iPhone SE (320)

## Gesamteindruck

Sauber und mit erkennbarer Haltung. Der Wechsel zwischen dunklem und hellem
Grund trägt die Seite, das Türkis ist der einzige Akzent und wird nicht
verwässert. Die Befunde sind Detailarbeit, keine strukturellen Fehler — die
Ausnahme waren die Tippziele.

## Befunde

### Hoch

- **Tippziele unter 44 px** auf dem Telefon, 19 Stück — Sprachschalter (28×28),
  Verweise im Kartenmenü (32 hoch), Galerie-Punkte (18×8), Fußzeile (24 hoch),
  Markenzeichen (28 breit). → **Behoben.** Unsichtbare Fangfläche per `::after`
  statt größerer Darstellung: das Ziel wächst, das Aussehen bleibt.
  Nachgemessen 19 → 3; die verbliebenen drei sind die Sprachtasten mit 42×46,
  also ein bis zwei Pixel unter der Breite, nebeneinanderliegend.

### Mittel

- **Asymmetrischer Abschnittsabstand** bei `#leistungen`: 96 px oben, 16 px
  unten, während jeder andere Abschnitt symmetrisch läuft (96/96, mobil
  64/64). Bricht den senkrechten Rhythmus an genau einer Stelle. → offen
- **Zwei Kartenradien im Umlauf**: 12 px (Laufband) und 14 px (`hd-surface`,
  `hd-shot`). Beides ist begründet gewachsen, aber eine Familie wäre ruhiger.
  → offen

### Niedrig

- Der Vorspann auf der Bühne steht über Bewegtbild; ein Kontrastwert lässt
  sich dafür nicht berechnen. Er trägt Schlagschatten und volle Tinte auf
  88 %, geprüft wurde nur visuell.

## Gemessene Kontraste

Über eine Leinwand gerechnet, nicht geschätzt — `oklch()` und `color-mix()`
lassen sich nicht per Regex lesen, ein erster Anlauf lieferte dadurch zwei
Falschmeldungen.

| Stelle | Kontrast | Schwelle | |
|---|---|---|---|
| Kicker dunkel | 11,78 | 4,5 | ok |
| Kicker hell | 4,74 | 4,5 | ok |
| Fließtext hell | 5,32 | 4,5 | ok |
| Fließtext dunkel | 7,36 | 4,5 | ok |
| Laufband-Satz | 7,36 | 4,5 | ok |
| Fußzeile | 7,36 | 4,5 | ok |
| Zahl auf Papier | 4,74 | 3,0 | ok |

## Was gut ist

- **Ein Akzent, konsequent.** Türkis trägt Kicker, Zahlen, Linien und Hover —
  und nichts sonst. Auf hellem Grund ist derselbe Ton so weit heruntergezogen,
  dass er 4,5:1 knapp hält.
- **Der Grundwechsel als Takt.** Film und Bilder im Dunkeln, Lesestrecken auf
  Papier, Schluss zurück ins Dunkle.
- **Eine Fluchtlinie.** Bühne und alle Abschnitte beginnen auf derselben
  Kante, nachdem die Bühne den 72rem-Kasten der Abschnitte übernommen hat.
- **Umbrüche geregelt**: `text-balance` auf Überschriften, `text-pretty` auf
  Fließtexten.

## Die drei nächsten Schritte

1. `#leistungen` auf symmetrischen Abstand bringen (96/96 statt 96/16)
2. Kartenradius auf einen Wert vereinheitlichen — 14 px für alle Flächen
3. Sprachtasten auf volle 44 px Fangbreite, damit die letzten drei fallen
