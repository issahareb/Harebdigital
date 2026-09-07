'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Der Falter — das ruhige Motiv der Unterseiten.
 *
 * Er stand zuerst mitten im Abschnitt "Was ich verstanden habe", als Scharnier
 * zwischen Knoten und Statue. Drei Motive hintereinander auf einer Buehne
 * waren aber eher ein Katalog als eine Dramaturgie, und ausserhalb dieser
 * einen Buehne war die Seite dann wieder still. Jetzt traegt jede Seite eins:
 * der Knoten die Landingpage, die Statue ihren Akt darin, der Falter die
 * Seiten, auf denen ueber die Arbeit gesprochen wird.
 *
 * Nicht auf Impressum und Datenschutz. Wer dort landet, sucht einen Satz aus
 * einem Gesetzestext, und hinter dem soll nichts flattern.
 *
 * Er liegt hinter allem, faengt nichts ab und traegt keine Aussage — deshalb
 * `aria-hidden` und kein Alternativtext. Was er mitteilt, teilt der Text
 * darueber besser mit.
 */
export function HdFalter() {
  const huelle = useRef<HTMLDivElement>(null)
  const film = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = huelle.current
    const v = film.current
    if (!el || !v || reduce) return

    /* Er laeuft nur, solange er im Bild ist. Auf dem Telefon ist das Budget
       an gleichzeitig entschluesselten Filmen knapp, und ein Film, der
       ausserhalb des Bildschirms weiterrechnet, kostet es ohne Gegenwert. */
    const beobachter = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { rootMargin: '10% 0px' },
    )
    beobachter.observe(el)
    return () => beobachter.disconnect()
  }, [reduce])

  return (
    <div ref={huelle} className="hd-falter" aria-hidden>
      <video
        ref={film}
        muted
        loop
        playsInline
        preload="none"
        poster="/verstaendnis/falter-standbild.webp"
      >
        {/* H.264 zuerst: jeder Browser, den ein Besucher benutzt, kann ihn,
            und die Datei ist halb so gross wie die VP9-Fassung. Die steht
            dahinter fuer Bauten ohne die lizenzierten Codecs — Chromium ohne
            Chrome, Firefox ohne Systemcodecs. Wer den ersten Eintrag
            abspielen kann, laedt den zweiten nie. */}
        <source src="/verstaendnis/falter.mp4" type="video/mp4" />
        <source src="/verstaendnis/falter.webm" type="video/webm" />
      </video>
    </div>
  )
}
