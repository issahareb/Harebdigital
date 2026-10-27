import type { Metadata } from 'next'
import { HdUnterseite, Rechtsabschnitt } from '@/components/hd-unterseite'
import { marke } from '@/lib/marke'
import { sprache } from '@/lib/sprache'

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${marke.name}`,
  description: `Informationen zur Datenverarbeitung auf hareb.digital und bei der Kontaktaufnahme mit ${marke.name}.`,
  alternates: { canonical: '/datenschutz/' },
  robots: { index: false, follow: true },
}

export default async function Datenschutz() {
  return (
    <HdUnterseite lang={await sprache()}>
      <div lang="de">
        <h1 className="font-display text-4xl font-bold tracking-tight">Datenschutzerklärung</h1>
        <p className="mt-4 text-sm">Stand: 27. Oktober 2026</p>
        <div className="mt-10 max-w-2xl space-y-8">
          <Rechtsabschnitt titel="1. Verantwortlicher und Kontakt">
            <p>{marke.inhaber}, handelnd unter {marke.name}<br />{marke.strasse}<br />{marke.plz} {marke.ort}, Deutschland</p>
            <p>E-Mail: <a href={`mailto:${marke.kontaktEmail}`}>{marke.kontaktEmail}</a><br />Telefon: <a href={`tel:${marke.telefon.replace(/\s/g, '')}`}>{marke.telefon}</a></p>
            <p>Diese Hinweise beschreiben den Besuch von hareb.digital und die Bearbeitung von Anfragen an Hareb Digital. Die Geschäftsanschrift befindet sich in Sankt Augustin; der persönliche Arbeitsort ist Essen.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="2. Bereitstellung und Sicherheit der Website">
            <p>Die Website wird bei Railway Corporation gehostet. Beim Aufruf werden insbesondere IP-Adresse, Datum und Uhrzeit, angeforderte Adresse oder Datei, Antwortstatus, übertragene Datenmenge sowie die vom Browser übermittelten Geräte-, Browser- und gegebenenfalls Herkunftsangaben verarbeitet. Diese Daten sind erforderlich, um Inhalte auszuliefern, Fehler zu untersuchen und Angriffe abzuwehren.</p>
            <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist der sichere und zuverlässige Betrieb. Technische Daten werden nur so lange benötigt, wie dies für Bereitstellung, Fehleranalyse und Sicherheitsaufklärung erforderlich ist. Für einen konkreten Sicherheitsvorfall oder die Durchsetzung rechtlicher Ansprüche können relevante Daten länger benötigt werden. Die Verbindung zur Website ist mit TLS verschlüsselt.</p>
            <p>Informationen des Anbieters: <a href="https://railway.com/legal/privacy" className="underline">Railway Datenschutz</a> und <a href="https://railway.com/legal/dpa" className="underline">Auftragsverarbeitung</a>.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="3. Cookies, Sprachwahl, Schriften und Medien">
            <p>Die Sprache ergibt sich aus der URL. Der Sprachschalter speichert keine Auswahl in Cookies oder im dauerhaften Browserspeicher.</p>
            <div id="tiktok" className="space-y-3">
              <h3 className="font-bold">Optionale TikTok-Werbemessung</h3>
              <p>Nur nach gesonderter ausdrücklicher Einwilligung laden wir den TikTok Pixel zur Messung unserer Werbung. Empfänger ist TikTok Technology Limited, Irland, mit verbundenen Unternehmen und technischen Dienstleistern. Dabei können Seitenadresse, Seitenaufrufe, bestätigte Formularsendungen, Zeitstempel, IP-Adresse, Geräte- und Browserinformationen sowie Cookie-Kennungen an TikTok übermittelt und mit Anzeigenkontakten bzw. einem TikTok-Konto zusammengeführt werden. Eine Verarbeitung außerhalb der EU bzw. des EWR, auch in den USA, ist möglich. Namen, E-Mail-Adressen, Telefonnummern und Nachrichtentexte aus unserem Formular übermitteln wir nicht als Ereignisdaten; der erweiterte Abgleich von E-Mail-Adresse und Telefonnummer ist deaktiviert.</p>
              <p>Die Einwilligung ist unabhängig von unserer eigenen Website-Analyse. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ohne Zustimmung wird der TikTok-Code nicht geladen. Die Entscheidung mit Zeitstempel wird unter hd-tiktok-consent-v1 im lokalen Browserspeicher gespeichert. Über „TikTok-Einstellungen“ können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Do Not Track und Global Privacy Control verhindern die Aktivierung. Das Kontaktformular funktioniert auch ohne Werbemessung. Eine bestätigte Formularsendung ist noch keine inhaltlich qualifizierte Projektanfrage.</p>
              <p>Informationen zu Cookies, Speicherdauer, Empfängern, internationalen Übermittlungen und Ihren Rechten: <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/de" className="underline">TikTok-Datenschutzerklärung</a> und <a href="https://www.tiktok.com/legal/page/global/tiktok-website-cookies-policy/en" className="underline">TikTok-Cookie-Richtlinie</a>.</p>
            </div>
            <p>Nur nach ausdrücklicher Zustimmung erfassen wir mit einer eigenen Website-Analyse Seitenaufrufe, aktive Verweildauer, betrachtete Abschnitte, Scrolltiefe und Scrollstopps, Klickpositionen und Ziele ohne URL-Parameter, Videonutzung sowie Formularbeginn, Feldkennungen, Fehler, Sendeversuche und bestätigte Sendungen. Abbrüche werden nach 30 Minuten Inaktivität abgeleitet. Eingegebene Inhalte, Namen, E-Mail-Adressen und Chatnachrichten werden nicht in diese Analyse übernommen. Es gibt keine Zusammenführung mit Kontaktanfragen oder Besuchen anderer Websites.</p>
            <p>Eine zufällige pseudonyme Besuchs-ID wird in sessionStorage gespeichert und nach 30 Minuten Inaktivität erneuert. Ihre Einwilligungsentscheidung wird unter site-consent im lokalen Browserspeicher hinterlegt. Die Messdaten sind nur im geschützten LUKAS-Dashboard zugänglich, das bei Railway in den USA gehostet wird. Sie werden nach 90 Tagen bei der nächsten Datenannahme gelöscht. Zur Missbrauchsabwehr verarbeitet der Website-Server die IP-Adresse vorübergehend im Arbeitsspeicher, übermittelt sie aber nicht als Analysefeld an das Dashboard.</p>
            <p>Rechtsgrundlage der optionalen Analyse ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Über „Analyse-Einstellungen“ können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Do Not Track und Global Privacy Control werden berücksichtigt. Ohne Zustimmung funktioniert die Website unverändert.</p>
            <p>Schriften, Bilder und Videos werden von dieser Website ausgeliefert. Die Schrift Manrope wird beim Erstellen der Website bezogen und lokal bereitgestellt; beim Seitenbesuch erfolgt dafür keine Verbindung zu Google Fonts. Die abgebildeten KI-Antworten sind lokal gespeicherte Bilder. Sie übertragen keine Besucherdaten an einen KI-Anbieter.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="4. Kontaktformular und E-Mail">
            <p>Wenn Sie Kontakt aufnehmen, verarbeiten wir die von Ihnen mitgeteilten Daten, insbesondere Name, E-Mail-Adresse, gewünschte Leistung, Nachricht und gegebenenfalls weitere Projekt- oder Kontaktdaten. Zweck ist, Ihr Anliegen zu beantworten und eine mögliche Zusammenarbeit vorzubereiten oder durchzuführen.</p>
            <p>Beim Absenden des Formulars werden Ihre Angaben verschlüsselt an den Server dieser Website übertragen und über Resend als E-Mail ausschließlich an {marke.kontaktEmail} weitergeleitet. Das Formular legt keine eigene Datenbank mit Ihren Nachrichten an. Erst nach Bestätigung der Annahme durch den Versanddienst wird eine Erfolgsmeldung angezeigt. Die anschließende Bearbeitung im Postfach und mit LUKAS ist nachfolgend beschrieben.</p>
            <p>Für unsere E-Mail-Kommunikation nutzen wir Apple iCloud Mail. Bei über Resend versandten Nachrichten verarbeitet Resend (Plus Five Five, Inc.) Empfänger- und Absenderadresse, Betreff, Nachrichteninhalt sowie technische Zustellinformationen. Resend wird für den Versand der Formularanfragen eingesetzt. Zur Abwehr von Missbrauch werden eine versteckte Formularprüfung und eine Begrenzung der Anfragen verwendet. Dafür wird ein Hashwert der IP-Adresse mit einem Zähler für bis zu 15 Minuten berücksichtigt; abgelaufene Einträge werden bei der nächsten Anfrage entfernt. Diese Daten werden nur im Arbeitsspeicher des Webservers gehalten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse ist der Schutz vor Spam und missbräuchlichem Versand.</p>
            <p>Bei Anfragen zu einem Vertrag oder vorvertraglichen Maßnahmen ist die Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO. Für sonstige Anfragen ist es Art. 6 Abs. 1 lit. f DSGVO, mit dem berechtigten Interesse an einer geordneten Kommunikation. Ihre Angaben sind freiwillig; ohne ausreichende Kontaktdaten und Angaben zum Anliegen können wir gegebenenfalls nicht antworten. Bitte übermitteln Sie nur die für Ihr Anliegen notwendigen Informationen.</p>
            <p>Weitere Informationen: <a href="https://www.apple.com/legal/privacy/de-ww/" className="underline">Apple Datenschutz</a>, <a href="https://resend.com/legal/privacy-policy" className="underline">Resend Datenschutz</a> und <a href="https://resend.com/legal/dpa" className="underline">Resend Auftragsverarbeitung</a>.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="5. KI-gestützte Bearbeitung mit LUKAS und Telefonkontakt">
            <p>Issa Hareb bearbeitet Anfragen mit Unterstützung des eigenen KI-Assistenten LUKAS. Hierzu können Kontaktdaten, Nachrichten und bisheriger Gesprächskontext im System gespeichert, zugeordnet, zusammengefasst und für Antwortentwürfe verarbeitet werden. LUKAS ist Software und kein zusätzlicher Mitarbeiter. Für die KI-Verarbeitung wird die OpenAI-API eingesetzt; dafür können die zur Bearbeitung übergebenen Inhalte an OpenAI Ireland Ltd. und deren technische Dienstleister übermittelt werden.</p>
            <p>Über die angegebene Telefonnummer kann LUKAS Anfragen entgegennehmen. Für die Telefonverbindung wird Telnyx eingesetzt. Dabei werden Rufnummer, Verbindungszeit und Verbindungsdauer sowie die Gesprächsinhalte zur Sprachverarbeitung verarbeitet. Aus dem Gespräch können Transkripte, Zusammenfassungen und Kontaktnotizen für die weitere Bearbeitung entstehen. Diese Verarbeitung ist vom bloßen Besuch der Website getrennt.</p>
            <p>Die Bearbeitung einer konkreten Vertrags- oder Projektanfrage erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO; die unterstützende Organisation und Zuordnung von Anfragen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse ist eine erreichbare, nachvollziehbare und effiziente Bearbeitung. Beim bloßen Besuch dieser Website findet keine ausschließlich automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung im Sinne von Art. 22 DSGVO statt. Für Fragen zur KI-Verarbeitung und zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte Kontaktadresse.</p>
            <p>Weitere Informationen: <a href="https://openai.com/policies/data-processing-addendum/" className="underline">OpenAI Auftragsverarbeitung</a>, <a href="https://telnyx.com/privacy-policy" className="underline">Telnyx Datenschutz</a> und <a href="https://telnyx.com/legal/data-processing-addendum" className="underline">Telnyx Auftragsverarbeitung</a>.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="6. Empfänger und Verarbeitung außerhalb der EU">
            <p>Inhaltlich werden Ihre Anfragen durch Issa Hareb und das von ihm eingesetzte LUKAS-System bearbeitet. Zusätzlich verarbeiten die in diesen Hinweisen genannten Hosting-, Kommunikations- und KI-Dienstleister die für ihre jeweilige Funktion erforderlichen Daten. Ihre Anfrage wird nicht an Taxi B&amp;B Essen oder andere Kunden von Hareb Digital zur Bearbeitung weitergegeben.</p>
            <p>Bei den genannten internationalen Anbietern kann eine Verarbeitung außerhalb der EU bzw. des EWR, insbesondere in den USA, stattfinden. Die Anbieter beschreiben die dafür vorgesehenen Schutzmechanismen in den verlinkten Datenschutz- und Auftragsverarbeitungsbedingungen. Dazu gehören EU-Standardvertragsklauseln gemäß Art. 46 DSGVO und, soweit für den jeweiligen Empfänger anwendbar, Angemessenheitsbeschlüsse gemäß Art. 45 DSGVO. Informationen zu den für Ihre Anfrage einschlägigen Empfängern und Garantien können Sie über die oben genannte Kontaktadresse anfordern.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="7. Speicherdauer">
            <p>Für Anfragen, E-Mails und die zugehörigen LUKAS-Einträge richtet sich die notwendige Speicherdauer nach der Bearbeitung Ihres Anliegens, einer anschließenden Zusammenarbeit und möglichen Rückfragen. Entfällt der Zweck, sind die Daten zu löschen, sofern keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen. Bei Vertrags-, Geschäfts- und steuerlich relevanten Unterlagen können gesetzliche Pflichten eine weitere Aufbewahrung erfordern; deren Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO. Auch die Geltendmachung oder Abwehr konkreter Rechtsansprüche kann eine begrenzte weitere Speicherung erfordern.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="8. Ihre Rechte">
            <p>Unter den jeweiligen gesetzlichen Voraussetzungen können Sie Auskunft über Ihre Daten, deren Berichtigung oder Löschung, die Einschränkung der Verarbeitung und Datenübertragbarkeit verlangen. Soweit eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bisherigen Verarbeitung bleibt davon unberührt.</p>
            <p>Bei einer Verarbeitung nach Art. 6 Abs. 1 lit. f DSGVO können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch einlegen. Einer Verarbeitung für Direktwerbung können Sie jederzeit widersprechen. Wenden Sie sich für die Ausübung Ihrer Rechte an {marke.kontaktEmail}.</p>
            <p>Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere am Ort Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des vermuteten Verstoßes. Für Nordrhein-Westfalen: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf, <a href="https://www.ldi.nrw.de/" className="underline">www.ldi.nrw.de</a>.</p>
          </Rechtsabschnitt>
          <Rechtsabschnitt titel="9. Verlinkte Angebote">
            <p>Links zu unserem Portfolio, Projektwebsites, sozialen Netzwerken und KI-Diensten öffnen eigenständige Angebote. Erst beim Aufruf dieser Angebote entstehen Verbindungen zu deren Betreibern; dort gelten die jeweiligen Datenschutzhinweise. Diese Erklärung gilt für hareb.digital und die hier beschriebene Kommunikation mit Hareb Digital.</p>
          </Rechtsabschnitt>
        </div>
      </div>
    </HdUnterseite>
  )
}
