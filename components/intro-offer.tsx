'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CalendarDays, Layers3, MousePointer2, Sparkles } from 'lucide-react'
import styles from './intro-offer.module.css'

const packages = [
  { name: 'Landingpage', short: 'Eine Seite. Ein Ziel.', price: '490 €', text: 'Dein Angebot.\nIm Mittelpunkt.', details: 'Eine individuell gestaltete Seite für dein Angebot oder deine Kampagne. Mobil durchdacht, schnell geladen und mit einem klaren Weg zur Anfrage.', features: ['Individuelles Design', 'Mobile Umsetzung', 'Klarer Anfrageweg'], service: 'neue-website', icon: MousePointer2 },
  { name: 'Unternehmenswebsite', short: 'Dein digitaler Auftritt.', price: '890 €', text: 'Dein Unternehmen.\nGroß gedacht.', details: 'Eine mehrseitige Website oder ein Relaunch mit eigenständigem Design, klarer Navigation und technischer Umsetzung. Den Seitenumfang legen wir gemeinsam fest.', features: ['Mehrseitiger Auftritt', 'Technische SEO', 'Für Google & KI lesbar'], service: 'neue-website', icon: Layers3 },
  { name: 'Terminwidget', short: 'Weniger hin und her.', price: '190 €', text: 'Ein Klick näher\nzum Termin.', details: 'Eine Terminfunktion für deine Website. Welche Angaben erfasst werden und wie Anfragen bei dir ankommen, stimmen wir vor der Umsetzung ab.', features: ['In deine Website integriert', 'Passende Anfragefelder', 'Auf dich abgestimmt'], service: 'automatisierung', icon: CalendarDays },
  { name: 'Website & Betreuung', short: 'Starten. Weiterwachsen.', price: '590 €', text: 'Deine Website.\nPersönlich begleitet.', details: 'Deine Website zum reduzierten Einstiegspreis mit laufender Betreuung. Monatspreis, Hosting, Leistungsumfang und Vertragsbedingungen vereinbaren wir vorab im persönlichen Angebot.', features: ['Individuelle Website', 'Persönliche Betreuung', 'Laufende Begleitung'], service: 'neue-website', icon: Sparkles },
]

function OfferPreview({ index }: { index: number }) {
  const [day, setDay] = useState(12)
  const [time, setTime] = useState('10:00')
  if (index === 2) return <div className={styles.calendar}>
    <div className={styles.calendarHeading}><span className={styles.previewLogo}>h<span>.</span></span><span>Dein nächster Termin<small>Wähle deinen Wunschzeitpunkt</small></span><CalendarDays size={22} /></div>
    <div className={styles.month}>Dein Wunschdatum <span>Beispielmonat</span></div>
    <div className={styles.days}>
      {['M', 'D', 'M', 'D', 'F', 'S', 'S'].map((label, i) => <span key={`day-${i}`} className={styles.weekday}>{label}</span>)}
      {Array.from({ length: 21 }, (_, i) => i + 1).map(date => <button key={date} type="button" aria-label={`Beispieltag ${date}`} aria-pressed={day === date} onClick={() => setDay(date)} className={day === date ? styles.chosenDay : ''}>{date}</button>)}
    </div>
    <div className={styles.times}>{['10:00', '11:30', '14:00'].map(slot => <button type="button" aria-pressed={time === slot} key={slot} onClick={() => setTime(slot)}>{slot}</button>)}</div>
    <div className={styles.demoSelection} aria-live="polite"><Check size={15} /> Tag {day} · {time} Uhr ausgewählt</div>
    <p className={styles.demoNote}>Interaktive Vorschau · keine echte Buchung</p>
  </div>

  return <div className={`${styles.sitePreview} ${index === 1 ? styles.companyPreview : ''}`} aria-hidden="true">
    <div className={styles.browserBar}><i /><i /><i /><span>dein-unternehmen.de</span><ArrowUpRight size={12} /></div>
    <div className={styles.miniNav}><span className={styles.previewLogo}>h<span>.</span></span><span>{index === 0 ? 'Dein nächster großer Schritt' : 'Start    Leistungen    Kontakt'}</span><span className={styles.miniMenu}>☰</span></div>
    <div className={styles.miniHero}>
      <span className={styles.miniLabel}>{index === 0 ? 'FÜR IDEEN, DIE MEHR VERDIENEN.' : index === 1 ? 'DEIN UNTERNEHMEN. DEIN CHARAKTER.' : 'GUTE IDEEN WACHSEN WEITER.'}</span>
      <strong>{index === 0 ? <>Kleine Seite.<br />Große Wirkung<span>.</span></> : index === 1 ? <>Ein Auftritt,<br />der bleibt<span>.</span></> : <>Bereit für<br />dein Morgen<span>?</span></>}</strong>
      <span className={styles.miniCta}>Lass uns starten <ArrowUpRight size={13} /></span>
      <div className={styles.orbit}><div /><div /><div /></div>
    </div>
    <div className={styles.miniFooter}>{index === 1 ? <><span>01 / Leistungen</span><span>02 / Über uns</span><span>03 / Kontakt</span></> : <><span>Individuell gestaltet</span><span>Für jedes Display ↗</span></>}</div>
    {index === 3 && <div className={styles.careFloat}><span className={styles.statusDot} /><div>Gut betreut.<small>Von der ersten Idee an.</small></div><Check size={16} /></div>}
  </div>
}

