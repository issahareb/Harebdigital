'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, Monitor, Smartphone, X } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSelect } from './experience-controls'
import s from './interactive-studio.module.css'

type Goal = 'anfragen' | 'termine' | 'verkaufen'
const goals: { value: Goal; label: string; title: string; body: string; action: string }[] = [
  { value: 'anfragen', label: 'Mehr Anfragen', title: 'Gute Arbeit.\nSichtbar gemacht.', body: 'Zeige dein Angebot. Beantworte die richtigen Fragen. Mach die Anfrage einfach.', action: 'Projekt besprechen' },
  { value: 'termine', label: 'Termine vereinfachen', title: 'Dein Handwerk.\nIhr Wunschtermin.', body: 'Von der passenden Leistung zum Termin. Direkt auf deiner Website.', action: 'Termin auswählen' },
  { value: 'verkaufen', label: 'Produkte verkaufen', title: 'Besondere Dinge.\nEinfach entdeckt.', body: 'Eine klare Auswahl. Ein guter Überblick. Ein kurzer Weg zum Warenkorb.', action: 'Kollektion entdecken' },
]

function SitePreview({ goal, design = 0, device = 'desktop', accent = true, name = 'FORM / STUDIO', industry = 'handwerk' }: { goal: Goal; design?: number; device?: string; accent?: boolean; name?: string; industry?: string }) {
  const [menu, setMenu] = useState(false)
  const [page, setPage] = useState<'start' | 'angebot' | 'kontakt'>('start')
  const [cart, setCart] = useState(0)
  const [basketOpen, setBasketOpen] = useState(false)
  const [previewDay, setPreviewDay] = useState(16)
  const [previewTime, setPreviewTime] = useState('10:00')
  const item = goals.find(item => item.value === goal)!
  const appointments: Record<string, { title: string; label: string; tiles: string[] }> = {
    handwerk: { title: item.title, label: 'HANDWERK MIT WEITBLICK', tiles: ['Sanitär & Bad', 'Heizung & Klima', 'Elektro & Licht'] },
    gastro: { title: 'Dein Tisch.\nIhr Lieblingsplatz.', label: 'GUTE MOMENTE BEGINNEN HIER', tiles: ['Tisch reservieren', 'Anlass auswählen', 'Besuch planen'] },
    dienstleistung: { title: 'Dein Können.\nIhr Wunschtermin.', label: 'ZEIT FÜR DAS WESENTLICHE', tiles: ['Leistung wählen', 'Termin finden', 'Beratung planen'] },
    handel: { title: 'Deine Beratung.\nIhr Wunschtermin.', label: 'PERSÖNLICH GUT BERATEN', tiles: ['Beratung wählen', 'Termin finden', 'Besuch planen'] },
    andere: { title: 'Dein Angebot.\nIhr Wunschtermin.', label: 'PASSEND ZU DEINEM UNTERNEHMEN', tiles: ['Angebot wählen', 'Termin finden', 'Kontakt aufnehmen'] },
  }
  const appointment = appointments[industry] || appointments.handwerk
  return <div className={s.previewViewport} data-device={device}>
    <div className={s.previewSite} data-goal={goal} data-design={design} data-accent={accent}>
      <div className={s.browserBar}><span><i /><i /><i /></span><span>dein-unternehmen.de</span><span>Konzept</span></div>
      <nav className={s.previewNav} aria-label="Navigation der Designvorschau"><span className={s.previewBrand}>{name}</span><button type="button" aria-label={menu ? 'Vorschaumenü schließen' : 'Vorschaumenü öffnen'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={19} /> : <Menu size={19} />}</button></nav>
      {menu && <div className={s.previewMenu}>{(['start', 'angebot', 'kontakt'] as const).map((value, index) => <button type="button" key={value} onClick={() => { setPage(value); setMenu(false) }}><span>0{index + 1}</span>{value === 'start' ? 'Start' : value === 'angebot' ? 'Unser Angebot' : 'Kontakt'}<ArrowUpRight size={17} /></button>)}</div>}
      <div className={s.previewScroll} tabIndex={0} aria-label="Bedienbare Website-Vorschau">
        <AnimatePresence mode="wait" initial={false}><motion.div key={`${goal}-${page}-${design}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
          <div className={s.previewHero}>
            <span className={s.previewEyebrow}>{goal === 'termine' ? appointment.label : goal === 'verkaufen' ? 'AUSGEWÄHLT. FÜR DEINEN ALLTAG.' : 'DEIN ANGEBOT. DEIN AUFTRITT.'}</span>
            <h3>{page === 'kontakt' ? 'Ein guter Anfang?\nEin Gespräch.' : page === 'angebot' ? goal === 'verkaufen' ? 'Weniger suchen.\nMehr entdecken.' : 'Passend zu dir.\nBis ins Detail.' : goal === 'termine' ? appointment.title : item.title}</h3>
            <p>{page === 'kontakt' ? 'Der nächste Schritt bleibt einfach. Stell dir hier den Kontakt zu deinem Unternehmen vor.' : item.body}</p>
            {goal === 'verkaufen' ? <button className={s.previewCta} type="button" onClick={() => setBasketOpen(!basketOpen)}>Warenkorb · {cart}<ArrowUpRight size={17} /></button> : <a className={s.previewCta} href={goal === 'termine' ? '#handwerker-demo' : '#projekt-planen'}>{item.action}<ArrowUpRight size={17} /></a>}
            <div className={s.previewSculpture} aria-hidden><i /><i /><i /><span /></div>
          </div>
          {goal === 'verkaufen' ? <div className={s.shopGrid}>{['Contour Vase', 'Studio Tablett', 'Arc Leuchte'].map((product, index) => <article key={product}><div className={s.productObject} data-product={index}><i /></div><span>OBJEKT / 0{index + 1}</span><h4>{product}</h4><div><strong>{[49, 39, 89][index]} €</strong><button type="button" onClick={() => { setCart(cart + 1); setBasketOpen(true) }} aria-label={`${product} zum Demo-Warenkorb hinzufügen`}>Hinzufügen<ArrowUpRight size={13} /></button></div></article>)}</div> : goal === 'termine' ? <div className={s.miniBooking}><strong>Dein nächster freier Moment.</strong><span>Beispielwoche · Wähle Tag und Zeit</span><div>{[16,17,18,19,20].map((day,index) => <button type="button" key={day} aria-pressed={previewDay === day} onClick={() => setPreviewDay(day)}><small>{['Mo','Di','Mi','Do','Fr'][index]}</small>{day}</button>)}</div><div>{['10:00','11:30','14:00'].map(time => <button type="button" key={time} aria-pressed={previewTime === time} onClick={() => setPreviewTime(time)}>{time}</button>)}</div><p aria-live="polite">Tag {previewDay} · {previewTime} Uhr ausgewählt</p><a href="#handwerker-demo">Komplette Buchung durchspielen<ArrowRight size={14} /></a></div> : <div className={s.previewTiles}>{['Angebot entdecken', 'Projekt beschreiben', 'Kontakt aufnehmen'].map((label,index) => <button type="button" key={label} onClick={() => setPage(index === 2 ? 'kontakt' : 'angebot')}><span>0{index + 1}</span>{label}<ArrowUpRight size={15} /></button>)}</div>}
          {goal === 'verkaufen' && basketOpen && <div className={s.miniBasket} role="status"><strong>Dein Warenkorb <span>{cart} {cart === 1 ? 'Artikel' : 'Artikel'}</span></strong><p>{cart ? 'Deine Auswahl ist im Beispiel-Warenkorb.' : 'Entdecke die Kollektion und füge ein Objekt hinzu.'}</p><span>Shop-Konzept · keine Bestellung</span><button type="button" onClick={() => setBasketOpen(false)}>Weiter entdecken<ArrowRight size={14} /></button></div>}
          <div className={s.previewFoot}><span>Individuell gedacht. Einfach bedient.</span><button type="button" onClick={() => setPage('start')}>Zur Startansicht <ArrowRight size={14} /></button></div>
        </motion.div></AnimatePresence>
      </div>
    </div>
  </div>
}

export function GoalExperience() {
  const [goal, setGoal] = useState<Goal>('anfragen')
  return <section id="website-erleben" className={`${s.section} wrap section-space`} aria-labelledby="experience-title" data-track-section="website-erleben" data-thread-stop>
    <div className={s.sectionTop}><span className="eyebrow">Deine Website kann mehr.</span><span className={s.liveLabel}><i />Antippen & ausprobieren</span></div>
    <div className={s.experienceGrid}>
      <div className={s.experienceCopy}><h2 id="experience-title">Was soll deine Website<br />{' '}für dich erledigen<span>?</span></h2><p>Du wählst das Ziel. Dein Auftritt nimmt Form an.</p>
        <div className={s.goalChoices} aria-label="Ziel deiner Website">{goals.map((item, index) => <button key={item.value} type="button" aria-pressed={goal === item.value} onClick={() => setGoal(item.value)} data-track-id={`experience-goal-${item.value}`}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={19} /></button>)}</div>
        <p className={s.quiet}>Bedienbares Beispielkonzept. Dein Projekt bekommt seinen eigenen Charakter.</p>
      </div>
      <div className={s.previewStage}><SitePreview goal={goal} /><span className={s.stageCaption} aria-live="polite"><Check size={14} />{goals.find(item => item.value === goal)?.label}<span>Deine Auswahl verändert die Vorschau.</span></span></div>
    </div>
    <a className={s.nextChapter} href="#handwerker-demo">Und was passiert nach dem Klick?<ArrowDown size={17} /></a>
  </section>
}

export function LiveDesignLab() {
  const [design, setDesign] = useState(0)
  const [device, setDevice] = useState('desktop')
  const [accent, setAccent] = useState(true)
  const touch = useRef<{ x: number; y: number } | null>(null)
  return <section id="design-ausprobieren" className={`${s.section} wrap section-space`} aria-labelledby="design-lab-title" data-thread-stop data-track-section="design-ausprobieren">
    <div className="section-heading"><div><span className="eyebrow">Design zum Anfassen</span><h2 id="design-lab-title">Ein anderer Look.<br />Dasselbe gute Gefühl.</h2></div><p>Wechsle die Richtung, öffne das Menü und probiere die Vorschau auf dem Handy aus.</p></div>
    <div className={s.labToolbar}><div className={s.pills} aria-label="Designrichtung">{['Klar', 'Räumlich', 'Editorial'].map((name, index) => <button key={name} type="button" aria-pressed={design === index} onClick={() => setDesign(index)}>{name}</button>)}</div><div className={s.labSettings}><button type="button" className={s.accentToggle} aria-pressed={accent} onClick={() => setAccent(!accent)}><i data-active={accent} />Lime-Akzent</button><div className={s.deviceSwitch} aria-label="Vorschaugröße"><button type="button" aria-label="Desktop-Vorschau" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}><Monitor size={19} /></button><button type="button" aria-label="Handy-Vorschau" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}><Smartphone size={19} /></button></div></div></div>
    <div className={s.labStage} onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY } }} onTouchEnd={event => { if (!touch.current) return; const point = event.changedTouches[0]; const dx = point.clientX - touch.current.x; if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(point.clientY - touch.current.y) * 1.8) setDesign(current => (current + (dx < 0 ? 1 : 2)) % 3); touch.current = null }} onTouchCancel={() => { touch.current = null }}><SitePreview goal="anfragen" design={design} device={device} accent={accent} /></div>
    <div className={s.labFoot}><p aria-live="polite">0{design + 1} / 03 · {['Klar', 'Räumlich', 'Editorial'][design]}<span>Eigenes Beispielkonzept · Menü und Inhalte sind bedienbar.</span></p><a href="#projekt-planen" className="text-link">Deine Richtung finden<ArrowUpRight size={17} /></a></div>
  </section>
}

const industries = [{ value: 'handwerk', label: 'Handwerk' }, { value: 'gastro', label: 'Gastronomie' }, { value: 'dienstleistung', label: 'Dienstleistung' }, { value: 'handel', label: 'Handel & Onlineshop' }, { value: 'andere', label: 'Etwas anderes' }]
const features = ['Kontaktformular', 'Terminbuchung', 'Online-Shop', 'KI-Telefonassistenz', 'Automatisierte Abläufe', 'Suchmaschinenoptimierung']

export function ProjectConfigurator() {
  const [step, setStep] = useState(0)
  const [industry, setIndustry] = useState('handwerk')
  const [goal, setGoal] = useState<Goal>('anfragen')
  const [selected, setSelected] = useState<string[]>(['Kontaktformular'])
  const [note, setNote] = useState('')
  const reduced = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  useEffect(() => { if (mounted.current) panel.current?.focus({ preventScroll: true }); mounted.current = true }, [step])
  const industryName = industries.find(item => item.value === industry)!.label
  const goalName = goals.find(item => item.value === goal)!.label
  const brief = `Mein Projekt mit Hareb Digital\n\nBranche: ${industryName}\nZiel: ${goalName}\nGewünschte Funktionen: ${selected.join(', ') || 'Noch gemeinsam festlegen'}${note.trim() ? `\n\nMeine Idee: ${note.trim()}` : ''}`
  return <section id="projekt-planen" className={`${s.section} wrap section-space`} aria-labelledby="configurator-title" data-thread-stop data-track-section="projekt-planen">
    <div className="section-heading"><div><span className="eyebrow">Deine Idee nimmt Form an</span><h2 id="configurator-title">Was bauen wir<br />für dich?</h2></div><p>Drei kurze Schritte. Eine konkrete Richtung für unser erstes Gespräch.</p></div>
    <div className={s.configGrid}><div className={s.configControls}><ol className={s.stepper} aria-label="Projektplanung">{['Branche', 'Ziel', 'Funktionen'].map((name, index) => <li key={name} data-active={step === index} data-complete={step > index}><button type="button" onClick={() => setStep(index)} aria-current={step === index ? 'step' : undefined}><span>{step > index ? <Check size={14} /> : `0${index + 1}`}</span>{name}</button></li>)}</ol>
      <div ref={panel} tabIndex={-1} className={s.configPanel}>
        <AnimatePresence mode="wait" initial={false}><motion.div key={step} initial={{ opacity: 0, x: reduced ? 0 : 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -10 }} transition={{ duration: reduced ? 0 : 0.18 }}>
          {step === 0 ? <><h3>In welcher Branche bist du unterwegs?</h3><AnimatedSelect label="Deine Branche" options={industries} value={industry} onChange={setIndustry} /><p className={s.quiet}>Ob neuer Betrieb oder nächster großer Schritt: Wir starten bei deinem Unternehmen.</p></> : step === 1 ? <><h3>Was möchtest du erreichen?</h3><div className={s.goalChoices}>{goals.map(item => <button key={item.value} type="button" aria-pressed={goal === item.value} onClick={() => setGoal(item.value)}>{item.label}{goal === item.value ? <Check size={18} /> : <ArrowUpRight size={18} />}</button>)}</div></> : <><h3>Was soll deine Website können?</h3><div className={s.features}>{features.map(feature => <label key={feature}><input type="checkbox" checked={selected.includes(feature)} onChange={() => setSelected(current => current.includes(feature) ? current.filter(item => item !== feature) : [...current, feature])} /><span>{feature}</span><Check size={15} aria-hidden /></label>)}</div><label className={s.inputLabel}>Noch eine Idee? <span>Optional</span><textarea value={note} onChange={event => setNote(event.target.value)} maxLength={600} rows={3} placeholder="Was ist dir besonders wichtig?" /></label></>}
        </motion.div></AnimatePresence>
      </div>
      <div className={s.wizardActions}>{step > 0 && <button type="button" className={s.backButton} onClick={() => setStep(step - 1)}>Zurück</button>}{step < 2 ? <button type="button" className="button" onClick={() => setStep(step + 1)}>Weiter<ArrowRight size={17} /></button> : <Link href={`/kontakt/?leistung=${goal === 'verkaufen' ? 'webanwendungen' : 'neue-website'}&projekt=${encodeURIComponent(brief)}`} className="button" data-track-id="project-configurator-enquire">Projekt besprechen<ArrowUpRight size={18} /></Link>}</div>
    </div><div className={s.configResult}><span className="eyebrow">Dein Projekt / Live-Vorschau</span><SitePreview goal={goal} industry={industry} name={`${industryName.toUpperCase()} / DEIN AUFTRITT`} /><div className={s.brief} aria-live="polite"><span>{industryName}</span><strong>{goalName}</strong><p>{selected.join(' · ') || 'Funktionen legen wir gemeinsam fest.'}</p></div><p className={s.quiet}>Deine Auswahl wird in die Anfrage übernommen. Du kannst dort alles ergänzen und selbst absenden.</p></div></div>
  </section>
}

/** One passive, rAF-batched scroll listener. No continuous render loop or scroll interception. */
export function ExperienceThread() {
  const root = useRef<SVGSVGElement>(null)
  const path = useRef<SVGPathElement>(null)
  const light = useRef<SVGPathElement>(null)
  const dot = useRef<SVGCircleElement>(null)
  useEffect(() => {
    const svg = root.current, line = path.current, glow = light.current, point = dot.current
    const main = document.querySelector<HTMLElement>('.home-compact')
    if (!svg || !line || !glow || !point || !main) return
    const stops = [...main.querySelectorAll<HTMLElement>('[data-thread-stop]')]
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, length = 0, start = 0, height = 0
    let touchTimer: ReturnType<typeof setTimeout> | undefined
    const respond = (event: PointerEvent) => {
      if (preference.matches || !(event.target instanceof Element) || !event.target.closest('[data-thread-stop]')) return
      svg.dataset.touched = 'true'
      clearTimeout(touchTimer)
      touchTimer = setTimeout(() => { delete svg.dataset.touched }, 500)
    }
    const draw = () => {
      frame = 0
      if (document.hidden || !height) return
      const progress = Math.max(0, Math.min(1, (scrollY + innerHeight * 0.55 - start) / height))
      glow.style.strokeDasharray = `${length}`
      glow.style.strokeDashoffset = `${length * (1 - (preference.matches ? 1 : progress))}`
      const at = line.getPointAtLength(length * progress)
      point.setAttribute('cx', String(at.x)); point.setAttribute('cy', String(at.y))
      svg.style.setProperty('--thread-opacity', preference.matches ? '.4' : '.85')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw) }
    const measure = () => {
      if (stops.length < 2) return
      start = scrollY + stops[0].getBoundingClientRect().top
      height = stops[stops.length - 1].getBoundingClientRect().bottom + scrollY - start
      svg.style.top = `${stops[0].offsetTop}px`; svg.style.height = `${height}px`
      svg.setAttribute('viewBox', `0 0 32 ${height}`)
      const points = stops.map((stop, index) => ({ x: index % 2 ? 21 : 10, y: scrollY + stop.getBoundingClientRect().top - start + 30 }))
      const d = points.map((at, index) => index === 0 ? `M ${at.x} ${at.y}` : `C ${points[index - 1].x} ${points[index - 1].y + (at.y - points[index - 1].y) / 2} ${at.x} ${at.y - (at.y - points[index - 1].y) / 2} ${at.x} ${at.y}`).join(' ')
      line.setAttribute('d', d); glow.setAttribute('d', d); length = line.getTotalLength(); schedule()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(main)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    preference.addEventListener('change', schedule)
    document.addEventListener('visibilitychange', schedule)
    main.addEventListener('pointerdown', respond, { passive: true })
    measure()
    return () => { cancelAnimationFrame(frame); clearTimeout(touchTimer); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure); preference.removeEventListener('change', schedule); document.removeEventListener('visibilitychange', schedule); main.removeEventListener('pointerdown', respond) }
  }, [])
  return <svg ref={root} className={s.thread} aria-hidden="true" preserveAspectRatio="none" style={{ '--thread-opacity': 0 } as CSSProperties}><path ref={path} className={s.threadBase} /><path ref={light} className={s.threadLight} /><circle ref={dot} r="4" className={s.threadPoint} /></svg>
}
