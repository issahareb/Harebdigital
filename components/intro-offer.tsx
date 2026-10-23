import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import styles from './intro-offer.module.css'

const packages = [
  { name: 'Landingpage', price: '490 €', text: 'Eine Seite. Ein klares Ziel.', details: 'Eine individuell gestaltete Seite für dein Angebot oder deine Kampagne, mit mobiler Umsetzung und einem klaren Anfrageweg.', service: 'neue-website' },
  { name: 'Unternehmenswebsite', price: '890 €', text: 'Dein Unternehmen. Dein Auftritt.', details: 'Eine mehrseitige Website oder ein Relaunch mit eigenständigem Design, klarer Navigation und technischer Umsetzung. Den Seitenumfang legen wir gemeinsam fest.', service: 'neue-website' },
  { name: 'Terminwidget', price: '490 €', text: 'Der kurze Weg zum Termin.', details: 'Eine Terminfunktion für deine Website. Welche Angaben erfasst werden und wie Anfragen bei dir ankommen, stimmen wir vor der Umsetzung ab.', service: 'automatisierung' },
]

export function IntroOffer() {
  return <section id="angebote" className={`${styles.section} wrap section-space`} aria-labelledby="offer-title">
    <div className={styles.heading}>
      <div>
        <p className={styles.badge}>Begrenztes Einstiegsangebot</p>
        <h2 id="offer-title">Dein nächster Schritt.<br />Ein klarer Preis.</h2>
      </div>
      <p className={styles.intro}>Individuell gestaltet, persönlich umgesetzt. Frag dein Projekt zu diesen Einstiegskonditionen an. Verfügbarkeit und Leistungsumfang bestätige ich dir im persönlichen Angebot.</p>
    </div>
    <div className={styles.grid}>
      {packages.map((item, index) => <article className={styles.card} key={item.name}>
        <span className={styles.index}>0{index + 1} / {item.name}</span>
        <h3>{item.text}</h3>
        <p className={styles.price}>{item.price}<span>einmalig</span></p>
        <p className={styles.description}>{item.details}</p>
        <Link href={`/kontakt/?leistung=${item.service}&angebot=${index}`} className={styles.link}>{item.name} anfragen<ArrowUpRight size={20} aria-hidden /></Link>
      </article>)}
    </div>
    <div className={styles.care}>
      <div><span className="eyebrow">Website mit laufender Betreuung</span><h3>590 € einmalig<br /><span>plus monatliche Betreuung</span></h3></div>
      <div><p>Der reduzierte Website-Preis gilt in Verbindung mit laufender Betreuung. Monatspreis, Hosting, Leistungsumfang und Vertragsbedingungen vereinbaren wir vorab im persönlichen Angebot.</p><Link className="text-link" href="/kontakt/?leistung=neue-website&angebot=3">Betreuungsangebot anfragen<ArrowUpRight size={18} aria-hidden /></Link></div>
    </div>
    <div className={styles.notes}>
      <div><h3>Design, Technik und Sichtbarkeit</h3><p>Die Website-Angebote verbinden eigenständiges Design mit mobiler Umsetzung, Performance, technischer SEO und maschinenlesbaren Inhalten für Google und KI-Anwendungen. Bestimmte Rankings oder Empfehlungen werden nicht versprochen.</p></div>
      <div><h3>Drei Monate Begleitung inklusive</h3><p>Nach Inbetriebnahme deiner Website sind die Behebung von Fehlern an der gelieferten Umsetzung und laufende technische Optimierungen drei Monate kostenlos enthalten. Neue Funktionen, zusätzliche Seiten und größere Erweiterungen bieten wir separat an.</p></div>
    </div>
    <p className={styles.terms}>Alle genannten Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Hosting, Domain, Lizenzen und weitere laufende Kosten sind nicht pauschal enthalten und werden vor Auftragserteilung ausgewiesen. Individuelle größere Projekte erhalten ein Angebot nach Umfang.</p>
  </section>
}
