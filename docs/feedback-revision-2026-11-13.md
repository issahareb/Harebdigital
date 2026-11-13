# Überarbeitung nach visueller Rückmeldung

## Umgesetzt

- Zielauswahl nebeneinander, auch mobil; sichtbare Auswahlflächen und Zustände. Leerzeichen nach dem mobilen Überschriftsumbruch korrigiert.
- Vorschauen mit unterschiedlichen Funktionen: Anfragekonzept, Kalender mit Tag-/Zeitauswahl, Shop mit drei Objekten und Demo-Warenkorb. „Produkt ausprobieren“ entfernt.
- Telefonsektion neu geordnet: klare Leistungsbeschreibung, hervorgehobener Anruftest, sichtbare Kanalwahl, anklickbare Telefonnotizen mit Anliegen.
- Terminort zwischen Kunde und Filiale wählbar. Die Kundenadresse ist nur bei einem Außentermin erforderlich. Überblick und Dashboard verwenden den gewählten Ort.
- TENSA und TikTok verwenden einen gemeinsamen Player für stummes Autoplay in der mittleren Bildschirmhälfte. Motion-Beispiel und Werkschau verwenden ebenfalls diesen Sichtbarkeitsbereich. Nutzerpause, versteckter Tab, reduzierte Bewegung und Datensparmodus bleiben berücksichtigt.
- Angebotsauswahl als vier feste Flächen, mobil 2×2. Kein horizontaler Auswahlstreifen und keine wechselnde Ausrichtung der Vorschaubilder.
- Alte „DESIGN → BUILD / Made to fit“-Grafik durch eine bedienbare Desktop-/Mobilansicht ersetzt.
- Abdunklung der Umgebung der Werkschau wieder aktiviert und eine eigene Stapelreihenfolge für die Galerie ergänzt.
- Vorhandenes Marken-Motionvideo und vorhandene TikTok-Kampagne direkt auf den beiden passenden Leistungsseiten eingebunden.
- Sichtbare Unicode-Pfeile und das Hamburger-Textzeichen in aktiven JSX-Dateien durch Lucide-SVGs ersetzt; alle Seiten und Komponenten durchsucht.
- Neues großes, gefaltet einfahrendes Menü mit gestaffelten Verweisen und Lime-Fläche. Auch auf Desktop aufrufbar, native Dialog-Fokusbegrenzung und Escape bleiben erhalten.
- Tastaturauswahl beginnt bei der ersten verfügbaren Option, auch wenn die erste Uhrzeit belegt ist.

## Noch blockiert

Der neue Hero wurde als 10-sekündiger materialbetonter Higgsfield-Film mit Creme, Glas, Silber und Lime angefragt, ohne Tunnel, Kabel und Text. Higgsfield hat die Generierung wegen fehlender Credits abgelehnt; kein Job wurde angelegt. Request-ID: 29979c0f-6c7a-4d65-afcc-9a5edc58862e. Der vorhandene Hero bleibt bis zum verfügbaren Ersatz unverändert. Keine automatische Aufladung und kein Kauf wurden ausgelöst.

## Prüfung

Next.js-Produktionsbuild und TypeScript bestanden. Bestehende Buchungsregeln bestehen. Browserprüfung am statischen Produktionssnapshot: Shop-Auswahl und Warenkorb sowie Filialauswahl ohne Kundenadressfeld geprüft. Keine echten Anfragen versendet. Snapshot-Vorschau stellt Next-Bildoptimierung nicht bereit.
