import Image from 'next/image'
import Link from 'next/link'
import { PRICING } from '@/lib/pricing'
import { webdesignQuestions } from './webdesign-details'
import styles from './website-landing.module.css'

const enquiry = '/kontakt/?leistung=neue-website'
const packages = [
  { name: 'Landingpage', description: 'Eine Seite für ein konkretes Angebot, eine Kampagne oder den Start deines Unternehmens.', price: '490', index: 0, features: ['Individuelles Design', 'Mobile Umsetzung', 'Kontaktmöglichkeit', 'Technische SEO-Grundlagen'] },
  { name: 'Unternehmenswebsite', description: 'Ein mehrseitiger Auftritt mit Platz für deine Leistungen, dein Unternehmen und deine Referenzen.', price: '890', index: 1, features: ['Individuelles Design', 'Mehrere Unterseiten', 'Klare Navigation', 'Technische SEO-Grundlagen'] },
  { name: 'Website & Betreuung', description: 'Eine Website zum reduzierten Einstiegspreis, verbunden mit laufender technischer Betreuung.', price: '590', index: 3, features: ['Individuelle Website', 'Hosting nach Vereinbarung', 'Wartung & Weiterentwicklung', 'Persönlicher Ansprechpartner'] },
]

function Arrow({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={down ? styles.down : undefined}><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.3" /></svg>
}
function Action({ href, children, id, light = false }: { href: string; children: React.ReactNode; id: string; light?: boolean }) {
  return <Link href={href} className={`${styles.action} ${light ? styles.actionLight : ''}`} data-track-id={id}><span>{children}</span><span className={styles.actionMark}><Arrow /></span></Link>
}

export function WebsiteLanding() {
  return <div className={styles.landing}>
    <section className={styles.hero} aria-labelledby="website-title" data-track-section="website-landing-hero">
      <Image src="/studio/h-monolith-v1-1280.webp" alt="" fill priority sizes="(max-width: 760px) 100vw, 1280px" className={styles.heroImage} />
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>HAREB DIGITAL <span /> WEBDESIGN & ENTWICKLUNG</p>
        <h1 id="website-title">Websites mit<br /><span>Charakter.</span></h1>
        <p className={styles.lead}>Individuelles Webdesign und Entwicklung aus Essen. Von der einzelnen Angebotsseite bis zum vollständigen Unternehmensauftritt.</p>
        <div className={styles.heroOffer}><strong>Ab 490 € einmalig</strong><span>Landingpage · Hosting und Domain separat</span></div>
        <div className={styles.actions}><Action href={enquiry} id="website-hero-enquiry" light>Projekt besprechen</Action><a href="#preise" className={styles.textLink} data-track-id="website-hero-prices">Leistungen & Preise <Arrow down /></a></div>
      </div>
      <div className={styles.heroBottom}><span>GESTALTUNG. ENTWICKLUNG. PERSÖNLICH.</span><span>ESSEN / DEUTSCHLANDWEIT</span></div>
    </section>

    <section className={styles.intro} aria-label="Deine Website mit Hareb Digital"><p className={styles.eyebrow}>VON ISSA HAREB</p><div><h2>Dein Unternehmen gibt<br />die Richtung vor.</h2><p>Was bietest du an? Wen möchtest du erreichen? Daraus entwickle ich Struktur, Texte und Gestaltung. Du stimmst dein Projekt direkt mit mir ab, vom ersten Entwurf bis zur Veröffentlichung.</p></div><div className={styles.deliverables}><span>01<span>Eigenständiges Design</span></span><span>02<span>Für Handy und Desktop</span></span><span>03<span>Ein klarer Weg zur Anfrage</span></span></div></section>

    <section className={styles.section} id="preise" aria-labelledby="website-prices" data-track-section="website-landing-prices">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / LEISTUNGEN & PREISE</p><h2 id="website-prices">Welchen Umfang<br />brauchst du?</h2></div><p>Begrenzte Einstiegsangebote.<br />Den genauen Leistungsumfang halten wir vor dem Start schriftlich fest.</p></div>
      <div className={styles.packages}>{packages.map((item, i) => <article key={item.name} className={styles.package}>
        <span className={styles.packageNumber}>0{i + 1}</span>
        <div className={styles.packageCopy}><h3>{item.name}</h3><p>{item.description}</p><ul>{item.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
        <div className={styles.packageOffer}><p className={styles.price}>{item.price}<span> €</span></p><p className={styles.priceNote}>einmalig{item.index === 3 ? <span>zzgl. monatlicher Betreuung nach Angebot</span> : <span>Hosting, Domain und ggf. Lizenzen separat</span>}</p><Action href={`${enquiry}&angebot=${item.index}`} id={`website-package-${item.index}`}>{item.index === 3 ? 'Betreuung anfragen' : `${item.name} anfragen`}</Action></div>
      </article>)}</div>
      <div className={styles.conditions}><p>{PRICING.de[9]}</p><p>Bei den Website-Angeboten sind drei Monate Fehlerbehebung an der gelieferten Umsetzung und technische Optimierungen enthalten. Neue Seiten und zusätzliche Funktionen werden separat angeboten.</p></div>
    </section>

    <section className={`${styles.section} ${styles.proof}`} aria-labelledby="website-proof" data-track-section="website-landing-project">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / KUNDENPROJEKT</p><h2 id="website-proof">Taxi B&B Essen.</h2></div><Link className={styles.textLink} href="/projekte/taxi-bb-essen/" data-track-id="website-project-case">Projekt ansehen <Arrow /></Link></div>
      <Link href="/projekte/taxi-bb-essen/" className={styles.projectVisual} aria-label="Fallstudie Taxi B&B Essen öffnen"><Image src="/studio/evidence/taxi-desktop-20261016-v9.webp" width={1440} height={940} alt="Die Website für Taxi B&B Essen mit Kontaktformular und Fahrtanfragen" sizes="(max-width: 760px) 100vw, 1100px" /><span className={styles.projectIndex}>HAREB DIGITAL / AUSGEWÄHLTE ARBEIT</span></Link>
      <div className={styles.projectDescription}><h3>Von der Fahrtanfrage<br />bis zur Verwaltung.</h3><div><p>Für Taxi B&B Essen habe ich eine Website entwickelt, über die Fahrgäste ihre Fahrt mobil anfragen können. Neue Anfragen erreichen das Unternehmen per E-Mail und lassen sich in einem geschützten Verwaltungsbereich bearbeiten.</p><p className={styles.projectScope}>Individuelles Kundenprojekt. Der Verwaltungsbereich und die Automatisierung wurden zusätzlich zur Website umgesetzt.</p></div></div>
    </section>

    <section className={`${styles.section} ${styles.process}`} aria-labelledby="website-process" data-track-section="website-landing-process"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>03 / ZUSAMMENARBEIT</p><h2 id="website-process">So entsteht<br />deine Website.</h2></div><p>Ein Ansprechpartner für Gestaltung<br />und technische Umsetzung.</p></div><div className={styles.steps}>{[
      ['01', 'Ziele & Angebot', 'Wir besprechen dein Unternehmen, die benötigten Seiten und Funktionen. Du erhältst ein Angebot mit festem Preis und vereinbartem Zeitplan.'],
      ['02', 'Entwurf & Umsetzung', 'Ich erarbeite Seitenstruktur und Design. Du siehst Zwischenstände und gibst Feedback. Auf dieser Basis entwickle ich die fertige Website.'],
      ['03', 'Prüfung & Veröffentlichung', 'Vor dem Start prüfen wir Inhalte und Funktionen. Ich teste die Darstellung auf verschiedenen Bildschirmgrößen und veröffentliche die abgestimmte Version.'],
    ].map(([n, title, text]) => <div key={n}><span className={styles.stepNumber}>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

    <section className={`${styles.section} ${styles.faq}`} aria-labelledby="website-questions"><div><p className={styles.eyebrow}>04 / HÄUFIGE FRAGEN</p><h2 id="website-questions">Vor dem<br />Projektstart.</h2></div><div className={styles.questions}>{webdesignQuestions.map(({question, answer}, i) => <details key={question}><summary><span className={styles.faqNumber}>{String(i + 1).padStart(2, '0')}</span><span>{question}</span><span className={styles.plus} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

    <section className={styles.closing} aria-labelledby="website-start" data-track-section="website-landing-final"><p className={styles.eyebrow}>DEIN PROJEKT / HAREB DIGITAL</p><h2 id="website-start">Was soll deine<br />Website können?</h2><div className={styles.closingBottom}><p>Beschreibe kurz dein Unternehmen und was du brauchst.<br />Ich melde mich persönlich bei dir.</p><Action href={enquiry} id="website-final-enquiry" light>Projekt besprechen</Action></div><p className={styles.closingNote}>Die Anfrage ist unverbindlich. Beauftragt wird erst nach deiner Zustimmung zum Angebot.</p></section>
    <aside className={styles.mobileCta} aria-label="Website anfragen"><span>Landingpage ab<strong>490 € einmalig</strong><small>Hosting & Domain separat</small></span><Action href={enquiry} id="website-mobile-enquiry">Projekt anfragen</Action></aside>
  </div>
}
