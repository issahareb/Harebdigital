import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Check, Globe2, MousePointer2, Smartphone, Sparkles } from 'lucide-react'
import { PRICING } from '@/lib/pricing'
import { webdesignQuestions } from './webdesign-details'
import styles from './website-landing.module.css'

const enquiry = '/kontakt/?leistung=neue-website'
const packages = [
  { name: 'Landingpage', caption: 'Ein Angebot. Ein klarer Fokus.', price: '490', index: 0, features: ['Eine individuell gestaltete Seite', 'Für Handy, Tablet und Desktop', 'Kontaktmöglichkeit & technische SEO'] },
  { name: 'Unternehmenswebsite', caption: 'Platz für dein ganzes Unternehmen.', price: '890', index: 1, features: ['Mehrseitiger Unternehmensauftritt', 'Leistungen, Referenzen & Kontakt', 'Individuelles Design & technische SEO'] },
  { name: 'Website & Betreuung', caption: 'Dein Auftritt. Persönlich begleitet.', price: '590', index: 3, features: ['Website zum reduzierten Einstieg', 'Laufende Betreuung nach Angebot', 'Ein Ansprechpartner für dein Projekt'] },
]

export function WebsiteLanding() {
  return <div className={styles.landing}>
    <section className={styles.hero} aria-labelledby="website-title" data-track-section="website-landing-hero">
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}><span className={styles.dot} /> WEBDESIGN AUS ESSEN · DEUTSCHLANDWEIT</span>
        <h1 id="website-title">Deine Website.<br />Dein nächster<br /><span>großer Auftritt.</span></h1>
        <p className={styles.lead}>Eine Website, die nach dir aussieht. Dein Angebot auf den Punkt bringt. Und den Weg zur Anfrage einfach macht.</p>
        <div className={styles.heroOffer}><strong>Ab 490 €</strong><span>einmalig für deine Landingpage<small>zzgl. Hosting, Domain & ggf. Lizenzen</small></span></div>
        <div className={styles.actions}><Link href={enquiry} className={styles.primary} data-track-id="website-hero-enquiry">Website unverbindlich anfragen <ArrowUpRight size={20} aria-hidden /></Link><a href="#preise" className={styles.textLink} data-track-id="website-hero-prices">Pakete ansehen <ArrowDown size={16} aria-hidden /></a></div>
        <p className={styles.personal}>Direkt mit Issa Hareb. Von der ersten Idee bis zum Start.</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.visualLabel}><span>DEIN AUFTRITT, WEITERGEDACHT.</span><span>WEB / 01</span></div>
        <div className={styles.browser} aria-hidden="true">
          <div className={styles.browserBar}><span><i /><i /><i /></span><span>dein-unternehmen.de</span><Globe2 size={12} /></div>
          <div className={styles.preview}>
            <div className={styles.previewNav}><b>Deine Marke<span>.</span></b><span>Ideen mit Charakter ↗</span></div>
            <span className={styles.previewKicker}>BEREIT FÜR DAS NÄCHSTE KAPITEL?</span>
            <div className={styles.previewTitle}>Alles beginnt<br />mit deinem<br /><em>Auftritt.</em></div>
            <span className={styles.previewButton}>Lass uns starten <ArrowUpRight size={12} /></span>
            <div className={styles.sculpture}><i /><i /><i /></div>
            <div className={styles.previewBottom}><span>INDIVIDUELL.<br />BIS INS DETAIL.</span><span>© DEINE MARKE</span></div>
          </div>
        </div>
        <div className={styles.mobileBadge}><Smartphone size={23} strokeWidth={1.5} /><span>Auf jedem Display.<small>Für mobile Besucher gemacht.</small></span><Check size={17} /></div>
        <div className={styles.visualFooter}><span>Designvorschau · dein Projekt wird individuell</span><Sparkles size={17} aria-hidden /></div>
      </div>
    </section>
    <div className={styles.trustStrip} aria-label="In deinen Website-Angeboten enthalten"><span><Check size={17} /> Individuelles Design</span><span><Check size={17} /> Mobile Umsetzung</span><span><Check size={17} /> Technische SEO</span><span><Check size={17} /> 3 Monate technische Begleitung</span></div>

    <section className={styles.section} id="preise" aria-labelledby="website-prices" data-track-section="website-landing-prices">
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>01 / DEIN EINSTIEG</span><h2 id="website-prices">Große Ideen.<br /><span>Klare Preise.</span></h2></div><p>Wähle den Einstieg, der zu dir passt.<br />Den genauen Umfang klären wir gemeinsam.</p></div>
      <p className={styles.offerLabel}><span className={styles.dot} /> Begrenztes Einstiegsangebot</p>
      <div className={styles.packages}>{packages.map((item, i) => <article key={item.name} className={`${styles.package} ${i === 0 ? styles.featured : ''}`}>
        <div className={styles.packageTop}><span>0{i + 1}</span>{i === 0 ? <span>FÜR DEINEN START</span> : <ArrowUpRight size={20} aria-hidden />}</div>
        <h3>{item.name}</h3><p className={styles.packageCaption}>{item.caption}</p>
        <div className={styles.price}>{item.price}<span> €</span></div><p className={styles.priceNote}>einmalig{i === 2 ? <strong>zzgl. monatlicher Betreuung nach Angebot</strong> : <span>zzgl. Hosting, Domain & ggf. Lizenzen</span>}</p>
        <ul>{item.features.map(feature => <li key={feature}><Check size={16} aria-hidden />{feature}</li>)}</ul>
        <Link href={`${enquiry}&angebot=${item.index}`} className={i === 0 ? styles.primary : styles.secondary} data-track-id={`website-package-${item.index}`}>{item.name === 'Website & Betreuung' ? 'Betreuung anfragen' : `${item.name} anfragen`}<ArrowUpRight size={18} aria-hidden /></Link>
      </article>)}</div>
      <div className={styles.conditions}><p>{PRICING.de[9]}</p><details><summary>Was ist nach dem Start inklusive?</summary><p>Drei Monate Fehlerbehebung an der gelieferten Umsetzung und technische Optimierungen. Zusätzliche Seiten, neue Funktionen und größere Erweiterungen werden separat angeboten. Hosting, Domain, Lizenzen und weitere laufende Kosten weisen wir vor Auftragserteilung aus.</p></details></div>
    </section>

    <section className={`${styles.section} ${styles.proof}`} aria-labelledby="website-proof" data-track-section="website-landing-project">
      <div className={styles.projectVisual}><div className={styles.projectBar}><span className={styles.dot} /> VERÖFFENTLICHTES KUNDENPROJEKT<span>↗</span></div><Image src="/studio/evidence/taxi-desktop-20261016-v9.webp" width={1440} height={940} alt="Projektansicht der Website für Taxi B&B Essen mit Kontaktformular und mobilen Anfragewegen" sizes="(max-width: 760px) 90vw, 650px" /><div className={styles.projectCaption}><span>TAXI B&B ESSEN</span><span>WEBDESIGN + ENTWICKLUNG</span></div></div>
      <div className={styles.proofCopy}><span className={styles.eyebrow}>02 / AUS EINER IDEE WIRD PRAXIS</span><h2 id="website-proof">Gutes Design.<br /><span>Echter Nutzen.</span></h2><p>Für Taxi B&B Essen habe ich den Webauftritt mit digitalen Fahrtanfragen verbunden. Kunden fragen mobil an. Das Unternehmen verwaltet Anfragen zentral.</p><ul><li><Check size={17} /> Mobil nutzbare Kontakt- und Fahrtanfragen</li><li><Check size={17} /> Geschützter Verwaltungsbereich</li><li><Check size={17} /> Automatische E-Mail-Benachrichtigungen</li></ul><Link className={styles.textLink} href="/projekte/taxi-bb-essen/" data-track-id="website-project-case">Projekt im Detail ansehen <ArrowUpRight size={18} aria-hidden /></Link><small>Individuelles Kundenprojekt mit erweitertem Funktionsumfang.</small></div>
    </section>

    <section className={`${styles.section} ${styles.process}`} aria-labelledby="website-process" data-track-section="website-landing-process"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>03 / VON DER IDEE ZUR WEBSITE</span><h2 id="website-process">Du hast die Idee.<br /><span>Ich kümmere mich um den Auftritt.</span></h2></div></div><div className={styles.steps}>{[
      ['01', 'Kurz kennenlernen.', 'Du erzählst mir von deinem Unternehmen. Wir klären Ziele, Umfang und Budget. Du erhältst ein Angebot mit festem Preis.'],
      ['02', 'Gemeinsam gestalten.', 'Ich entwickle Struktur und Design. Du siehst Zwischenstände und gibst Feedback, bevor wir den Auftritt fertigstellen.'],
      ['03', 'Bereit für den Start.', 'Wir prüfen Inhalte, mobile Darstellung und Funktionen. Danach geht deine Website online und du erhältst die vereinbarte Übergabe.'],
    ].map(([n, title, text]) => <div key={n}><span className={styles.stepNumber}>{n}<ArrowUpRight size={22} aria-hidden /></span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

    <section className={`${styles.section} ${styles.faq}`} aria-labelledby="website-questions"><div><span className={styles.eyebrow}>GUT ZU WISSEN</span><h2 id="website-questions">Noch eine<br /><span>Frage offen?</span></h2><p>Website erstellen lassen in Essen oder deutschlandweit: Du arbeitest direkt mit mir, Issa Hareb.</p></div><div className={styles.questions}>{webdesignQuestions.map(({question, answer}) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className={styles.closing} aria-labelledby="website-start" data-track-section="website-landing-final"><span className={styles.eyebrow}>DEIN NÄCHSTES KAPITEL</span><h2 id="website-start">Machen wir etwas<br /><span>Gutes daraus.</span></h2><p>Erzähl mir kurz, was du vorhast.<br />Wir finden den passenden Einstieg für dein Unternehmen.</p><Link className={styles.primary} href={enquiry} data-track-id="website-final-enquiry">Meine Website anfragen <ArrowUpRight size={20} aria-hidden /></Link><span className={styles.closingNote}>Unverbindlich anfragen · Umfang und Preis vor Projektstart klären</span><MousePointer2 className={styles.closingArrow} size={110} strokeWidth={1} aria-hidden /></section>
    <aside className={styles.mobileCta} aria-label="Website anfragen"><span>Deine Landingpage<strong>ab 490 € einmalig</strong><small>zzgl. laufender Kosten</small></span><Link href={enquiry} data-track-id="website-mobile-enquiry">Anfragen <ArrowUpRight size={18} aria-hidden /></Link></aside>
  </div>
}
