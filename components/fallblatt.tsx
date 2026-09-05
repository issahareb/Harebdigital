'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/**
 * Die Fallblattanzeige, portiert von React Bits (SplitFlapText, reactbits.dev).
 *
 * Eine Bahnhofsanzeige: jedes Blatt rattert durch fremde Zeichen und faellt
 * dann auf seins. Was es mitteilt: diese Zahl ist keine Behauptung, sie hat
 * sich eingestellt.
 *
 * Sie steht bei den drei Zusagen — 24 h, 1 Ansprechpartner, 0 € fuer den
 * Entwurf. Vorher zaehlte dort ein Zaehler hoch. Der ist unauffaellig
 * geworden: hochzaehlende Zahlen stehen inzwischen auf jeder zweiten Seite,
 * und "24" laeuft dabei durch 1 bis 23, die alle nichts bedeuten. Die
 * Fallblattanzeige laeuft durch Zeichen, die erkennbar Unsinn sind, und genau
 * deshalb liest man das Ergebnis als Ergebnis.
 *
 * Zwei Abweichungen von der Vorlage, beide zwingend:
 *
 * 1. Die Vorlage blaettert nur, wenn sie zwischen mehreren Woertern wechselt,
 *    und faengt damit beim Laden an. Hier gibt es ein einziges Wort, und es
 *    soll genau einmal fallen — beim Hereinscrollen. Ohne das haette die
 *    Anzeige entweder gar nichts getan oder unaufhoerlich geklappert,
 *    achttausend Pixel ueber dem Punkt, an dem jemand hinsieht.
 *
 * 2. Die Farben kommen aus den Angaben der Seite, nicht aus Eigenschaften.
 *    Die Zahlen stehen auf dem hellen Grund; eine fest eingebaute dunkle
 *    Kachel waere dort ein Fremdkoerper, und beim naechsten Grundwechsel
 *    muesste sie von Hand nachgezogen werden.
 */

const ZEICHEN = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ€$%#@&*'

/** Wie oft ein Blatt durchrattert, bevor es liegen bleibt. */
const SCHLAEGE = 9
/** Wie lange ein Schlag dauert. */
const SCHLAG_MS = 55
/** Wie weit die Blaetter gegeneinander versetzt starten. */
const VERSATZ_MS = 90

function zufallszeichen() {
  return ZEICHEN.charAt(Math.floor(Math.random() * ZEICHEN.length))
}

export function Fallblatt({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const sichtbar = useInView(ref, { once: true, amount: 0.6 })
  const [blaetter, setBlaetter] = useState<string[]>(() => text.split('').map(() => ' '))

  useEffect(() => {
    /* Ohne Bewegung steht die Zahl sofort da. Eine Anzeige, die klappert,
       waehrend jemand ausdruecklich um Ruhe gebeten hat, ist kein Effekt
       mehr, sondern eine Zumutung. */
    if (!sichtbar) return
    if (reduce) {
      setBlaetter(text.split(''))
      return
    }

    const ziel = text.split('')
    const start = performance.now()
    let laeuft = true

    const schlag = (jetzt: number) => {
      if (!laeuft) return
      const vergangen = jetzt - start
      let offen = false

      setBlaetter(
        ziel.map((z, i) => {
          /* Ein Leerzeichen faellt nicht — es gibt nichts zu zeigen, und ein
             ratterndes Blatt zwischen "24" und "h" waere Zierrat. */
          if (z === ' ') return z
          const eigen = vergangen - i * VERSATZ_MS
          if (eigen < 0) {
            offen = true
            return ' '
          }
          const stufe = Math.floor(eigen / SCHLAG_MS)
          if (stufe >= SCHLAEGE) return z
          offen = true
          return zufallszeichen()
        }),
      )

      if (offen) requestAnimationFrame(schlag)
    }

    const id = requestAnimationFrame(schlag)
    return () => {
      laeuft = false
      cancelAnimationFrame(id)
    }
  }, [sichtbar, reduce, text])

  return (
    <span ref={ref} className={`fallblatt ${className ?? ''}`} aria-label={text} role="text">
      {blaetter.map((zeichen, i) =>
        zeichen === ' ' && text[i] === ' ' ? (
          <span key={i} className="fallblatt__luecke" aria-hidden />
        ) : (
          <span key={i} className="fallblatt__blatt" aria-hidden>
            {zeichen === ' ' ? ' ' : zeichen}
          </span>
        ),
      )}
    </span>
  )
}
