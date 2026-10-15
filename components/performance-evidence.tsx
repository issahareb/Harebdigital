/** Draft branch only. Supplied figures have not yet been checked against raw reports. */
export function PerformanceEvidence() {
  return (
    <section id="performance" className="performance-evidence section-space" aria-labelledby="performance-title">
      <div className="wrap">
        <div className="performance-heading" data-reveal>
          <div className="section-label"><span className="eyebrow">Qualität, die sich messen lässt</span></div>
          <p className="performance-draft">Entwurf · Messdaten noch nicht verifiziert</p>
          <h2 id="performance-title">Andere reden über Qualität.<br /><span>Wir messen sie.</span></h2>
          <p className="performance-intro">Am Beispiel Taxi B&B Essen: mobile Ladegeschwindigkeit im Vergleich mit einer Auswahl anderer Taxi-Websites.</p>
        </div>

        <div className="performance-comparison" data-reveal>
          <article className="performance-project" aria-labelledby="performance-project-title">
            <div className="performance-card-top"><span className="eyebrow">Unser Projekt</span><span className="performance-dot" aria-hidden="true" /></div>
            <h3 id="performance-project-title">Taxi B&B Essen</h3>
            <a href="https://www.taxibbessen.de/" className="performance-domain">taxibbessen.de ↗</a>
            <dl className="performance-metrics">
              <div><dt>Lighthouse Performance</dt><dd>94<span>/ 100</span></dd></div>
              <div><dt>Größter Inhalt sichtbar · LCP</dt><dd>2,7<span>s</span></dd></div>
            </dl>
            <p className="performance-caption">Gemeldeter Median aus 5 mobilen Messungen.</p>
          </article>
          <article className="performance-sample" aria-labelledby="performance-sample-title">
            <div className="performance-card-top"><span className="eyebrow">Vergleichsgruppe</span><span className="performance-count">23 Websites</span></div>
            <h3 id="performance-sample-title">Andere Taxi-Websites</h3>
            <p className="performance-domain">Auswahl laut übermittelter Zusammenfassung</p>
            <dl className="performance-metrics">
              <div><dt>Lighthouse Performance</dt><dd>70<span>/ 100</span></dd></div>
              <div><dt>Größter Inhalt sichtbar · LCP</dt><dd>5,7<span>s</span></dd></div>
            </dl>
            <p className="performance-caption">Gemeldete Vergleichswerte; Auswertung noch zu prüfen.</p>
          </article>
        </div>

        <div className="performance-context" data-reveal>
          <p><span className="eyebrow">Messung laut Zusammenfassung</span><br />15. Oktober 2026 · Mobil · Lighthouse 12 · 5 Läufe je Website</p>
          <p>Labormessungen sind Momentaufnahmen. Gerät, Netzwerk, Serverauslastung und Testbedingungen können die Ergebnisse verändern. Die Auswahl bildet nicht den gesamten Markt ab.</p>
        </div>
        <details className="performance-method">
          <summary>Messmethode und Quellenstatus <span aria-hidden="true">+</span></summary>
          <div>
            <p>Die Werte stammen aus einer vom Auftraggeber weitergegebenen Zusammenfassung. Die originalen Lighthouse-Berichte, die vollständige Liste der getesteten URLs und die Testkonfiguration liegen hier noch nicht vor. Dieser Entwurf ist nicht zur Veröffentlichung freigegeben.</p>
            <p>Gemeldetes Zeitfenster: 15.10.2026, 22:48–22:59 Uhr; Zeitzone nicht angegeben. 120 Läufe entsprechen 24 Websites mit jeweils 5 Läufen. Vor der Veröffentlichung werden Version, Drosselung, Endgerät, Cache-Bedingungen, Fehlerfreiheit und Medianberechnung anhand der Rohdaten geprüft.</p>
            <p>Die zusätzlich genannte Agentur-Website adeladesign.de wird hier nicht mit der Taxi-Vergleichsgruppe vermischt. Ihre Zugehörigkeit zur Messreihe und die genannte Preisangabe sind nicht belegt.</p>
          </div>
        </details>
      </div>
    </section>
  )
}
