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

/*
 * ACHTUNG — das ist ein GERÜST, keine fertige Datenschutzerklärung.
 *
 * Der Text stand vorher schon hier und deckte eine Seite ab, die nichts tat
 * ausser Inhalte auszuliefern: keine Cookies, keine Analyse, keine fremden
 * Schriften, kein Formular. Mit der Landingpage aus dem Portfolio stimmt das
 * an drei Stellen nicht mehr, und alle drei stehen jetzt unten:
 *
 *   1. Der Sprachschalter setzt einen Keks (`hd-sprache`). Er ist
 *      zustimmungsfrei nach § 25 Abs. 2 Nr. 2 TTDSG — er speichert eine
 *      Einstellung, die der Besucher selbst vorgenommen hat —, aber er ist da,
 *      und ein Satz "diese Seite setzt keine Cookies" wäre schlicht falsch.
 *   2. Die Seite wird bei jedem Aufruf gerendert, weil sie den
 *      Accept-Language-Kopf liest. Der Kopf wird ausgewertet und nicht
 *      gespeichert; das gehört trotzdem dazu.
 *   3. Vier Schriftfamilien von Google Fonts — von `next/font` beim Build
 *      heruntergeladen und von dieser Domain ausgeliefert, es geht also keine
 *      Anfrage des Besuchers an Google. Genau deshalb ist es erwähnenswert.
 *
 * Sobald etwas dazukommt — ein Kontaktformular, das Lukas-Widget, Analyse,
 * eine Kartenansicht — muss dieser Text erweitert werden, und dann gehoert er
 * von jemandem geprueft, der dafuer haftet. Ich bin das nicht.
 */
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
              Die Seite erscheint in der Sprache Ihres Browsers. Dafür wird der von Ihrem Browser
              mitgesendete Kopf <em>Accept-Language</em> ausgewertet; er wird nicht gespeichert.
              Stellen Sie die Sprache über den Schalter selbst um, wird Ihre Wahl in einem Cookie
              namens <code>hd-sprache</code> abgelegt (Laufzeit ein Jahr, Inhalt: <code>de</code>,{' '}
              <code>en</code> oder <code>es</code>). Das Cookie ist für die von Ihnen ausdrücklich
              gewünschte Funktion erforderlich und deshalb nach § 25 Abs. 2 Nr. 2 TTDSG
              einwilligungsfrei. Es verfolgt niemanden und wird an niemanden übermittelt; Sie
              können es jederzeit in Ihrem Browser löschen.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Keine Analyse, keine fremden Server">
            <p>
              Diese Seite bindet keine Analysedienste, keine Werbenetzwerke und keine Inhalte
              fremder Anbieter ein. Die verwendeten Schriften (Source Sans 3, League Spartan,
              Anton, Oswald) stammen ursprünglich von Google Fonts, werden aber beim Erstellen der
              Seite heruntergeladen und von dieser Domain ausgeliefert — Ihr Browser stellt
              deshalb keine Anfrage an Google. Bilder und Filme liegen ebenfalls auf dieser Domain.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Kontaktaufnahme">
            <p>
              Schreiben Sie uns eine E-Mail oder rufen Sie an, verarbeiten wir Ihre Angaben zur
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Ein Kontaktformular gibt es auf dieser Seite
              nicht.
            </p>
          </Rechtsabschnitt>

          <Rechtsabschnitt titel="Ihre Rechte">
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei
              einer Aufsichtsbehörde.
            </p>
          </Rechtsabschnitt>
        </div>
      </div>
    </HdUnterseite>
  )
}
