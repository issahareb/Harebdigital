import Link from 'next/link'
import { HOSTING_COPY } from '@/lib/hosting-copy'

const questions = [
  {
    question: 'Was kostet es, eine Website erstellen zu lassen?',
    answer: 'Entscheidend sind der Umfang der Seiten, vorhandene Texte und Bilder sowie die benötigten Funktionen. Eine kompakte Landingpage hat einen anderen Aufwand als eine mehrsprachige Unternehmenswebsite mit Buchungsanfragen. Nach der Abstimmung erhältst du ein Angebot mit festem Preis für den vereinbarten Umfang. Hosting, Domain und laufende Betreuung werden separat geklärt.',
  },
  {
    question: 'Muss ich Texte und Bilder fertig mitbringen?',
    answer: 'Nein. Wir sichten vorhandenes Material und legen fest, welche Inhalte fehlen. Informationen zu deinen Leistungen und deinem Unternehmen kommen von dir; Struktur und Texte stimmen wir gemeinsam ab. Die Beschaffung oder Produktion zusätzlicher Bilder und Videos wird im Angebot berücksichtigt.',
  },
  {
    question: 'Kannst du Design und Programmierung übernehmen?',
    answer: 'Ja. Ich übernehme Konzeption, Webdesign und Webentwicklung. Wenn dein Projekt zusätzlich einen Kundenbereich, Schnittstellen oder komplexere Abläufe braucht, planen wir diese als individuelle Webanwendung. Du behältst denselben Ansprechpartner.',
  },
  {
    question: 'Wird meine Website bei Google gefunden?',
    answer: 'Ich bereite die technischen Grundlagen vor: verständliche Seitenstruktur, passende Seitentitel, interne Links und eine Sitemap. Nach dem Start lässt sich die Sichtbarkeit mit der Google Search Console messen. Eine bestimmte Platzierung oder eine feste Zahl an Anfragen kann ich nicht versprechen.',
  },
  {
    question: 'In welchen Regionen betreust du Websites?',
    answer: 'Ich arbeite aus Essen mit Unternehmen im Ruhrgebiet, im Raum Bonn und deutschlandweit. Entwürfe und Freigaben können digital abgestimmt werden. Der Geschäftssitz liegt in Sankt Augustin; vollständige Angaben findest du im Impressum.',
  },
  {
    question: 'Was passiert nach der Veröffentlichung?',
    answer: 'Du erhältst eine Übergabe der vereinbarten Funktionen. Wenn du deine Website bei mir hostest, betreue ich den Betrieb, die Wartung und die laufende Weiterentwicklung. So bleibt dein Auftritt auch nach dem Start technisch und gestalterisch aktuell. Leistungsumfang und laufende Kosten vereinbaren wir vorab.',
  },
  ...HOSTING_COPY.de.faq,
]

export function WebdesignDetails() {
  return <>
    <div className="service-detail-grid">
      <section data-track-section="webdesign-details-section-1">
        <span className="eyebrow">DEIN PROJEKTUMFANG</span>
        <h2>Welche Website braucht dein Unternehmen?</h2>
        <p>Für Dienstleister, Handwerksbetriebe und kleine Unternehmen zählt, dass Besucher schnell verstehen, was du anbietest und wie sie dich erreichen. Wir wählen den Umfang nach deinem Angebot.</p>
        <ul>
          <li><strong>Landingpage:</strong> eine klar gegliederte Seite für ein einzelnes Angebot, eine Kampagne oder den Start deines Unternehmens.</li>
          <li><strong>Unternehmenswebsite:</strong> eigene Seiten für Leistungen, Referenzen und Kontakt, damit Kunden passende Informationen direkt finden.</li>
          <li><strong>Website mit Funktionen:</strong> etwa Fahrtanfragen, Terminwünsche oder ein Verwaltungsbereich. Abläufe und Daten werden vor der Umsetzung gemeinsam geplant.</li>
        </ul>
        <p>Die aktuellen Einstiegspakete und ihre Konditionen findest du bei den <Link className="text-link" href="/#angebote">Website-Angeboten</Link>. Vor dem Start legen wir Seitenumfang, Funktionen und laufende Kosten schriftlich fest.</p>
        <p>Du hast schon eine Website? Ein <Link data-track-id="webdesign-details-link-2" className="text-link" href="/leistungen/website-ueberarbeiten/">Website-Relaunch</Link> kann sinnvoller sein als ein vollständiger Neubau.</p>
      </section>
      <section data-track-section="webdesign-details-section-3">
        <span className="eyebrow">VERÖFFENTLICHTES KUNDENPROJEKT</span>
        <h2>Webdesign für Taxi B&B Essen</h2>
        <p>Für Taxi B&B Essen habe ich eine Website mit mobilen Fahrtanfragen, einem geschützten Verwaltungsbereich und automatischen E-Mail-Benachrichtigungen umgesetzt. Das Projekt verbindet den öffentlichen Auftritt mit der Bearbeitung eingehender Anfragen.</p>
        <p>Die Fallstudie zeigt, wie Website und interner Ablauf zusammenpassen: von der Anfrage eines Fahrgasts bis zur Bearbeitung durch das Unternehmen.</p>
        <Link data-track-id="webdesign-details-link-4" className="text-link" href="/projekte/taxi-bb-essen/">Website und Buchungsanfragen von Taxi B&B Essen ansehen ↗</Link>
        <p>Für umfangreichere Prozesse entwickle ich <Link data-track-id="webdesign-details-link-5" className="text-link" href="/leistungen/webanwendungen/">individuelle Webanwendungen</Link>. Wiederkehrende Arbeit lässt sich durch <Link data-track-id="webdesign-details-link-6" className="text-link" href="/leistungen/automatisierung/">passende Automatisierung</Link> vereinfachen.</p>
      </section>
    </div>
    <section data-track-section="webdesign-details-section-7" className="service-detail-grid" aria-labelledby="webdesign-questions">
      <div>
        <span className="eyebrow">VOR DER PROJEKTANFRAGE</span>
        <h2 id="webdesign-questions">Fragen zu deiner neuen Website</h2>
        <p>Leistungsumfang, Budget und Betreuung klären wir vor dem Start. Diese Antworten helfen dir bei der Vorbereitung.</p>
      </div>
      <div className="faq-list">
        {questions.map(({ question, answer }) => <details key={question}>
          <summary><h3>{question}</h3><span aria-hidden="true">+</span></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </section>
  </>
}
