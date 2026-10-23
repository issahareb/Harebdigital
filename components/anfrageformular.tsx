'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import type { HdTexte } from '@/lib/hd-texte'

/** Sends through our own API. A success message requires provider acceptance. */
export function Anfrageformular({
  f,
  services,
  epost,
  privacyPath,
}: {
  f: HdTexte['kontakt']['formular']
  services: { slug: string; titel: string }[]
  epost: string
  privacyPath: string
}) {
  const parameter = useSearchParams()
  const ausAdresse = parameter.get('leistung') ?? ''
  const bekannt = services.some((l) => l.slug === ausAdresse)

  const [leistung, setLeistung] = useState(bekannt ? ausAdresse : '')
  const [name, setName] = useState('')
  const [absender, setAbsender] = useState('')
  const offerMessages: Record<string, string> = {
    '0': 'Ich interessiere mich für das begrenzte Einstiegsangebot: Landingpage für 490 € einmalig.\n\nMein Projekt: ',
    '1': 'Ich interessiere mich für das begrenzte Einstiegsangebot: Unternehmenswebsite für 890 € einmalig.\n\nMein Projekt: ',
    '2': 'Ich interessiere mich für das begrenzte Einstiegsangebot: Terminwidget für 490 € einmalig.\n\nMein Projekt: ',
    '3': 'Ich interessiere mich für das begrenzte Einstiegsangebot: Website für 590 € einmalig mit laufender Betreuung. Bitte nennen Sie mir auch die monatlichen Kosten und Bedingungen.\n\nMein Projekt: ',
  }
  const [nachricht, setNachricht] = useState(offerMessages[parameter.get('angebot') ?? ''] ?? '')

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [website, setWebsite] = useState('')
  const inFlight = useRef(false)
  const submission = useRef<{ body: string; id: string } | null>(null)
  const gewaehlt = services.find((l) => l.slug === leistung)
  const fallback = `mailto:${epost}?subject=${encodeURIComponent(f.titel)}&body=${encodeURIComponent(
    `${f.name}: ${name}\n${f.epost}: ${absender}\n${f.leistung} ${gewaehlt?.titel ?? ''}\n\n${nachricht}`,
  )}`

  const absenden = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    const report = (ok: boolean) => window.dispatchEvent(new CustomEvent('hd-form-result', {detail:{form,ok}}))
    e.preventDefault()
    if (inFlight.current) return
    inFlight.current = true
    setStatus('sending')
    setError('')
    const values = { name: name.trim(), email: absender.trim(), message: nachricht.trim(), service: gewaehlt?.titel ?? '', website }
    const body = JSON.stringify(values)
    // Reuse the key after an uncertain network failure to avoid duplicate emails.
    if (submission.current?.body !== body) submission.current = { body, id: crypto.randomUUID() }
    try {
      const response = await fetch('/api/kontakt/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, requestId: submission.current.id }),
        signal: AbortSignal.timeout(22000),
      })
      const result = await response.json()
      if (!response.ok || result.ok !== true) {
        report(false)
        setError(response.status === 429 ? f.zuViele : f.fehler)
        setStatus('error')
        return
      }
      report(true)
      setStatus('sent')
    } catch {
      report(false)
      setError(f.fehler)
      setStatus('error')
    } finally { inFlight.current = false }
  }

  if (status === 'sent') return (
    <div className="hd-surface mt-12 max-w-xl p-6" role="status" aria-live="polite">
      <h2 className="font-display text-xl font-bold">{f.erfolgTitel}</h2>
      <p className="mt-3">{f.erfolgText}</p>
    </div>
  )

  return (
    <form data-track-id="project-enquiry" onSubmit={absenden} className="mt-12 max-w-xl space-y-6" aria-busy={status === 'sending'}>
      <h2 className="font-display text-xl font-bold tracking-tight">{f.titel}</h2>

      <div hidden aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="hd-feld-label">
            {f.name} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
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
            required
            maxLength={254}
            inputMode="email"
            autoComplete="email"
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
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder={f.nachrichtHinweis}
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          className="hd-feld"
        />
      </div>

      <p className="text-sm leading-relaxed text-[color:var(--hd-ink-soft)]">
        {f.datenschutzText} <Link data-track-id="anfrageformular-link-1" href={privacyPath} className="underline underline-offset-4">{f.datenschutzLink}</Link>
      </p>
      {status === 'error' && (
        <div role="alert" className="hd-surface p-4">
          <p>{error}</p>
          <a data-track-id="anfrageformular-a-2" href={fallback} className="mt-2 inline-block underline underline-offset-4">{f.alternativ}</a>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button data-track-id="anfrageformular-button-3" type="submit" disabled={status === 'sending'} className="hd-cta px-7 py-3.5 text-[17px] disabled:opacity-60 disabled:cursor-wait">
          {status === 'sending' ? f.sendet : f.senden}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
        <p className="max-w-[34ch] text-[14px] leading-snug text-[color:var(--hd-ink-soft)]">
          {f.hinweis}
        </p>
      </div>
    </form>
  )
}
