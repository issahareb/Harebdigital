# Interaktive Homepage

Die deutsche Homepage verbindet fünf neue Elemente in der bestehenden Creme-/Lime-Gestaltung:

- Eine Zielauswahl verändert eine bedienbare Website-Vorschau für Anfragen, Termine und Verkauf.
- Eine Handwerkerdemo bietet vier Bereiche mit abhängigen Leistungen, Leistungsdauer, animierten Auswahlmenüs, Kalender, Uhrzeit, Kontaktdaten, Einsatzadresse, Notiz, Zusammenfassung und Bearbeitung früherer Schritte. Nach Abschluss laufen eine Dashboard-Simulation und eine Bestätigungsvorschau durch.
- Ein Designbereich bietet drei eigene Konzeptvarianten, Desktop-/Handybreite, einen Lime-Schalter und bedienbare Navigation. Die bestehende Videogalerie bleibt erhalten.
- Ein Projektkonfigurator übernimmt Branche, Ziel, Funktionen und optionale Notizen in das echte Kontaktformular. Erst dessen bewusste Übermittlung sendet eine Anfrage. Der URL-Parameter ist auf 1.800 Zeichen begrenzt.
- Ein scrollabhängiger Lichtfaden verbindet die Abschnitte und reagiert dezent auf Interaktion. Er verwendet einen passiven Scroll-Listener und bedarfsgesteuertes requestAnimationFrame statt einer Dauerschleife.

## Demo-Grenzen

Die Handwerkerdemo speichert und versendet keine Eingaben. Sie erzeugt keine Termine oder E-Mails. Der Demo-Formularbereich ist vom bestehenden Formulartracking ausgenommen und meldet keinen Lead-Erfolg. Verfügbarkeiten sind ausdrücklich simuliert: nächste 60 Tage, Montag bis Freitag, nur Termine nach dem aktuellen Tag, maximal bis 17 Uhr. Nach einem Leistungs- oder Datumswechsel wird die Zeitauswahl gelöscht. Die Dauer berücksichtigt jede angebotene Leistung.

## Bedienung und Prüfung

Die animierten Listboxen unterstützen Pfeiltasten, Home/End, Buchstabensuche, Escape und Schließen bei Außenklick. Der Kalender bietet Monatswechsel, deaktivierte vergangene Tage/Wochenenden und Pfeiltastennavigation. Reduzierte Bewegung deaktiviert Verschiebungen und CSS-Übergänge.

- Produktionsbuild mit Next.js und TypeScript bestanden.
- `node scripts/check-booking-demo.mjs`: Tagesgrenzen, Wochenenden, Jahreswechsel, Leistungsdauer, verfügbare Zeitfenster, Übergabe und Begrenzung des Projektbriefs sowie Demo-Isolation bestanden.
- Bestehende Consent- und Scrollfilm-Prüfungen bestanden.
- Browserprüfung am statischen Produktionssnapshot: Zielwechsel, abhängige Leistungsdauer, Kalender, Sperrzeiten, ungültige E-Mail, vollständige Buchung bis zur simulierten Bestätigung, Designwechsel, 330-Pixel-Handyvorschau, Vorschaumenü und Übernahme der Projektzusammenfassung ins Kontaktformular durchgeführt.

Die verwaltete Vorschau startet Next.js mit nicht unterstützten Vite-Argumenten. Daher wurde der unveränderte Produktionsbuild für die Browserprüfung als statischer Snapshot mit seinen JS-/CSS-Dateien bereitgestellt. Bildoptimierungs- und Serverendpunkte sind darin nicht verfügbar; echte Formularsendungen werden bei dieser Prüfung nicht ausgelöst. Eine Prüfung auf einem physischen iPhone und eine neue Lighthouse-Messung sind nicht enthalten.
