'use client'

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Mail, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSelect } from './experience-controls'
import { addDays, dateKey, demoSlots, isBookable, parseDate, trades } from '@/lib/booking-demo'
import s from './interactive-studio.module.css'

function CalendarPicker({ value, today, onChange }: { value: string; today: Date; onChange: (value: string) => void }) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const days = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [focused, setFocused] = useState('')
  const reduced = useReducedMotion()
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const monthLabel = month.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
  const max = addDays(today, 60)
  const canPrev = dateKey(first) > dateKey(new Date(today.getFullYear(), today.getMonth(), 1))
  const canNext = month.getFullYear() * 12 + month.getMonth() < max.getFullYear() * 12 + max.getMonth()
  const close = () => { setOpen(false); trigger.current?.focus({ preventScroll: true }) }
  const show = () => {
    const firstAvailable = Array.from({ length: 60 }, (_, index) => dateKey(addDays(today, index + 1))).find(day => isBookable(day, today))!
    const selected = value || firstAvailable
    const date = parseDate(selected)
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1)); setFocused(selected); setOpen(true)
  }
  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [open])
  useEffect(() => { if (open && focused) days.current?.querySelector<HTMLButtonElement>(`[data-day="${focused}"]`)?.focus({ preventScroll: true }) }, [focused, open])
  const changeMonth = (offset: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1))
  }
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, day: string) => {
    const offset = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 } as Record<string, number>)[event.key]
    if (!offset) return
    event.preventDefault()
    let next = addDays(parseDate(day), offset)
    for (let i = 0; i < 7 && !isBookable(dateKey(next), today); i++) next = addDays(next, offset > 0 ? 1 : -1)
    if (!isBookable(dateKey(next), today)) return
    setMonth(new Date(next.getFullYear(), next.getMonth(), 1)); setFocused(dateKey(next))
  }
  return <div ref={root} className={s.select} data-open={open} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
    <span className={s.fieldLabel} id={`${id}-label`}>Wunschdatum</span>
    <button ref={trigger} type="button" className={s.selectTrigger} aria-haspopup="dialog" aria-expanded={open} aria-controls={`${id}-calendar`} aria-labelledby={`${id}-label ${id}-value`} onClick={() => open ? close() : show()}><span id={`${id}-value`}>{value ? parseDate(value).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Tag auswählen'}</span><CalendarDays size={18} aria-hidden /></button>
    <AnimatePresence initial={false}>{open && <motion.div className={`${s.selectMenu} ${s.calendarMenu}`} id={`${id}-calendar`} role="dialog" aria-label="Wunschdatum auswählen" initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -5 }} transition={{ duration: reduced ? 0 : 0.18 }} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close() } }}>
      <div className={s.calendarHeading}><button type="button" aria-label="Vorheriger Monat" disabled={!canPrev} onClick={() => changeMonth(-1)}><ChevronLeft size={18} /></button><strong aria-live="polite">{monthLabel}</strong><button type="button" aria-label="Nächster Monat" disabled={!canNext} onClick={() => changeMonth(1)}><ChevronRight size={18} /></button></div>
      <div className={s.calendarWeek} aria-hidden>{['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => <span key={day}>{day}</span>)}</div>
      <div ref={days} className={s.calendarDays} role="group" aria-label={monthLabel}>
        {Array.from({ length: (first.getDay() + 6) % 7 }, (_, index) => <span key={`blank-${index}`} />)}
        {Array.from({ length: last.getDate() }, (_, index) => { const date = new Date(month.getFullYear(), month.getMonth(), index + 1); const key = dateKey(date); return <button type="button" key={key} data-day={key} disabled={!isBookable(key, today)} aria-pressed={value === key} aria-label={date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} onKeyDown={event => keyboard(event, key)} onClick={() => { onChange(key); close() }}>{index + 1}</button> })}
      </div><p>Beispielverfügbarkeit · Montag bis Freitag · nächste 60 Tage</p><button type="button" className={s.calendarClose} onClick={close}>Kalender schließen</button>
    </motion.div>}</AnimatePresence>
  </div>
}

const exampleCustomer = { name: 'Alex Beispiel', email: 'alex@example.com', phone: '0201 123456', address: 'Beispielstraße 12, 45127 Essen', note: 'Die Küchenarmatur soll ausgetauscht werden.' }
type CustomerField = keyof typeof exampleCustomer

