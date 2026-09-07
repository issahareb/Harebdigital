'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { HdKnoten } from './hd-knoten'
import type { HdTexte } from '@/lib/hd-texte'

/**
 * "Was ich verstanden habe" — drei Akte auf einer festgehaltenen Bühne.
 *
 * Der Abschnitt ist die einzige Stelle der Seite, an der nicht die Arbeit
 * belegt wird, sondern der Grund dafür. Er steht deshalb hinter den Zahlen:
 * erst der Beleg, dann die Erklärung. Umgekehrt wäre es eine Behauptung mit
 * nachgereichtem Beweis, und so herum ist es ein Beweis mit nachgereichter
 * Erklärung.
 *
 * Warum festgehalten und nicht drei Abschnitte untereinander: das Argument
 * ist eine Kette. Der Kanal misst → die Gewichtung verschiebt sich → der
 * Mensch verschiebt sich nicht. Drei Blöcke untereinander liest man als drei
 * Aussagen; drei Akte auf derselben Bühne liest man als eine, die sich dreimal
 * dreht. Dass das Motiv dabei stehen bleibt und sich verwandelt, ist der
 * ganze Punkt.
 *
 * Der Wechsel des Grundes im dritten Akt ist kein Effekt. Das Standbild der
 * Statue hat einen eigenen grauen Verlauf, und statt ihn wegzuschneiden
 * übernimmt der Akt ihn: dieselben Farbwerte als CSS-Verlauf hinter dem Bild,
 * das Bild selbst an den Seiten ausgeblendet. Es gibt keine Kante, weil es
 * keine zwei Flächen gibt. Nebenbei erledigt das die Dramaturgie von selbst —
 * die beiden Maschinen-Akte liegen im Schwarz, der Akt über den Menschen im
 * Tageslicht.
 */

const AKT_MOTIV: readonly ('schleife' | 'statue')[] = ['schleife', 'schleife', 'statue']

/* Die Marken auf der Scrollstrecke. Jeder Akt bekommt seine Mitte und seine
   Übergänge; die Übergänge überlappen, damit nie ein Bild ohne Text dasteht.
 *
 * Zwei Regeln stecken in diesen Zahlen, und beide sind teuer gelernt.
 *
 * Erstens: jede Stützstelle liegt zwischen 0 und 1. Motion baut aus einer
 * scrollgebundenen Umrechnung eine echte WAAPI-Animation auf einer
 * ScrollTimeline, und die lehnt Werte davor oder danach ab — mit einem
 * Fehler, der beim Einhängen die ganze Seite mitgenommen hat.
 *
 * Zweitens, und das ist das Heimtückische: die Liste muss bei 0 anfangen und
 * bei 1 aufhören. Wo sie das nicht tut, füllt der Browser den Rest nicht mit
 * dem letzten Wert auf, sondern läuft von dort zurück zum ersten. Der erste
 * Akt endete bei 0.34 mit Deckung 0 und war am Ende der Strecke wieder
 * vollständig da, quer über der Statue. Deshalb steht überall unten eine
 * Marke bei 0 und eine bei 1, auch wo sie rechnerisch nichts tut. */
const AKT_MARKEN: readonly {
  p: number[]
  deckung: number[]
  versatz: number[]
}[] = [
  { p: [0, 0.26, 0.34, 1], deckung: [1, 1, 0, 0], versatz: [0, 0, -34, -34] },
  {
    p: [0, 0.28, 0.36, 0.6, 0.7, 1],
    deckung: [0, 0, 1, 1, 0, 0],
    versatz: [34, 34, 0, 0, -34, -34],
  },
  /* Einblendung bei 0.68, also noch bevor der zweite Akt ganz weg ist. Mit
     0.73 klaffte dazwischen ein Stueck Strecke, auf dem nur das Motiv stand
     und kein Satz — man las das als Aussetzer, nicht als Uebergang. */
  { p: [0, 0.68, 0.79, 1], deckung: [0, 0, 1, 1], versatz: [34, 34, 0, 0] },
]