export function IntroOffer() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const touch = useRef<{ x: number; y: number } | null>(null)
  const item = packages[active]
  const select = (index: number, focus = false) => {
    const next = (index + packages.length) % packages.length
    setActive(next)
    if (focus) tabs.current[next]?.focus({ preventScroll: true })
    const tab = tabs.current[next]
    const list = tab?.parentElement
    if (tab && list) {
      const left = tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft
      list.scrollTo({ left: Math.max(0, left - 8), behavior: 'instant' })
    }
  }
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? packages.length - 1 : null
    if (next !== null) { event.preventDefault(); select(next, true) }
  }

  return <section id="angebote" className={`${styles.section} wrap section-space`} aria-labelledby="offer-title">
    <div className={styles.heading}>
      <div><p className={styles.badge}><span />Begrenztes Einstiegsangebot</p><h2 id="offer-title">Was hast du vor<span>?</span></h2></div>
      <p className={styles.intro}>Eine Idee ist der Anfang.<br />Wähle, was dich weiterbringt.</p>
    </div>
    <div className={styles.gallery}>
      <div className={styles.tabs} role="tablist" aria-label="Angebot auswählen">
        {packages.map((offer, index) => <button ref={node => { tabs.current[index] = node }} type="button" role="tab" id={`offer-tab-${index}`} aria-controls={`offer-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} key={offer.name} onClick={() => select(index)} onKeyDown={event => keyboard(event, index)} className={styles.tab} data-track-id={`offer-select-${index}`}><offer.icon size={19} strokeWidth={1.5} /><span>{offer.name}<small>{offer.short}</small></span><span className={styles.tabNumber}>0{index + 1}</span></button>)}
      </div>
      <div className={styles.stage}
        onTouchStart={event => { const p = event.touches[0]; touch.current = { x: p.clientX, y: p.clientY } }}
        onTouchEnd={event => { if (!touch.current) return; const p = event.changedTouches[0]; const dx = p.clientX - touch.current.x; const dy = p.clientY - touch.current.y; if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1)); touch.current = null }} onTouchCancel={() => { touch.current = null }}>
        {packages.map((offer, index) => <div key={offer.name} id={`offer-panel-${index}`} role="tabpanel" aria-labelledby={`offer-tab-${index}`} hidden={active !== index} tabIndex={0} className={styles.panel}>
          {active === index && <><div className={styles.visual}><div className={styles.visualTop}><span>HAREB DIGITAL / {index === 2 ? 'LIVE DEMO' : 'DESIGNVORSCHAU'}</span><span>0{index + 1}</span></div><div className={styles.previewWrap}><OfferPreview index={index} /></div><div className={styles.visualBottom}><span className={styles.statusDot} />{index === 2 ? 'Probiere die Terminauswahl aus' : 'Dein Projekt bekommt sein eigenes Design'}</div></div>
          <div className={styles.content}><span className={styles.offerLabel}>0{index + 1} / {offer.name}</span><h3>{offer.text}</h3><p className={styles.description}>{offer.details}</p><ul className={styles.features}>{offer.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul><div className={styles.priceRow}><p className={styles.price}>{offer.price}</p><span>einmalig{index === 3 && <small>zzgl. monatlicher Betreuung</small>}</span></div><Link href={`/kontakt/?leistung=${offer.service}&angebot=${index}`} className={styles.link} data-track-id={`offer-enquire-${index}`}>{index === 2 ? 'Terminwidget anfragen' : 'Dieses Angebot anfragen'}<ArrowUpRight size={20} aria-hidden /></Link></div></>}
        </div>)}
      </div>
      <div className={styles.galleryFooter}><span aria-live="polite"><b>0{active + 1}</b> / 04 <span className={styles.footerName}>{item.name}</span></span><div className={styles.controls}><span>Entdecke deine Möglichkeiten</span><button type="button" onClick={() => select(active - 1)} aria-label="Vorheriges Angebot"><ArrowLeft size={18} /></button><button type="button" onClick={() => select(active + 1)} aria-label="Nächstes Angebot"><ArrowRight size={18} /></button></div></div>
    </div>
    <div className={styles.notes}><p><Sparkles size={18} /><span><strong>Dein Design. Deine Möglichkeiten.</strong>Die Website-Angebote verbinden individuelle Gestaltung, mobile Umsetzung und technische Sichtbarkeit.</span></p><p><Check size={18} /><span><strong>Drei Monate Begleitung inklusive.</strong>Fehlerbehebung und technische Optimierungen nach dem Start deiner Website.</span></p></div>
    <details className={styles.conditions}><summary>Gut zu wissen: Umfang & Konditionen <span>+</span></summary><div><p>Verfügbarkeit und Leistungsumfang bestätige ich dir im persönlichen Angebot. Die Website-Angebote enthalten technische SEO und maschinenlesbare Inhalte für Google und KI-Anwendungen. Bestimmte Rankings oder Empfehlungen werden nicht versprochen.</p><p>Nach Inbetriebnahme deiner Website sind die Behebung von Fehlern an der gelieferten Umsetzung und laufende technische Optimierungen drei Monate kostenlos enthalten. Neue Funktionen, zusätzliche Seiten und größere Erweiterungen bieten wir separat an.</p><p>Alle genannten Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Hosting, Domain, Lizenzen und weitere laufende Kosten sind nicht pauschal enthalten und werden vor Auftragserteilung ausgewiesen. Individuelle größere Projekte erhalten ein Angebot nach Umfang.</p></div></details>
  </section>
}
