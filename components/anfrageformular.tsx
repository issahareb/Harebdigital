'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import type { HdTexte } from '@/lib/hd-texte'

/**
 * Das Anfrageformular.
 *
 * Es hat keinen eigenen Empfaenger. Es setzt eine E-Mail auf und uebergibt
 * sie dem Mailprogramm des Besuchers.
 *
 * Das ist eine Entscheidung und kein Provisorium: einen eigenen Versand gibt
 * es auf dieser Domain noch nicht, und ein Formular, das "danke" sagt und die
 * Nachricht verwirft, ist schlechter als gar keines — der Absender glaubt,
 * er habe Kontakt aufgenommen, und versucht es kein zweites Mal. So sieht er,
 * was rausgeht, hat es im eigenen Postausgang, und nichts geht still
 * verloren. Sobald ein Versand steht, wird hier nur das Absenden getauscht.
 *
 * Die Vorauswahl kommt aus der Adresse: `/kontakt/?leistung=automatisierung`.
 * Wer auf einer Kachel oder einer Detailseite auf "anfragen" geklickt hat,
 * findet die Leistung bereits ausgewaehlt vor. Passt der Wert zu keiner
 * Leistung, bleibt die leere Auswahl stehen statt einer falschen — eine
 * Adresse laesst sich von Hand tippen, und dann darf nichts Erfundenes
 * dastehen.
 */

export function Anfrageformular({ t, epost }: { t: HdTexte; epost: string }) {
  const f = t.kontakt.formular
  const parameter = useSearchParams()
  const ausAdresse = parameter.get('leistung') ?? ''
  const bekannt = t.leistungen.punkte.some((l) => l.slug === ausAdresse)

  const [leistung, setLeistung] = useState(bekannt ? ausAdresse : '')
  const [name, setName] = useState('')
  const [absender, setAbsender] = useState('')
  const [nachricht, setNachricht] = useState('')

  const gewaehlt = t.leistungen.punkte.find((l) => l.slug === leistung)

  const absenden = (e: React.FormEvent) => {
    e.preventDefault()
    const betreff = gewaehlt ? `${f.titel}: ${gewaehlt.titel}` : f.titel
    /* Die Leistung steht im Betreff UND im Text. Betreffzeilen werden in
       Postfaechern abgeschnitten; der Text nicht. */
    const koerper = [
      gewaehlt ? `${f.leistung} ${gewaehlt.titel}` : '',
      name ? `${f.name}: ${name}` : '',
      absender ? `${f.epost}: ${absender}` : '',
      '',
      nachricht,
    ]
      .filter((z, i, alle) => z !== '' || alle[i + 1] !== undefined)
      .join('\n')
    window.location.href = `mailto:${epost}?subject=${encodeURIComponent(
      betreff,
    )}&body=${encodeURIComponent(koerper)}`
  }

  return (
    <form onSubmit={absenden} className="mt-12 max-w-xl space-y-6">
      <h2 className="font-display text-xl font-bold tracking-tight">{f.titel}</h2>

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
          {t.leistungen.punkte.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.titel}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="hd-feld-label">
            {f.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="hd-feld"
          />
        </div>
        <div>
          <label htmlFor="epost" className="hd-feld-label">
            {f.epost}
          </label>
          <input
            id="epost"
            name="epost"
            type="email"
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
          {f.nachricht}
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          placeholder={f.nachrichtHinweis}
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          className="hd-feld"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="hd-cta px-7 py-3.5 text-[17px]">
          {f.senden}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
        <p className="max-w-[34ch] text-[14px] leading-snug text-[color:var(--hd-ink-soft)]">
          {f.hinweis}
        </p>
      </div>
    </form>
  )
}
