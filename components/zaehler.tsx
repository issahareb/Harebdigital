'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Eine Zahl, die beim Hereinscrollen hochlaeuft.
 *
 * Sie steht an zwei Stellen: bei den drei Zusagen am Fuss der Seite und bei
 * den Reichweiten der Social-Media-Konten. Bisher hatte nur die erste eine
 * Bewegung — eine Fallblattanzeige nach Bahnhofsart —, und die zweite stand
 * still da. Zwei Zahlenarten auf einer Seite, die sich unterschiedlich
 * verhalten, lesen sich wie zwei Seiten.
 *
 * Der Wert kommt als fertige Zeichenkette herein ("21.300", "1,3 Mio.",
 * "0 €"), nicht als Zahl. Das ist Absicht: die Schreibweise haengt an der
 * Sprache — deutsche Tausenderpunkte, spanische Kommas —, und sie steht
 * bereits richtig in `lib/hd-texte.ts`. Hier wird deshalb nur die erste
 * Ziffernfolge darin hochgezaehlt und alles davor und dahinter unveraendert
 * gelassen. Aus "1,3 Mio." laeuft die 1,3 und "Mio." bleibt stehen.
 *
 * Im Dokument steht von Anfang an der Endwert. Zwei Gruende: ein Crawler
 * liest "21.300" und nicht "0", und der Server rendert dasselbe wie der
 * Browser im ersten Durchgang. Auf null gesetzt wird erst im Effekt, lange
 * bevor die Zahl in den Blick kommt.
 */

/** Trennt "1,3 Mio." in Vorspann, Zahl und Nachspann. */
function zerlegen(text: string) {
  const treffer = text.match(/^(\D*)([\d.,]+)(.*)$/s)
  if (!treffer) return null
  const [, vor, zahl, nach] = treffer
  /* Die Schreibweise merken, damit sie beim Zaehlen erhalten bleibt:
     welches Zeichen trennt Tausender, welches die Nachkommastellen. */
  const komma = zahl.lastIndexOf(',') > zahl.lastIndexOf('.') ? ',' : '.'
  const stellen = zahl.includes(komma) ? zahl.length - zahl.lastIndexOf(komma) - 1 : 0
  /* Nur wenn hinter dem Trennzeichen ein oder zwei Ziffern stehen, ist es
     ein Dezimaltrenner. "21.300" hat drei — das ist ein Tausenderpunkt. */
  const dezimal = stellen > 0 && stellen <= 2
  const roh = Number(
    dezimal
      ? zahl.replace(new RegExp(`[^\\d${komma === ',' ? ',' : '.'}]`, 'g'), '').replace(',', '.')
      : zahl.replace(/\D/g, ''),
  )
  if (!Number.isFinite(roh)) return null
  return { vor, nach, ziel: roh, nachkomma: dezimal ? stellen : 0, komma, gruppiert: !dezimal && zahl.length > 3 }
}

export function Zaehler({ wert, className }: { wert: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const sichtbar = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const teile = zerlegen(wert)
    /* Was sich nicht zerlegen laesst, bleibt einfach stehen. Besser eine
       Zahl ohne Bewegung als eine kaputte. */
    if (!teile || reduce) {
      el.textContent = wert
      return
    }
    const { vor, nach, ziel, nachkomma, komma, gruppiert } = teile

    const schreiben = (v: number) => {
      let z = nachkomma > 0 ? v.toFixed(nachkomma) : String(Math.round(v))
      if (nachkomma > 0 && komma === ',') z = z.replace('.', ',')
      if (gruppiert) {
        const trenner = komma === ',' ? '.' : ','
        z = z.replace(/\B(?=(\d{3})+(?!\d))/g, trenner)
      }
      el.textContent = vor + z + nach
    }

    if (!sichtbar) {
      schreiben(0)
      return
    }
    const steuerung = animate(0, ziel, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: schreiben,
    })
    return () => steuerung.stop()
  }, [sichtbar, wert, reduce])

  return (
    <span ref={ref} className={className}>
      {wert}
    </span>
  )
}
