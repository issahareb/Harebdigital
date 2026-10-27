import Link from 'next/link'

export const webdesignQuestions = [
  {
    question: 'Was kostet eine Website?',
    answer: 'Eine Landingpage kostet im Einstiegsangebot 490 € einmalig, eine mehrseitige Unternehmenswebsite 890 €. Die Variante mit laufender Betreuung startet bei 590 € einmalig zuzüglich der vereinbarten monatlichen Kosten. Hosting, Domain, Lizenzen und zusätzliche Funktionen sind nicht pauschal enthalten. Du erhältst vor der Beauftragung ein Angebot mit dem genauen Umfang und allen Kosten.',
  },
  {
    question: 'Welches Angebot passt zu meinem Unternehmen?',
    answer: 'Eine Landingpage eignet sich, wenn du ein Angebot auf einer einzigen Seite vorstellen möchtest, zum Beispiel für eine Werbekampagne. Eine Unternehmenswebsite bietet mehrere Seiten für Leistungen, Referenzen und Informationen über deinen Betrieb. Wenn ich auch den laufenden Betrieb betreuen soll, kommt die Variante mit Betreuung infrage.',
  },
  {
    question: 'Wie lange dauert die Erstellung?',
    answer: 'Für eine Landingpage sind meist zwei bis drei Wochen vorgesehen, für eine mehrseitige Website vier bis acht Wochen. Der tatsächliche Zeitraum hängt vom Umfang, den benötigten Inhalten und unseren Abstimmungen ab. Den Zeitplan vereinbaren wir vor dem Projektstart.',
  },
  {
    question: 'Muss ich Texte und Bilder fertig mitbringen?',
    answer: 'Du kannst vorhandene Texte, Bilder und dein Logo mitbringen. Falls noch Inhalte fehlen, klären wir gemeinsam, was benötigt wird. Informationen zu deinem Unternehmen kommen von dir; Struktur und Formulierungen erarbeite ich mit dir. Zusätzliche Foto-, Video- oder Lizenzkosten werden vorher abgestimmt.',
  },
  {
    question: 'Sind Suchmaschinenoptimierung und mobile Darstellung enthalten?',
    answer: 'Die Website-Angebote enthalten die Umsetzung für Handy, Tablet und Desktop sowie technische SEO-Grundlagen. Dazu gehören passende Seitentitel, eine verständliche Seitenstruktur und maschinenlesbare Inhalte. Weiterführende SEO-Arbeit planen wir bei Bedarf separat. Eine bestimmte Position bei Google ist damit nicht garantiert.',
  },
  {
    question: 'Welche Kosten entstehen nach der Veröffentlichung?',
    answer: 'Je nach Projekt fallen Kosten für Hosting, Domain und gegebenenfalls externe Dienste oder Lizenzen an. Beim 590-€-Angebot kommt die vereinbarte monatliche Betreuung hinzu. Alle laufenden Kosten stehen vor der Beauftragung im Angebot. Bei den Website-Angeboten sind drei Monate Fehlerbehebung an der gelieferten Umsetzung und technische Optimierungen enthalten.',
  },
  {
    question: 'Kann meine Website später erweitert werden?',
    answer: 'Zusätzliche Seiten, Terminwünsche, Buchungsanfragen oder ein geschützter Verwaltungsbereich lassen sich als Erweiterung planen. Wir klären zuerst, welche Funktion du brauchst und wie sie sich in deine Website einfügt. Vor der Umsetzung erhältst du dafür ein separates Angebot.',
  },
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
        {webdesignQuestions.map(({ question, answer }) => <details key={question}>
          <summary><h3>{question}</h3><span aria-hidden="true">+</span></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </section>
  </>
}
