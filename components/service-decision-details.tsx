import Link from 'next/link'

/** Practical buying questions, rendered in the initial HTML for readers and crawlers. */
export function ServiceDecisionDetails({ service }: { service: 'relaunch' | 'automation' }) {
  if (service === 'relaunch') return (
    <div className="service-detail-grid">
      <section data-track-section="relaunch-decision">
        <h2>Website überarbeiten oder neu erstellen?</h2>
        <p>Wenn deine Inhalte noch stimmen, aber die mobile Bedienung oder das Design nicht mehr passen, kann eine gezielte Überarbeitung reichen. Fehlen wichtige Leistungsseiten oder lassen sich Funktionen kaum erweitern, prüfen wir einen Neuaufbau. Dafür sehe ich mir deine bestehende Website an und bespreche mit dir, welche Anfragen sie ermöglichen soll.</p>
        <p>Ich arbeite aus Essen und betreue Unternehmen im Ruhrgebiet sowie in Sankt Augustin und Bonn. Du stimmst die Änderungen direkt mit mir ab. Vor der Umsetzung bekommst du einen vereinbarten Umfang und Festpreis.</p>
        <Link href="/leistungen/neue-website/" className="text-link">Umfang einer neuen Unternehmenswebsite ansehen ↗</Link>
      </section>
      <section data-track-section="relaunch-search-continuity">
        <h2>Was passiert mit bestehenden Google-Treffern?</h2>
        <p>Vor einem Relaunch erfasse ich wichtige Seitenadressen, Inhalte und vorhandene Suchdaten. Bestehende URLs bleiben nach Möglichkeit erhalten. Muss eine Adresse wechseln, planen wir eine passende dauerhafte Weiterleitung zur neuen Zielseite. Interne Links, Canonicals und Sitemap müssen danach dieselben gültigen Adressen verwenden.</p>
        <p>Vor dem Start prüfen wir Formulare, mobile Darstellung und Erreichbarkeit. Anschließend lässt sich in der Search Console beobachten, ob Google die neuen Inhalte abruft und Seiten weiterhin indexiert. Ein Relaunch allein garantiert keine besseren Rankings.</p>
        <Link href="/leistungen/gefunden-werden/" className="text-link">Mehr zur Suchmaschinenoptimierung ↗</Link>
      </section>
    </div>
  )

  return (
    <div className="service-detail-grid">
      <section data-track-section="automation-customer-example">
        <h2>Ein konkretes Beispiel: Fahrtanfragen in Essen</h2>
        <p>Für Taxi B&B Essen habe ich die Website mit einem Anfrageformular, einem geschützten Verwaltungsbereich und automatischen E-Mail-Benachrichtigungen verbunden. Eine Fahrtanfrage kommt damit strukturiert beim Unternehmen an und kann dort bearbeitet werden. Eine Anfrage ist dabei noch keine automatisch bestätigte Buchung.</p>
        <p>Ein ähnlicher Ablauf lässt sich für Terminwünsche oder Serviceanfragen planen: benötigte Angaben erfassen, dem richtigen Ansprechpartner melden und den Bearbeitungsstand im Dashboard anzeigen. Welche Schritte automatisch erfolgen, entscheidest du vor der Umsetzung.</p>
        <Link href="/projekte/taxi-bb-essen/" className="text-link">Das umgesetzte Kundenprojekt ansehen ↗</Link>
      </section>
      <section data-track-section="automation-planning">
        <h2>Welche Systeme lassen sich verbinden?</h2>
        <p>Das hängt von den Schnittstellen deiner Programme ab. Für die erste Einschätzung brauche ich die beteiligten Werkzeuge und einen konkreten Ablauf: Was löst ihn aus, welche Daten werden gebraucht und was soll am Ende passieren? Wir prüfen außerdem, welche Zugriffsrechte, Freigaben und laufenden Kosten erforderlich sind.</p>
        <p>Bevor der Ablauf produktiv arbeitet, testen wir auch fehlende Angaben, doppelte Anfragen und Ausfälle eines angeschlossenen Dienstes. Wenn ein Schritt scheitert, soll der Vorgang nachvollziehbar bleiben und zur Bearbeitung gemeldet werden. Ich betreue die Konzeption und Umsetzung aus Essen, auch für Unternehmen in Sankt Augustin und Bonn.</p>
        <Link href="/leistungen/webanwendungen/" className="text-link">Mehr zu individuellen Dashboards und Webanwendungen ↗</Link>
      </section>
    </div>
  )
}
