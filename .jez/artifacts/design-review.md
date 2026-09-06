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
  64/64). Bricht den senkrechten Rhythmus an genau einer Stelle. →
  **Behoben.** Der Kopfblock steht jetzt auf `py-16 sm:py-24`, und der
  `pt-8` der Kachelliste darunter ist weg — sonst hätte die Symmetrie oben
  einen doppelten Abstand in der Mitte erkauft.
- **Zwei Kartenradien im Umlauf**: 12 px (Laufband) und 14 px (`hd-surface`,
  `hd-shot`). Beides ist begründet gewachsen, aber eine Familie wäre ruhiger.
  → **Behoben.** `hd-band__satz`, `hd-feld` und die Galeriekarte (die mit 16
  noch einen dritten Wert hatte) stehen auf 14. Bedienelemente bleiben voll
  gerundet, die kleinen Kartenmenü-Flächen bei 10 — das ist die
  Steuerungsfamilie und nicht die Flächenfamilie.

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

## Nachtrag: der Abschnitt "Was ich verstanden habe"

Dazugekommen nach dem Review, deshalb hier eigens geprüft.

**Gemessen**

- Waagerechter Überlauf 1440 und 390: 0 px, über die ganze Seite gescrollt.
- Konsolenfehler beim Durchscrollen: keine, in beiden Breiten.
- Kontraste im hellen Akt, auf dem Grund gerechnet, den das Bild mitbringt:
  Wort 7,4:1 auf dem Textband und 4,7:1 auf dem Wortband (Großschrift,
  Schwelle 3), Fließtext 5,3:1 bzw. am untersten Rand 4,9:1, Balken 4,9:1.
  Der erste Entwurf lag beim Fließtext auf 4,4 — knapp unter der Schwelle
  ist darunter, `--hd-ink-soft` ist deshalb auf `#282e37` nachgezogen.
- Filme: laufen ausschließlich, solange sie sichtbar sind (an der Deckkraft
  geschaltet, nicht am Akt). Im dritten Akt stehen beide still.
- Reduzierte Bewegung: eigene Fassung ohne Bühne, drei Blöcke, ein Standbild.
  Kein Abgleichsfehler mehr, seit die Umschaltung erst nach der Montage
  passiert.

**Drei Fallen, die dabei aufgegangen sind** — alle drei so, dass sie beim
Ansehen wie Geschmacksfragen aussahen und keine waren:

1. Motion baut aus einer scrollgebundenen Umrechnung eine WAAPI-Animation.
   Stützstellen außerhalb von 0…1 nimmt die Schnittstelle nicht an und wirft
   dabei die ganze Seite ab. Und wo die Liste nicht bei 0 anfängt und bei 1
   aufhört, läuft der Browser vom letzten Wert zurück zum ersten statt zu
   halten — der erste Akt stand am Ende der Strecke wieder quer über der
   Statue.
2. `mix-blend-mode` sieht jeden Stapelkontext darüber als Wand. Die
   Motivebene hatte einen `z-index`, also mischten sich die Filme mit dem
   Nichts in ihrer eigenen Ebene statt mit der Bühne: sichtbar als dunkler
   Kasten um jeden Film, nachgemessen (6,7,9) innen gegen (10,12,15) außen.
   Ohne `z-index` sind beide Werte gleich.
3. Gleiche Parameterschritte sind auf einer Lemniskate keine gleichen
   Abstände. Ohne Tabellierung der Bogenlänge drängeln sich die Ziffern an
   der Kreuzung und die Bäuche reißen auf — das Zeichen las sich als X.

## Die zwei nächsten Schritte

1. Sprachtasten auf volle 44 px Fangbreite, damit die letzten drei Tippziele
   fallen
2. Eigene Adressen je Sprache samt hreflang — der eine offene Punkt, der
   nicht Gestaltung ist, sondern Architektur (siehe `app/layout.tsx`)
