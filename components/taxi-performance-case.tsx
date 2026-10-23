import series from '@/data/performance-20261016.json'
import styles from './taxi-performance-case.module.css'

const mobile = series.sites.taxi.mobile
const decimal = (n: number, digits = 1) => n.toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits })
const seconds = (n: number) => `${decimal(n / 1000, 2)} s`
const metrics = [
  { key: 'performance', label: 'Performance', format: (n: number) => `${n} / 100` },
  { key: 'lcp', label: 'Größter Inhalt · LCP', format: seconds },
  { key: 'tbt', label: 'Blockierzeit · TBT', format: (n: number) => `${Math.round(n)} ms` },
  { key: 'cls', label: 'Layoutverschiebung · CLS', format: (n: number) => decimal(n, 3) },
  { key: 'bytes', label: 'Übertragene Daten', format: (n: number) => `${Math.round(n / 1024)} KiB` },
] as const

export function TaxiPerformanceCase() {
  const reduction = Math.round((1 - mobile.after.bytes.median / mobile.before.bytes.median) * 100)
  return <section className={styles.case} aria-labelledby="performance-case-title" id="performance">
    <span className="eyebrow">WEITERENTWICKLUNG · GEMESSEN AM {series.localDate}</span>
    <h2 id="performance-case-title">Andere reden über Qualität.<br />Wir messen sie.</h2>
    <p className={styles.intro}>Ein konkreter Optimierungsschritt an der veröffentlichten Website: kleinere Bilddateien, weniger JavaScript beim Start und Funktionen, die erst bei Bedarf rechnen. Die Gestaltung und die Wege zur Anfrage bleiben erhalten.</p>
    <dl className={styles.highlights}>
      <div><dt>Mobile Performance</dt><dd><span>{mobile.before.performance.median}</span><span aria-label="auf">→</span>{mobile.after.performance.median}</dd><p>Median aus je drei Läufen · von 100 Punkten</p></div>
      <div><dt>Größter Inhalt auf Mobile</dt><dd>{seconds(mobile.after.lcp.median)}</dd><p>Vor dieser Optimierung: {seconds(mobile.before.lcp.median)}</p></div>
      <div><dt>Weniger Daten beim Einstieg</dt><dd>{reduction} %</dd><p>Vergleich der mobilen Medianwerte</p></div>
    </dl>
    <div className={styles.tables}>
      {(['mobile', 'desktop'] as const).map(mode => {
        const result = series.sites.taxi[mode]
        return <div key={mode}><h3>{mode === 'mobile' ? 'Mobile' : 'Desktop'}</h3><table>
          <caption className={styles.visuallyHidden}>{mode === 'mobile' ? 'Mobile' : 'Desktop'}: Median aus je drei Lighthouse-Läufen</caption>
          <thead><tr><th scope="col">Messwert</th><th scope="col">Vorher</th><th scope="col">Nachher</th></tr></thead>
          <tbody>{metrics.map(metric => <tr key={metric.key}><th scope="row">{metric.label}</th><td>{metric.format(result.before[metric.key].median)}</td><td>{metric.format(result.after[metric.key].median)}</td></tr>)}</tbody>
        </table><p className={styles.range}>Performance-Spannweite: vorher {result.before.performance.min}–{result.before.performance.max}, nachher {result.after.performance.min}–{result.after.performance.max}.</p></div>
      })}
    </div>
    <p className={styles.note}>Barrierefreiheit, Best Practices und SEO: in allen TaxiBB-Läufen dieser Serie jeweils 100 Punkte. 90–100 Performance-Punkte auf Mobile bleiben ein Ziel; die gemessenen Werte stehen oben.</p>
    <details className={styles.method}><summary>So wurde gemessen</summary>
      <p>Am {series.localDate} mit Lighthouse {series.lighthouseVersions.join(', ')} und Chromium 134: drei Läufe je Geräteprofil vor und nach der Änderung, nacheinander, mit frischen Browserprofilen und den Standardprofilen für Mobile und Desktop. Die Startseite wurde jeweils über https://www.taxibbessen.de/ aufgerufen. Die Tabelle zeigt den Median, also den mittleren der drei Werte.</p>
      <p>Die Messungen stammen aus derselben Cloud-Testumgebung mit Netzwerkproxy und simulierter Drosselung. Gerät, Netzwerk und Serverantwort können andere Ergebnisse liefern. Das sind Labormessungen, keine Besucherdaten. TBT ersetzt keinen im Alltag gemessenen INP. „Vorher“ bezieht sich auf diese Optimierungsrunde, nicht auf den ursprünglichen Relaunch.</p>
      <p>Geprüfte Quellstände: {series.revisions.taxi.before.slice(0, 7)} → {series.revisions.taxi.after.slice(0, 7)}. Das Archiv enthält alle 24 Berichte der TaxiBB- und Hareb-Digital-Messreihe, Einzelwerte, Zeitstempel, Einstellungen und Prüfsummen. Ein Vergleich mit anderen Anbietern ist nicht Bestandteil dieser Fallstudie.</p>
      <a className="text-link" href="/studio/evidence/lighthouse-20261016.zip" download>Messberichte und Methode herunterladen ↓</a>
    </details>
  </section>
}
