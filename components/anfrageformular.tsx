'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import type { HdLang, HdTexte } from '@/lib/hd-texte'

const COPY = {
  de: {
    send: 'Anfrage senden',
    sending: 'Wird gesendet …',
    mail: 'E-Mail vorbereiten',
    checking: 'Wird vorbereitet …',
    direct: 'Deine Anfrage wird direkt an Issa gesendet.',
    fallback:
      'Öffnet dein Mailprogramm mit der vorbereiteten Anfrage. Dort kannst du sie versenden.',
    success: 'Deine Anfrage ist angekommen. Ich melde mich persönlich bei dir.',
    error:
      'Die Anfrage konnte gerade nicht versendet werden. Deine Angaben bleiben erhalten. Versuche es erneut oder bereite eine E-Mail vor.',
    required: '* Pflichtfelder',
    privacy: 'Datenschutz',
    website: 'Website (bitte leer lassen)',
  },
  en: {
    send: 'Send enquiry',
    sending: 'Sending …',
    mail: 'Prepare email',
    checking: 'Preparing …',
    direct: 'Your enquiry is sent directly to Issa.',
    fallback: 'Opens your email app with a prepared enquiry for you to send.',
    success: 'Your enquiry has arrived. I will reply personally.',
    error:
      'Your enquiry could not be sent just now. Your details are still here. Try again or prepare an email.',
    required: '* Required fields',
    privacy: 'Privacy',
    website: 'Website (leave empty)',
  },
  es: {
    send: 'Enviar consulta',
    sending: 'Enviando …',
    mail: 'Preparar correo',
    checking: 'Preparando …',
    direct: 'Tu consulta se envía directamente a Issa.',
    fallback:
      'Abre tu aplicación de correo con la consulta preparada para que la envíes.',
    success: 'Tu consulta ha llegado. Te responderé personalmente.',
    error:
      'No se ha podido enviar la consulta. Tus datos siguen aquí. Inténtalo de nuevo o prepara un correo.',
    required: '* Campos obligatorios',
    privacy: 'Privacidad',
    website: 'Sitio web (dejar vacío)',
  },
}

export function Anfrageformular({
  f,
  services,
  epost,
  lang,
}: {
  f: HdTexte['kontakt']['formular']
  services: { slug: string; titel: string }[]
  epost: string
  lang: HdLang
}) {
  const parameter = useSearchParams()
  const ausAdresse = parameter.get('leistung') ?? ''
  const bekannt = services.some((l) => l.slug === ausAdresse)

  const [leistung, setLeistung] = useState(bekannt ? ausAdresse : '')
  const [name, setName] = useState('')
  const [absender, setAbsender] = useState('')
  const [nachricht, setNachricht] = useState('')

  const [website, setWebsite] = useState('')
  const [available, setAvailable] = useState<boolean | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')
  const t = COPY[lang]
  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    let active = true
    fetch('/api/contact', { signal: controller.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then((data) => {
        if (active) setAvailable(data.available === true)
      })
      .catch(() => {
        if (active) setAvailable(false)
      })
      .finally(() => clearTimeout(timeout))
    return () => {
      active = false
      controller.abort()
      clearTimeout(timeout)
    }
  }, [])
  const selected = services.find((s) => s.slug === leistung)
  const subject = selected ? `${f.titel}: ${selected.titel}` : f.titel
  const body = [
    selected ? `${f.leistung}: ${selected.titel}` : '',
    `${f.name}: ${name}`,
    `${f.epost}: ${absender}`,
    '',
    nachricht,
  ].join('\n')
  const mailto = `mailto:${epost}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const absenden = async (event: React.FormEvent) => {
    event.preventDefault()
    if (
      website ||
      status === 'sending' ||
      status === 'success' ||
      available === null
    )
      return
    if (!available) {
      window.location.href = mailto
      return
    }
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: absender,
          message: nachricht,
          service: leistung,
          language: lang,
          website,
        }),
        signal: AbortSignal.timeout(20000),
      })
      const data = await response.json()
      if (!response.ok || data.ok !== true) throw new Error('Delivery failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={absenden}
      className="contact-form"
      aria-busy={status === 'sending'}
    >
      <h2>{f.titel}</h2>
      <p className="form-note">{t.required}</p>

      <div>
        <label htmlFor="leistung" className="hd-feld-label">
          {f.leistung}
        </label>
        <select
          id="leistung"
          name="leistung"
          value={leistung}
          onChange={(e) => setLeistung(e.target.value)}
          className="hd-feld"
        >
          <option value="">{f.leistungLeer}</option>
          {services.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.titel}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-field-grid">
        <div>
          <label htmlFor="name" className="hd-feld-label">
            {f.name} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="hd-feld"
          />
        </div>
        <div>
          <label htmlFor="epost" className="hd-feld-label">
            {f.epost} *
          </label>
          <input
            id="epost"
            name="epost"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            /* Adressen tippt niemand als Prosa — die Rechtschreibpruefung
               unterringelt sie nur. */
            spellCheck={false}
            value={absender}
            onChange={(e) => setAbsender(e.target.value)}
            className="hd-feld"
          />
        </div>
      </div>

      <div>
        <label htmlFor="nachricht" className="hd-feld-label">
          {f.nachricht} *
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          placeholder={f.nachrichtHinweis}
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          className="hd-feld"
        />
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">{t.website}</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className="hd-cta px-7 py-3.5 text-[17px]"
          disabled={
            available === null || status === 'sending' || status === 'success'
          }
        >
          {status === 'sending'
            ? t.sending
            : available === null
              ? t.checking
              : available
                ? t.send
                : t.mail}
          <ArrowRight size={18} aria-hidden />
        </button>
        <p className="form-note">
          {available ? t.direct : t.fallback}{' '}
          <a className="form-fallback-link" href="/datenschutz/">
            {t.privacy}
          </a>
        </p>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {(status === 'success' || status === 'error') && (
          <div className="form-status" data-error={status === 'error'}>
            <p>{status === 'success' ? t.success : t.error}</p>
            {status === 'error' && (
              <a className="form-fallback-link" href={mailto}>
                {t.mail}
              </a>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
