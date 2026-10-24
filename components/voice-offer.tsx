'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Phone, LayoutDashboard, Mail, Check, SlidersHorizontal } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { localizedPath } from '@/lib/locale'
import { marke } from '@/lib/marke'
import styles from './voice-offer.module.css'

const copy = {
  de: {
    label: 'KI-Telefonassistenz für dein Unternehmen', title: 'Du arbeitest.\nDeine KI nimmt ab.',
    intro: 'Deine Leistungen. Dein Wissen. Dein eigener Telefonagent. Ich entwickle für dein Unternehmen eine KI-Telefonassistenz, die Fragen beantwortet, Anliegen aufnimmt und Rückrufwünsche erfasst.',
    features: [
      ['Auf deinen Betrieb abgestimmt', 'Mit den Informationen, Leistungen und Abläufen deines Unternehmens.'],
      ['Dein eigenes Dashboard', 'Anfragen einsehen, filtern und verwalten. Rückrufe und Bearbeitungsstatus im Blick behalten.'],
      ['E-Mail, Dashboard oder beides', 'Neue Anfragen direkt per E-Mail erhalten oder zentral im Dashboard bearbeiten. Du bestimmst den Ablauf.'],
    ],
    cta: 'Eigenen KI-Agenten anfragen', demo: 'Probiere es aus. Ruf meinen KI-Agenten an.', call: 'LUKAS jetzt anrufen', hint: 'Frag zum Beispiel: „Was kann Hareb Digital für mein Unternehmen tun?“', costs: 'Du sprichst mit einer KI. Es gelten die Telefonkosten deines Tarifs.',
    preview: 'So könnte deine Anfragenübersicht aussehen', dashboard: 'Dein Dashboard', mail: 'Per E-Mail', both: 'Beides', enquiries: 'Anfragen im Blick', today: 'Beispielansicht', new: 'Neu', progress: 'In Bearbeitung', done: 'Erledigt', rows: ['Rückruf zur Website', 'Frage zu deinen Leistungen', 'Terminwunsch aufgenommen'], times: ['vor 2 Min.', 'vor 18 Min.', 'vor 42 Min.'], emailTitle: 'Neue Telefonanfrage', emailBody: 'Anliegen, Rückrufnummer und Zusammenfassung direkt in deinem Postfach.', routeLabel: 'Beispiel für den Eingang neuer Anfragen', route: ['Anruf', 'Deine KI', 'E-Mail', 'Dashboard'], scope: 'Funktionsumfang und Anbindungen stimmen wir passend zu deinem Betrieb ab.',
  },
  en: {
    label: 'AI phone assistance for your business', title: 'You work.\nYour AI answers.',
    intro: 'Your services. Your knowledge. Your own phone agent. I build AI phone assistance for your business that answers questions, captures enquiries and records callback requests.',
    features: [['Built around your business', 'With your company’s information, services and workflows.'], ['Your own dashboard', 'View, filter and manage enquiries. Keep track of callbacks and their status.'], ['Email, dashboard or both', 'Receive new enquiries by email or manage them centrally in your dashboard. You choose the workflow.']],
    cta: 'Enquire about your own AI agent', demo: 'Try it out. Call my AI agent.', call: 'Call LUKAS now', hint: 'Try asking: “What can Hareb Digital do for my business?”', costs: 'You will be speaking with AI. Your usual call charges apply.',
    preview: 'An example of your enquiry overview', dashboard: 'Your dashboard', mail: 'By email', both: 'Both', enquiries: 'Enquiries at a glance', today: 'Example view', new: 'New', progress: 'In progress', done: 'Done', rows: ['Website callback request', 'Question about your services', 'Appointment request received'], times: ['2 min. ago', '18 min. ago', '42 min. ago'], emailTitle: 'New phone enquiry', emailBody: 'The enquiry, callback number and summary delivered to your inbox.', routeLabel: 'Example enquiry delivery channel', route: ['Call', 'Your AI', 'Email', 'Dashboard'], scope: 'Features and integrations are agreed to suit your business.',
  },
  es: {
    label: 'Asistencia telefónica con IA para tu empresa', title: 'Tú trabajas.\nTu IA responde.',
    intro: 'Tus servicios. Tu información. Tu propio agente telefónico. Desarrollo un asistente de IA para tu empresa que responde preguntas, recoge consultas y registra solicitudes de devolución de llamada.',
    features: [['Adaptado a tu empresa', 'Con la información, los servicios y los procesos de tu negocio.'], ['Tu propio panel', 'Consulta, filtra y gestiona solicitudes. Controla las devoluciones de llamada y su estado.'], ['Correo, panel o ambos', 'Recibe nuevas consultas por correo o gestiónalas desde tu panel. Tú eliges el proceso.']],
    cta: 'Solicitar mi propio agente de IA', demo: 'Pruébalo. Llama a mi agente de IA.', call: 'Llamar a LUKAS', hint: 'Pregunta: «¿Qué puede hacer Hareb Digital por mi negocio?»', costs: 'Hablarás con una IA. Se aplican las tarifas habituales de tu operador.',
    preview: 'Ejemplo de tu panel de consultas', dashboard: 'Tu panel', mail: 'Por correo', both: 'Ambos', enquiries: 'Tus consultas de un vistazo', today: 'Vista de ejemplo', new: 'Nueva', progress: 'En curso', done: 'Resuelta', rows: ['Devolver llamada sobre la web', 'Pregunta sobre tus servicios', 'Solicitud de cita recibida'], times: ['hace 2 min.', 'hace 18 min.', 'hace 42 min.'], emailTitle: 'Nueva consulta telefónica', emailBody: 'La consulta, el número de contacto y el resumen en tu correo.', routeLabel: 'Ejemplo del canal de recepción', route: ['Llamada', 'Tu IA', 'Correo', 'Panel'], scope: 'Acordamos las funciones y conexiones según tu negocio.',
  },
}