export function HdVerstaendnis({ t }: { t: HdTexte }) {
  const reduce = useReducedMotion()
  const bahn = useRef<HTMLDivElement>(null)
  const [akt, setAkt] = useState(0)

  const { scrollYProgress } = useScroll({
    target: bahn,
    offset: ['start start', 'end end'],
  })

  /* Die Unruhe des Knotens. Sie steigt zum zweiten Akt hin an und fällt zum
     dritten wieder ab, weil der Knoten dort ohnehin verschwindet. */
  const unruhe = useTransform(scrollYProgress, [0, 0.2, 0.42, 0.6, 0.7, 1], [0, 0, 1, 1, 0, 0])

  /* Zwei Motive, nicht drei. Der Knoten trägt die ersten beiden Akte, die
     Statue den dritten, und sie überlappen sich um eine Zehntelstrecke: der
     Knoten geht, während der graue Grund schon kommt. Dazwischen stand eine
     Zeit lang der Falter als Scharnier — drei Motive hintereinander auf einer
     Bühne lasen sich aber als Katalog, und ausserhalb dieser Bühne war die
     Seite dann wieder still. Er steht jetzt auf den Unterseiten. */
  const oZeichen = useTransform(scrollYProgress, [0, 0.05, 0.6, 0.72, 1], [0, 1, 1, 0, 0])
  const sZeichen = useTransform(scrollYProgress, [0, 0.55, 0.74, 1], [1, 1, 0.72, 0.72])
  const oStatue = useTransform(scrollYProgress, [0, 0.66, 0.79, 1], [0, 0, 1, 1])
  /* Kein Versatz nach oben, sondern ein Heranfahren. Ein Versatz würde die
     Unterkante des Bildes für den Moment der Bewegung freilegen, und dort
     stünde dann Schwarz unter einem grauen Verlauf. Maßstab deckt immer. */
  const sSt = useTransform(scrollYProgress, [0, 0.66, 0.95, 1], [1.07, 1.07, 1, 1])

  /* Der Fortschrittsbalken am Fuß. Kein Zähler: die Strecke ist eine Kette,
     keine Auswahl aus vier Karten, und wer zählen kann, braucht die Ziffer
     nicht. */
  const fortschritt = useTransform(scrollYProgress, [0, 1], [0, 1])
  /* Rangliste und Sekundenanzeige teilen sich die untere rechte Ecke: die
     eine geht, wenn die andere kommt. Beide Werte stehen hier oben und nicht
     im JSX, weil unten ein früher Rücksprung für reduzierte Bewegung steht
     und Hooks dahinter beim Umschalten der Systemeinstellung die Reihenfolge
     verschieben würden. */
  const oRang = useTransform(scrollYProgress, [0, 0.06, 0.6, 0.68, 1], [0, 1, 1, 0, 0])
  const oSek = useTransform(scrollYProgress, [0, 0.76, 0.86, 1], [0, 0, 1, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = v < 0.31 ? 0 : v < 0.68 ? 1 : 2
    setAkt((alt) => (alt === i ? alt : i))
  })

  /* Die Rangliste der Kriterien. Im zweiten Akt tauschen zwei Nachbarn alle
     paar Sekunden den Platz — das ist die Aussage des Akts als Bild, und
     zwar die einzige, die sie ohne einen weiteren Satz macht. */
  const [rang, setRang] = useState(() => t.verstaendnis.kriterien.map((_, i) => i))
  useEffect(() => {
    setRang(t.verstaendnis.kriterien.map((_, i) => i))
  }, [t])
  useEffect(() => {
    if (reduce || akt !== 1) return
    const uhr = window.setInterval(() => {
      setRang((r) => {
        const n = [...r]
        const i = 1 + Math.floor(Math.random() * (n.length - 2))
        ;[n[i], n[i + 1]] = [n[i + 1], n[i]]
        return n
      })
    }, 1250)
    return () => window.clearInterval(uhr)
  }, [akt, reduce])

  const v = t.verstaendnis

  /* `useReducedMotion` weiss auf dem Server nichts und meldet dort immer
     "nein". Wer die Einstellung gesetzt hat, bekam deshalb vom Server die
     Bühne und vom Browser die ruhige Fassung — zwei verschiedene Bäume an
     derselben Stelle, und React bricht die Übernahme mit einem
     Abgleichsfehler ab. Erst nach der Montage umschalten: der erste Durchlauf
     im Browser ist dann derselbe wie der auf dem Server. */
  const [montiert, setMontiert] = useState(false)
  useEffect(() => setMontiert(true), [])

  /* Bei reduzierter Bewegung fällt die Bühne weg. Drei Blöcke untereinander,
     jeder mit seinem Motiv als Standbild — dieselbe Aussage, nur ohne die
     Kette. */
  if (montiert && reduce) {
    return (
      <section id="verstaendnis" className="hd-rule hd-verst hd-verst--ruhig">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <span className="hd-label">{v.label}</span>
          <div className="mt-10 flex flex-col gap-16">
            {v.akte.map((a, i) => (
              <div key={a.titel} className="hd-verst-ruhig">
                <p className="hd-verst-wort" aria-hidden>
                  <span>{a.wortLinks}</span>
                  <span>{a.wortRechts}</span>
                </p>
                <h2 className="hd-verst-titel">{a.titel}</h2>
                <p className="hd-verst-text">{a.text}</p>
                {AKT_MOTIV[i] === 'statue' ? (
                  <div className="hd-verst-ruhig-bild">
                    <Image
                      src="/verstaendnis/statue.webp"
                      alt={v.statueAlt}
                      width={1024}
                      height={1280}
                      sizes="(max-width: 640px) 90vw, 420px"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="verstaendnis" className="hd-rule hd-verst" data-akt={akt}>
      <div ref={bahn} className="hd-verst-bahn">
        <div className="hd-verst-buehne">
          {/* ── Der Grund des dritten Akts ─────────────────────────────────
              Die Farbwerte sind aus dem Standbild abgelesen, Zeile für
              Zeile. Das Bild steht in derselben Fläche und füllt sie in der
              Höhe vollständig — deshalb liegt sein eigener Verlauf genau auf
              diesem hier, und die seitliche Ausblendung trifft nur Grund auf
              Grund. */}
          <motion.div className="hd-verst-tag" style={{ opacity: oStatue }} aria-hidden />

          {/* ── Die Motive ─────────────────────────────────────────────── */}
          <div className="hd-verst-motiv">
            <motion.div
              className="hd-verst-zeichen-huelle"
              style={{ opacity: oZeichen, scale: sZeichen }}
            >
              <HdKnoten unruhe={unruhe} beschriftung={v.knotenAlt} />
            </motion.div>

            <motion.div
              className="hd-verst-statue"
              style={{ opacity: oStatue, scale: sSt }}
              aria-hidden={akt !== 2}
            >
              <Image
                src="/verstaendnis/statue.webp"
                alt={v.statueAlt}
                width={1024}
                height={1280}
                sizes="(max-width: 640px) 130vw, 70vh"
                priority={false}
              />
            </motion.div>
          </div>

          {/* ── Die Akte ───────────────────────────────────────────────── */}
          {v.akte.map((a, i) => (
            <Akt
              key={a.titel}
              akt={a}
              label={i === 0 ? v.label : null}
              marken={AKT_MARKEN[i]}
              fortschritt={scrollYProgress}
              hell={AKT_MOTIV[i] === 'statue'}
            />
          ))}

          {/* ── Rangliste und Sekunden ─────────────────────────────────── */}
          <motion.ol className="hd-verst-rang" style={{ opacity: oRang }}>
            {rang.map((k, i) => (
              <motion.li
                key={v.kriterien[k]}
                layout
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hd-verst-rang__n">{i + 1}</span>
                <span>{v.kriterien[k]}</span>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div className="hd-verst-sek" style={{ opacity: oSek }} aria-hidden={akt !== 2}>
            <span className="hd-verst-sek__zahl">{v.sekunden.zahl}</span>
            <span className="hd-verst-sek__label">{v.sekunden.label}</span>
            <span className="hd-verst-sek__balken">
              <i style={{ animationPlayState: akt === 2 ? 'running' : 'paused' }} />
            </span>
          </motion.div>

          {/* ── Der Fortschritt ────────────────────────────────────────── */}
          <div className="hd-verst-linie" aria-hidden>
            <motion.div style={{ scaleX: fortschritt }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* Ein Akt. Eigene Komponente, weil jeder seine drei Transformationen braucht
   und Hooks nicht in einer Schleife im Elternteil stehen dürfen. */
function Akt({
  akt,
  label,
  marken,
  fortschritt,
  hell,
}: {
  akt: HdTexte['verstaendnis']['akte'][number]
  label: string | null
  marken: { p: number[]; deckung: number[]; versatz: number[] }
  fortschritt: ReturnType<typeof useScroll>['scrollYProgress']
  hell: boolean
}) {
  const opacity = useTransform(fortschritt, marken.p, marken.deckung)
  /* Der Text kommt von unten herein und geht nach oben hinaus. Was es
     mitteilt: eine Kette, kein Stapel. */
  const y = useTransform(fortschritt, marken.p, marken.versatz)

  return (
    <motion.div
      className={`hd-verst-akt${hell ? ' hd-verst-akt--hell' : ''}`}
      style={{ opacity, y }}
    >
      {/* Das große Wort ist Schrift, nicht Überschrift: es steht als Bild da
          und die Aussage steht darunter. Deshalb aus dem Vorlesegerät heraus —
          "ALGO RITHMUS" als Überschrift wäre keine. */}
      <p className="hd-verst-wort" aria-hidden>
        <span>{akt.wortLinks}</span>
        <span>{akt.wortRechts}</span>
      </p>
      <div className="hd-verst-satz">
        {label ? <span className="hd-label">{label}</span> : null}
        <h2 className="hd-verst-titel">{akt.titel}</h2>
        <p className="hd-verst-text">{akt.text}</p>
      </div>
    </motion.div>
  )
}
