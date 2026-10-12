import type { Metadata } from 'next'
import { HdUnterseite, Rechtsabschnitt } from '@/components/hd-unterseite'
import { marke } from '@/lib/marke'
import { sprache } from '@/lib/sprache'

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${marke.name}`,
  description: `Datenschutzerklärung von ${marke.name}.`,
  alternates: { canonical: '/datenschutz/' },
  robots: { index: false, follow: true },
}

/* Legal review remains outstanding. Keep this notice until reviewed. */
export default async function Datenschutz() {
  return (
    <HdUnterseite lang={await sprache()}>
      <div lang="de">
        <h1 className="font-display text-4xl font-bold tracking-tight">Datenschutzerklärung</h1>

        <div className="mt-10 max-w-2xl space-y-8">
          <p className="hd-surface p-4 text-sm text-[color:var(--hd-ink-soft)]">
            PLATZHALTER_RECHTSPRUEFUNG — dieser Text ist ein Gerüst für den aktuellen Stand der
            Seite und muss vor dem Livegang geprüft und ergänzt werden.
          </p>

          <Rechtsabschnitt titel="Verantwortlicher">
            <p>
              {marke.name}, {marke.inhaber}
              <br />
              {marke.strasse}, {marke.plz} {marke.ort}
              <br />
              {marke.email}
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Server-Logdateien">
            <p>
              Beim Abruf dieser Seite verarbeitet der Hoster technisch notwendige Daten wie
              IP-Adresse, Zeitpunkt, abgerufene Datei und übermittelnden Browser. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO — das berechtigte Interesse am sicheren und
              störungsfreien Betrieb.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Sprachwahl">
            <p>
              Die Sprachversion ergibt sich aus der aufgerufenen Adresse: Deutsch unter der
              Startadresse, Englisch unter /en/ und Spanisch unter /es/. Der Sprachschalter führt
              auf die entsprechende Seite. Es werden dafür keine Cookies gesetzt und keine
              Browser-Sprachangaben ausgewertet.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Keine Analyse, keine fremden Server">
            <p>
              Diese Seite bindet keine Analysedienste, keine Werbenetzwerke und keine Inhalte
              fremder Anbieter ein. Die verwendete Schrift Manrope stammt
              ursprünglich von Google Fonts, wird aber beim Erstellen der Seite heruntergeladen und
              von dieser Domain ausgeliefert — Ihr Browser stellt deshalb keine Anfrage an Google.
              Bilder und Filme liegen ebenfalls auf dieser Domain.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Kontaktaufnahme">
            <p>
              Schreiben Sie uns eine E-Mail oder rufen Sie an, verarbeiten wir Ihre Angaben zur
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen. Rechtsgrundlage ist Art.
              6 Abs. 1 lit. b bzw. lit. f DSGVO. Das Anfrageformular bereitet lokal eine E-Mail vor
              und öffnet Ihr E-Mail-Programm. Die Eingaben werden erst übermittelt, wenn Sie die
              E-Mail dort selbst absenden; die Website versendet sie nicht.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Ihre Rechte">
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer
              Aufsichtsbehörde.
            </p>
          </Rechtsabschnitt>
        </div>
      </div>
    </HdUnterseite>
  )
}