export function VoiceOffer({ lang }: { lang: HdLang }) {
  const t = copy[lang]
  const [channel, setChannel] = useState<'dashboard' | 'mail' | 'both'>('dashboard')
  const icons = [SlidersHorizontal, LayoutDashboard, Mail]
  return <section id="ki-telefonie" className={`${styles.section} wrap section-space`} aria-labelledby="ki-telefonie-title" data-track-section="ki-telefonie">
    <div className={styles.shell}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{t.label}</span>
        <h2 id="ki-telefonie-title">{t.title}</h2>
        <p className={styles.intro}>{t.intro}</p>
        <ul className={styles.features}>{t.features.map(([title, detail], i) => { const Icon = icons[i]; return <li key={title}><Icon size={20} strokeWidth={1.5} /><div><h3>{title}</h3><p>{detail}</p></div></li> })}</ul>
        <Link className={styles.cta} href={`${localizedPath(lang, '/kontakt/')}?leistung=automatisierung&angebot=ki-telefonie`} data-track-id="voice-business-enquiry">{t.cta}<ArrowUpRight size={19} /></Link>
        <p className={styles.scope}>{t.scope}</p>
      </div>
      <div className={styles.experience}>
        <div className={styles.dashboard}>
          <div className={styles.dashboardTop}><LayoutDashboard size={17} /><span>{t.enquiries}</span><small>{t.today}</small></div>
          <div className={styles.channelChoice} role="group" aria-label={t.routeLabel}>{(['dashboard', 'mail', 'both'] as const).map(value => <button key={value} type="button" aria-pressed={channel === value} onClick={() => setChannel(value)}>{t[value]}</button>)}</div>
          <div className={styles.previewContent}>
            {channel !== 'mail' && <div className={styles.requestList}>{t.rows.map((title, index) => <div className={styles.request} key={title}><span className={styles.requestIcon}>{index === 2 ? <Check size={14} /> : <Phone size={14} />}</span><div><strong>{title}</strong><small>{t.times[index]}</small></div><span className={styles.status} data-state={index}>{[t.new, t.progress, t.done][index]}</span></div>)}</div>}
            {channel !== 'dashboard' && <div className={styles.email}><Mail size={21} /><div><strong>{t.emailTitle}</strong><p>{t.emailBody}</p></div><Check size={15} /></div>}
          </div>
          <p className={styles.previewLabel}>{t.preview}</p>
        </div>
        <div className={styles.demo}>
          <div className={styles.demoTitle}><span className={styles.phoneIcon}><Phone size={21} /></span><h3>{t.demo}</h3></div>
          <p>{t.hint}</p>
          <a href={`tel:${marke.telefon.replace(/\s/g, '')}`} className={styles.call} id="lukas-demo-anrufen" data-track="lukas-demo-call" data-track-id="lukas-demo-call"><span>{t.call}<small>{marke.telefon}</small></span><ArrowUpRight size={23} /></a>
          <small className={styles.costs}>{t.costs}</small>
        </div>
      </div>
    </div>
  </section>
}
