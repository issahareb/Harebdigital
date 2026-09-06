'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Das laufende Band der Problemsaetze.
 *
 * Vorher war es reines CSS: zwei Reihen, die gegeneinander laufen, und
 * `:hover` hielt sie an. Am Rechner ist das richtig — wer lesen will, faehrt
 * mit der Maus darueber. Auf dem Telefon war es kaputt: ein Tippen loest dort
 * `:hover` aus, und der Zustand bleibt haengen, bis irgendwo anders
 * hingetippt wird. Wer einen Satz zu Ende lesen wollte, hielt das Band fuer
 * immer an.
 *
 * Jetzt drei Verhalten, alle mit demselben Ausgang — nach drei Sekunden
 * laeuft es weiter:
 *
 *   Tippen haelt an. Genau dafuer tippt jemand darauf.
 *   Ziehen verschiebt das Band mit dem Finger und haelt es dabei an.
 *   Zeigen (nur mit echter Maus) haelt an, solange der Zeiger darauf steht.
 *
 * Der Zug wird modulo der halben Bandbreite gerechnet. Das Band steht zweimal
 * hintereinander und laeuft um -50 %; ein Versatz, der darueber hinausgeht,
 * wuerde das Ende der Kopie ins Bild ziehen. Mit dem Rest der Division bleibt
 * jeder Zug ein reiner Phasenversatz, und es kann nie leer werden.
 *
 * Die Bewegung selbst bleibt CSS: eine Endlosschleife auf `transform`, die
 * der Browser ohne Skript abfaehrt. Angehalten wird ueber
 * `animation-play-state`, nicht indem der Ablauf ersetzt wird — er behaelt
 * dadurch seine Stelle und springt beim Weiterlaufen nicht.
 */

/** Wie lange das Band nach einer Beruehrung steht. */
const HALT_MS = 3000
/** Ab wieviel Pixeln eine Beruehrung als Ziehen und nicht als Tippen gilt. */
const ZIEH_SCHWELLE = 6

export function HdBand({ saetze }: { saetze: readonly string[] }) {
  const flaeche = useRef<HTMLDivElement>(null)
  const laeufe = useRef<(HTMLDivElement | null)[]>([])
  const uhr = useRef<ReturnType<typeof setTimeout> | null>(null)
  const zug = useRef({ aktiv: false, startX: 0, startZug: 0, bewegt: 0 })

  const [haelt, setHaelt] = useState(false)
  const [zieh, setZieh] = useState(0)

  const spaeterWeiter = useCallback(() => {
    if (uhr.current) clearTimeout(uhr.current)
    uhr.current = setTimeout(() => setHaelt(false), HALT_MS)
  }, [])

  useEffect(() => () => { if (uhr.current) clearTimeout(uhr.current) }, [])

  /* Die halbe Bandbreite, an der der Zug umgerechnet wird. Gemessen und nicht
     geraten: sie haengt an der Textlaenge und aendert sich beim Sprachwechsel. */
  const halbe = useCallback(() => {
    const el = laeufe.current[0]
    return el ? el.scrollWidth / 2 : 0
  }, [])

  const runter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (uhr.current) clearTimeout(uhr.current)
    setHaelt(true)
    zug.current = { aktiv: true, startX: e.clientX, startZug: zieh, bewegt: 0 }
    flaeche.current?.setPointerCapture(e.pointerId)
  }

  const bewegen = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!zug.current.aktiv) return
    const dx = e.clientX - zug.current.startX
    zug.current.bewegt = Math.max(zug.current.bewegt, Math.abs(dx))
    const h = halbe()
    const roh = zug.current.startZug + dx
    setZieh(h > 0 ? ((roh % h) + h) % h - h : roh)
  }

  const hoch = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!zug.current.aktiv) return
    zug.current.aktiv = false
    flaeche.current?.releasePointerCapture(e.pointerId)
    /* Ob getippt oder gezogen wurde, aendert nichts am Ausgang — nur daran,
       wo das Band danach steht. Beides laeuft nach derselben Wartezeit
       weiter. */
    spaeterWeiter()
  }

  return (
    <div
      ref={flaeche}
      className={`hd-band ${haelt ? 'hd-band--haelt' : ''}`}
      /* `touchAction: pan-y` gibt das senkrechte Wischen an die Seite zurueck.
         Ohne das faengt das Band bei aufgesetztem Finger auch die senkrechte
         Geste ab, und die Seite laesst sich von hier aus nicht mehr
         scrollen. */
      style={{ ['--hd-band-zug' as string]: `${zieh}px`, touchAction: 'pan-y' }}
      onPointerDown={runter}
      onPointerMove={bewegen}
      onPointerUp={hoch}
      onPointerCancel={hoch}
    >
      {[0, 1].map((reihe) => (
        <div key={reihe} className="hd-band__reihe">
          <div
            ref={(el) => { laeufe.current[reihe] = el }}
            className={`hd-band__lauf hd-band__lauf--${reihe}`}
          >
            {[0, 1].map((halb) => (
              <ul key={halb} className="hd-band__spur" aria-hidden={halb === 1 || undefined}>
                {saetze
                  .filter((_, i) => i % 2 === reihe)
                  .map((satz) => (
                    <li key={satz} className="hd-band__satz">
                      <span aria-hidden className="text-[color:var(--hd-accent)]">&bdquo;</span>
                      {satz}
                      <span aria-hidden className="text-[color:var(--hd-accent)]">&ldquo;</span>
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
