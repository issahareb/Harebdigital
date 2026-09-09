'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import type { HdTexte } from '@/lib/hd-texte'

/**
 * "Was ich verstanden habe" — zwei Abschnitte, zwei Bilder, zwei Bildschirme.
 *
 * Vorher stand das alles auf einer festgehaltenen Bühne: drei Akte, drei
 * Motive, eine Scrollstrecke von dreieinhalb Bildschirmen. Technisch sauber,
 * gelesen aber als ein einziger langer Abschnitt mit einem Bilderstapel darin
 * — und genau das war der Einwand. Jetzt hat jede Aussage ihren eigenen
 * Abschnitt, ihr eigenes Motiv und ihren eigenen Bildschirm. Nichts klebt,
 * nichts überblendet, man scrollt von einem zum nächsten wie über die ganze
 * übrige Seite auch.
 *
 * Die Motive sind die Dateien, die der Auftraggeber geschickt hat, und nicht
 * nachgebaut: der Ziffernknoten und der Falter. Beide liegen auf reinem
 * Schwarz, `screen` rechnet das heraus, und damit brauchte keiner von beiden
 * eine Alphamaske.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export function HdVerstaendnis({ t }: { t: HdTexte }) {
  const v = t.verstaendnis

  return (
    <>
      <Abschnitt
        id="algorithmus"
        label={v.label}
        akt={v.akte[0]}
        film="knoten"
        alt={v.knotenAlt}
        kriterien={v.kriterien}
      />
      <Abschnitt
        id="psyche"
        akt={v.akte[1]}
        film="falter"
        alt={v.falterAlt}
        sekunden={v.sekunden}
      />
    </>
  )
}

function Abschnitt({
  id,
  label,
  akt,
  film,
  alt,
  kriterien,
  sekunden,
}: {
  id: string
  label?: string
  akt: HdTexte['verstaendnis']['akte'][number]
  film: 'knoten' | 'falter'
  alt: string
  kriterien?: string[]
  sekunden?: { zahl: string; label: string }
}) {
  const reduce = useReducedMotion()
  const abschnitt = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const drin = useInView(abschnitt, { margin: '-15% 0px -15% 0px' })

  /* Der Film läuft nur, solange man ihn sieht. Nicht aus Sparsamkeit: das
     Telefon hat ein knappes Budget an gleichzeitig entschlüsselten Filmen,
     und die Bühne ganz oben hält schon einen. */
  useEffect(() => {
    const el = video.current
    if (!el || reduce) return
    if (drin) void el.play().catch(() => {})
    else el.pause()
  }, [drin, reduce])

  /* Die Rangliste der Kriterien sortiert sich um, solange der Abschnitt im
     Bild steht. Das ist die Aussage des zweiten Absatzes als Bild — die
     Gewichtung verschiebt sich, ohne dass es jemand ankündigt — und die
     einzige, die sie ohne einen weiteren Satz macht. */
  const [rang, setRang] = useState<number[]>(() => (kriterien ?? []).map((_, i) => i))
  useEffect(() => {
    setRang((kriterien ?? []).map((_, i) => i))
  }, [kriterien])
  useEffect(() => {
    if (!kriterien || reduce || !drin) return
    const uhr = window.setInterval(() => {
      setRang((r) => {
        const n = [...r]
        const i = 1 + Math.floor(Math.random() * (n.length - 2))
        ;[n[i], n[i + 1]] = [n[i + 1], n[i]]
        return n
      })
    }, 1400)
    return () => window.clearInterval(uhr)
  }, [kriterien, drin, reduce])

  return (
    <section id={id} ref={abschnitt} className="hd-rule hd-verst">
      <div className="hd-verst-buehne">
        {/* Das Motiv liegt hinter allem und trägt keine Aussage — der Text
            daneben sagt dasselbe besser. Deshalb ohne Alternativtext auf dem
            Film selbst; die Beschreibung steht am Abschnitt. */}
        <div className={`hd-verst-motiv hd-verst-motiv--${film}`} role="img" aria-label={alt}>
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            poster={`/verstaendnis/${film}-standbild.webp`}
          >
            {/* H.264 zuerst: jeder Browser, den ein Besucher benutzt, kann
                ihn, und die Datei ist halb so gross wie die VP9-Fassung. Die
                steht dahinter fuer Bauten ohne die lizenzierten Codecs.
                Wer den ersten Eintrag abspielen kann, laedt den zweiten nie. */}
            <source src={`/verstaendnis/${film}.mp4`} type="video/mp4" />
            <source src={`/verstaendnis/${film}.webm`} type="video/webm" />
          </video>
        </div>

        <div className="hd-verst-inhalt">
          {/* Das grosse Wort ist Schrift, nicht Überschrift: es steht als Bild
              da und die Aussage steht darunter. Deshalb aus dem Vorlesegerät
              heraus — "ALGO RITHMUS" als Überschrift wäre keine. */}
          <motion.p
            className="hd-verst-wort"
            aria-hidden
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span>{akt.wortLinks}</span>
            <span>{akt.wortRechts}</span>
          </motion.p>

          <motion.div
            className="hd-verst-satz"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {label ? <span className="hd-label">{label}</span> : null}
            <h2 className="hd-verst-titel">{akt.titel}</h2>
            {akt.text.map((absatz) => (
              <p key={absatz} className="hd-verst-text">
                {absatz}
              </p>
            ))}
          </motion.div>

          {kriterien ? (
            <motion.ol
              className="hd-verst-rang"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {rang.map((k, i) => (
                <motion.li key={kriterien[k]} layout transition={{ duration: 0.5, ease: EASE }}>
                  <span className="hd-verst-rang__n">{i + 1}</span>
                  <span>{kriterien[k]}</span>
                </motion.li>
              ))}
            </motion.ol>
          ) : null}

          {sekunden ? (
            <motion.div
              className="hd-verst-sek"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="hd-verst-sek__zahl">{sekunden.zahl}</span>
              <span className="hd-verst-sek__label">{sekunden.label}</span>
              {/* Der Balken läuft in genau drei Sekunden leer. Er ist die
                  Aussage des Abschnitts in der Zeit, die sie beschreibt —
                  länger wäre gelogen. Er läuft nur, solange man ihn sieht. */}
              <span className="hd-verst-sek__balken">
                <i style={{ animationPlayState: drin && !reduce ? 'running' : 'paused' }} />
              </span>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