export function HandwerkerDemo() {
  const [today, setToday] = useState<Date | null>(null)
  const [step, setStep] = useState(0)
  const [venue, setVenue] = useState<'customer' | 'business'>('customer')
  const [trade, setTrade] = useState('sanitaer')
  const [service, setService] = useState('armatur')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [customer, setCustomer] = useState(exampleCustomer)
  const editedFields = useRef(new Set<CustomerField>())
  const clearedFields = useRef(new Set<CustomerField>())
  const venueAddress = venue === 'business' ? 'Beispielfiliale · Musterweg 8, 45127 Essen' : customer.address
  const [stage, setStage] = useState(-1)
  const [error, setError] = useState('')
  const reduced = useReducedMotion()
  const form = useRef<HTMLFormElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const started = useRef(false)
  const item = trades.find(item => item.value === trade)!
  const selected = item.services.find(item => item.value === service)!
  const slots = demoSlots(date, selected.duration)
  const steps = ['Bereich & Leistung', 'Datum & Uhrzeit', 'Deine Angaben', 'Überblick']
  const completed = stage === 3
  const busy = stage >= 0 && !completed
  useEffect(() => { setToday(new Date()) }, [])
  useEffect(() => { if (started.current) title.current?.focus({ preventScroll: true }); started.current = true }, [step, completed])
  useEffect(() => {
    if (stage < 0 || stage >= 3) return
    const timer = setTimeout(() => setStage(stage + 1), reduced ? 120 : 700)
    return () => clearTimeout(timer)
  }, [stage, reduced])
  const dateLabel = date ? parseDate(date).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Dein Wunschtag'
  const end = time ? (() => { const total = Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) + selected.duration; return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}` })() : ''
  const validAppointment = () => !!today && isBookable(date, today) && slots.some(slot => slot.value === time && !slot.disabled)
  const next = (event: FormEvent) => {
    event.preventDefault(); setError('')
    if (busy || completed) return
    if (step === 1 && !validAppointment()) { setError('Wähle bitte einen verfügbaren Tag und eine Uhrzeit aus.'); return }
    if (step === 2 && !form.current?.reportValidity()) return
    if (step === 3) {
      const now = new Date()
      if (!isBookable(date, now) || !validAppointment()) { setToday(now); setDate(''); setTime(''); setStep(1); setError('Bitte wähle einen neuen verfügbaren Termin.'); return }
      setStage(0)
    } else setStep(step + 1)
  }
  const change = (key: CustomerField, value: string) => {
    editedFields.current.add(key)
    clearedFields.current.delete(key)
    setCustomer(current => ({ ...current, [key]: value }))
  }
  const focusExample = (key: CustomerField) => {
    if (editedFields.current.has(key) || customer[key] !== exampleCustomer[key]) return
    clearedFields.current.add(key)
    setCustomer(current => ({ ...current, [key]: '' }))
  }
  const blurExample = (key: CustomerField) => {
    if (!clearedFields.current.delete(key)) return
    setCustomer(current => ({ ...current, [key]: exampleCustomer[key] }))
  }
  const reset = () => { setStage(-1); setStep(0); setVenue('customer'); setDate(''); setTime(''); setError(''); setToday(new Date()); editedFields.current.clear(); clearedFields.current.clear(); setCustomer(exampleCustomer) }

  return <section id="handwerker-demo" className={`${s.section} ${s.bookingSection} wrap section-space`} aria-labelledby="booking-demo-title" data-thread-stop data-track-section="handwerker-demo">
    <div className="section-heading"><div><span className="eyebrow">Vom Klick zum geordneten Termin</span><h2 id="booking-demo-title">Du machst dein Handwerk.<br />Deine Website den Termin.</h2></div><p>Spiele eine Buchung durch. Sieh direkt, wie aus einer Auswahl ein geplanter Einsatz wird.</p></div>
    <div className={s.demoNotice}><span className={s.liveLabel}><i />Interaktive Demo</span><p>Keine echte Buchung. Keine E-Mail wird versendet. Nutze die Beispieldaten; Eingaben werden nicht gespeichert.</p></div>
    <div className={s.bookingGrid}>
      <form ref={form} onSubmit={next} className={s.bookingForm} data-demo-form="true" data-track-ignore noValidate aria-busy={busy}>
        <ol className={s.stepper} aria-label="Schritte der Terminbuchung">{steps.map((label, index) => <li key={label} data-active={step === index && !completed} data-complete={step > index || completed}><button type="button" disabled={index > step || busy || completed} aria-current={step === index && !completed ? 'step' : undefined} onClick={() => { setStep(index); setError('') }}><span>{step > index || completed ? <Check size={14} /> : `0${index + 1}`}</span><span>{label}</span></button></li>)}</ol>
        <AnimatePresence mode="wait" initial={false}><motion.div key={completed ? 'complete' : step} onAnimationComplete={() => title.current?.focus({ preventScroll: true })} className={s.bookingPanel} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.2 }}>
          <h3 ref={title} tabIndex={-1}>{completed ? 'So einfach kommt der Termin an.' : ['Was steht bei dir an?', 'Wann passt es dir?', 'Wer und wo?', 'Alles passend?'][step]}</h3>
          {completed ? <div className={s.success}><span className={s.successMark}><Check size={30} /></span><p>Dein Demo-Termin ist eingeplant.</p><span>{dateLabel} · {time} bis {end} Uhr</span><p className={s.quiet}>In deinem echten System greifen Website, Kalender und Benachrichtigung passend zu deinem Betrieb ineinander.</p><Link className="text-link" href="/kontakt/?leistung=automatisierung&projekt=Ich%20m%C3%B6chte%20eine%20Handwerker-Terminbuchung%20mit%20Bereichsauswahl%2C%20Leistungen%2C%20Kalender%20und%20Dashboard%20f%C3%BCr%20meinen%20Betrieb.">So etwas für meinen Betrieb<ArrowUpRight size={17} /></Link></div> : step === 0 ? <><AnimatedSelect label="Bereich" options={trades} value={trade} onChange={value => { const next = trades.find(item => item.value === value)!; setTrade(value); setService(next.services[0].value); setTime(''); change('note', '') }} /><AnimatedSelect label="Leistung" options={item.services.map(service => ({ ...service, hint: `Ca. ${service.duration} Minuten` }))} value={service} onChange={value => { setService(value); setTime('') }} /><div className={s.duration}><Clock3 size={17} /><span>Für dieses Beispiel planen wir <strong>{selected.duration} Minuten</strong> ein.</span></div></> : step === 1 ? <><div className={s.bookingFields}>{today ? <CalendarPicker value={date} today={today} onChange={value => { setDate(value); setTime(''); setError('') }} /> : <p role="status">Kalender wird vorbereitet.</p>}<AnimatedSelect label="Uhrzeit" options={slots} value={time} onChange={value => { setTime(value); setError('') }} disabled={!date} placeholder={date ? 'Zeit auswählen' : 'Zuerst einen Tag wählen'} /></div><p className={s.quiet}>Die angezeigten Zeiten sind simuliert und berücksichtigen die Dauer deiner gewählten Leistung.</p></> : step === 2 ? <><fieldset className={s.venueChoice}><legend>Wo findet der Termin statt?</legend><div>{(['customer', 'business'] as const).map(value => <button type="button" key={value} aria-pressed={venue === value} onClick={() => setVenue(value)}><strong>{value === 'customer' ? 'Bei dir vor Ort' : 'In unserer Filiale'}</strong><span>{value === 'customer' ? 'Wir kommen zur Einsatzadresse.' : 'Du kommst zum Unternehmen.'}</span><Check size={16} aria-hidden /></button>)}</div></fieldset>{venue === 'business' && <p className={s.quiet}>{venueAddress}</p>}<p className={s.quiet}>Beispieldaten sind schon eingetragen. Tippe ein Feld an, um direkt eigene Angaben einzugeben.</p><div className={s.bookingFields}><label className={s.inputLabel}>Name *<input name="demo-name" autoComplete="off" value={customer.name} placeholder={exampleCustomer.name} onFocus={() => focusExample('name')} onBlur={() => blurExample('name')} required minLength={2} maxLength={120} onChange={event => change('name', event.target.value)} /></label><label className={s.inputLabel}>E-Mail *<input name="demo-email" autoComplete="off" type="email" value={customer.email} placeholder={exampleCustomer.email} onFocus={() => focusExample('email')} onBlur={() => blurExample('email')} required maxLength={254} onChange={event => change('email', event.target.value)} /></label></div><label className={s.inputLabel}>Telefon <span>Optional</span><input name="demo-phone" type="tel" autoComplete="off" value={customer.phone} placeholder={exampleCustomer.phone} onFocus={() => focusExample('phone')} onBlur={() => blurExample('phone')} maxLength={40} onChange={event => change('phone', event.target.value)} /></label>{venue === 'customer' && <label className={s.inputLabel}>Einsatzadresse *<input name="demo-address" autoComplete="off" value={customer.address} placeholder={exampleCustomer.address} onFocus={() => focusExample('address')} onBlur={() => blurExample('address')} required minLength={8} maxLength={240} onChange={event => change('address', event.target.value)} /></label>}<label className={s.inputLabel}>Was sollten wir wissen? <span>Optional</span><textarea name="demo-note" value={customer.note} placeholder={exampleCustomer.note} onFocus={() => focusExample('note')} onBlur={() => blurExample('note')} maxLength={500} rows={2} onChange={event => change('note', event.target.value)} /></label></> : <><dl className={s.review}><div><dt>Bereich & Leistung</dt><dd>{item.label}<strong>{selected.label}</strong></dd><button type="button" onClick={() => setStep(0)} aria-label="Bereich und Leistung ändern">Ändern</button></div><div><dt>Termin</dt><dd>{dateLabel}<strong>{time} bis {end} Uhr · {selected.duration} Min.</strong></dd><button type="button" onClick={() => setStep(1)} aria-label="Termin ändern">Ändern</button></div><div><dt>Kontaktdaten</dt><dd>{customer.name}<strong>{customer.email}</strong>{customer.phone && <span>{customer.phone}</span>}<span>{venue === 'customer' ? 'Beim Kunden' : 'In der Filiale'} · {venueAddress}</span>{customer.note && <span>{customer.note}</span>}</dd><button type="button" onClick={() => setStep(2)} aria-label="Kontaktdaten ändern">Ändern</button></div></dl><p className={s.quiet}>Mit dem nächsten Klick spielst du den Ablauf durch. Es entsteht kein echter Auftrag.</p></>}
        </motion.div></AnimatePresence>
        {error && <p className={s.error} role="alert">{error}</p>}
        <div className={s.wizardActions}>{completed ? <button type="button" className={s.backButton} onClick={reset}><RotateCcw size={15} />Noch einmal ausprobieren</button> : <>{step > 0 && <button type="button" className={s.backButton} disabled={busy} onClick={() => { setStep(step - 1); setError('') }}><ArrowLeft size={15} />Zurück</button>}<button type="submit" className="button" disabled={busy || !today} data-track-id={`booking-demo-step-${step}`}>{busy ? 'Demo läuft …' : step === 3 ? 'Demo-Buchung abschließen' : 'Weiter'}{step === 3 ? <Check size={17} /> : <ArrowRight size={17} />}</button></>}</div>
      </form>
      <aside className={s.dashboard} aria-label="Simuliertes Handwerker-Dashboard"><div className={s.dashboardTop}><span>DEIN BETRIEB / ÜBERSICHT</span><span className={s.liveLabel}><i />Demo</span></div><h3>Gut geplant.<br />Alles an einem Ort.</h3><div className={s.dashboardDate}><CalendarDays size={19} /><span>{date ? dateLabel : 'Dein nächster Einsatz'}<small>{time ? `${time} bis ${end} Uhr` : 'Wähle links deinen Wunschtermin.'}</small></span></div>
        <div className={s.appointment} data-confirmed={completed}><span className={s.appointmentStatus}>{completed ? 'Demo-Termin bestätigt' : stage >= 0 ? 'Wird eingeplant …' : 'Deine Auswahl'}</span><strong>{selected.label}</strong><p>{item.label} · {selected.duration} Minuten</p><div className={s.appointmentLine}><i />{stage >= 0 ? customer.name : 'Beispielkunde'}<span>{time || '—'}</span></div>{stage >= 0 && <p className={s.dashboardAddress}>{venueAddress}</p>}</div>
        <ol className={s.pipeline} aria-label="Simulierter Ablauf">{['Anfrage strukturiert erfasst', 'Termin im Dashboard eingeplant', 'Bestätigung vorbereitet'].map((label, index) => <li key={label} data-done={stage > index} data-running={stage === index}><span>{stage > index ? <Check size={13} /> : `0${index + 1}`}</span>{label}</li>)}</ol>
        <div className={s.emailPreview} aria-live="polite">{completed ? <><Mail size={20} /><div><strong>So sieht die Bestätigung aus</strong><p>Hallo {customer.name}, dein Termin für „{selected.label}“ ist am {dateLabel} um {time} Uhr eingeplant.</p><small>Simulierte Nachricht · nicht versendet</small></div></> : <><ChevronDown size={18} /><p>{busy ? 'Die Schritte werden gerade durchgespielt.' : 'Schließe die Demo ab und erlebe den gesamten Ablauf.'}</p></>}</div>
      </aside>
    </div>
  </section>
}
