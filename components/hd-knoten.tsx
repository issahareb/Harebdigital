'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion, type MotionValue } from 'motion/react'

/**
 * Der Ziffernknoten, mit Code gezeichnet.
 *
 * Warum gezeichnet und nicht als Film: der Knoten ist das Argument des
 * Abschnitts und kein Schmuck. Ein Algorithmus misst dieselben Groessen immer
 * wieder, in einer Bahn, die sich selbst durchdringt und nirgends anfaengt,
 * und die Ziffern darauf sind die Messwerte. Ein fertiger Film koennte das
 * zeigen; nur ein gerechneter kann darauf reagieren, dass jemand mit der Maus
 * hineinfaehrt. Genau das war die Vorgabe.
 *
 * Die Form ist eine Kleeblattschlinge — die einfachste Kurve, die verknotet
 * ist und nicht bloss verschlungen aussieht. Sie laesst sich in einer Zeile
 * hinschreiben und hat keine Wendepunkte, weshalb sich um sie herum ein
 * sauberes Dreibein legen laesst.
 *
 * Auf dieses Dreibein kommen die Ziffern: pro Stelle auf der Kurve ein Ring
 * um den Schlauch, pro Ring ein paar Dutzend Zeichen. Was von der Kamera
 * wegzeigt, wird gar nicht erst gezeichnet — das ist der ganze Grund, warum
 * ein Schlauch aus Ziffern nach Koerper aussieht und nicht nach Wolke.
 *
 * Was hier bewusst NICHT passiert: kein React-Zustand pro Bild und keine
 * Speicheranforderung pro Bild. Die Schleife laeuft mit sechzig Bildern in
 * der Sekunde; jede Ziffer als Objekt waere hunderttausend kurzlebige Objekte
 * pro Sekunde und damit ein Ruckeln im Sekundentakt, sobald die
 * Speicherbereinigung anspringt. Alle Felder stehen deshalb vorab und werden
 * nur ueberschrieben.
 */

const TAU = Math.PI * 2
const ZIFFERN = '0123456789'

/* Die Kleeblattschlinge und ihre Ableitung. */
function kurve(t: number): [number, number, number] {
  return [Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t), -Math.sin(3 * t)]
}

function tangente(t: number): [number, number, number] {
  return [
    Math.cos(t) + 4 * Math.cos(2 * t),
    -Math.sin(t) + 4 * Math.sin(2 * t),
    -3 * Math.cos(3 * t),
  ]
}

function normiert(v: [number, number, number]): [number, number, number] {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

function kreuz(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
}

/* Wie stark der Zeiger an dieser Stelle zieht. Quadratisch abfallend —
   linear abfallend sah aus, als schoebe man eine Scheibe, nicht als verforme
   man etwas Elastisches. */
function zug(dx: number, dy: number, radius: number): number {
  const d = Math.hypot(dx, dy)
  if (d > radius) return 0
  const f = 1 - d / radius
  return f * f
}

export function HdKnoten({
  unruhe,
  beschriftung,
}: {
  /* 0 = ruhig, 1 = die Gewichtung verschiebt sich. Steuert Drehtempo und
     Ziffernwechsel. */
  unruhe: MotionValue<number>
  beschriftung: string
}) {
  const flaeche = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  /* Zeigerziel und gefederter Ist-Wert. Ohne die Federung springt die Delle
     dorthin, wo die Maus gerade ist, statt ihr zu folgen. */
  const zeiger = useRef({ zx: 0, zy: 0, x: 0, y: 0, an: false })

  useEffect(() => {
    const el = flaeche.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return

    const stil = getComputedStyle(el)
    const akzent = stil.getPropertyValue('--hd-zeichen-farbe').trim() || '#38deda'
    const schrift =
      stil.getPropertyValue('--hd-zeichen-schrift').trim() || 'ui-sans-serif, sans-serif'

    /* Die Dichte ist nicht frei gewaehlt, sondern folgt der Zeichengroesse.
       Der Schlauch ist rund 2400 Pixel lang und 180 im Umfang; bei 14 Pixel
       hohen Ziffern sind das etwa 150 Ringe und 14 Zeichen im Ring. Mit den
       68 Ringen des ersten Versuchs lagen 35 Pixel zwischen zwei Ringen, und
       weil die Rueckseite ohnehin wegfaellt, sah man 68 einzelne Boegen: eine
       Spirale aus Rippen statt eines Koerpers.
     *
       Auf dem Telefon ein duenneres Netz — nicht aus Vorsicht: dort ist auch
       die Flaeche kleiner, und ein Knoten, der ruckelt, ist schlechter als
       ein duennerer, der laeuft. */
    const schmal = window.matchMedia('(max-width: 767px)').matches
    const RINGE = schmal ? 90 : 150
    const UM = schmal ? 10 : 14
    const N = RINGE * UM

    /* ── Das Netz, einmal gerechnet ─────────────────────────────────────
       Lage und Flaechennormale jeder Ziffer im Modell, dazu die Tangente
       ihres Rings. Nichts davon aendert sich je; gedreht wird pro Bild. */
    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pz = new Float32Array(N)
    const nx = new Float32Array(N)
    const ny = new Float32Array(N)
    const nz = new Float32Array(N)
    const tx = new Float32Array(RINGE)
    const ty = new Float32Array(RINGE)
    const tz = new Float32Array(RINGE)
    const ziffern = new Uint8Array(N)
    for (let i = 0; i < N; i++) ziffern[i] = (Math.random() * 10) | 0

    /* Der Schlauchradius ist nicht gewaehlt, sondern nachgerechnet. Auf der
       Kleeblattschlinge kommen sich zwei Strangteile, die im Parameter weit
       auseinanderliegen, bis auf 1,214 Einheiten nahe; ein Schlauch dicker
       als die Haelfte davon durchdringt sich selbst. Mit 0,78 wuchsen die
       drei Loecher zu und aus dem Knoten wurde ein Klumpen, der aussah wie
       ein Schneckenhaus. 0,42 laesst zwischen den Straengen Luft. */
    const SCHLAUCH = 0.42

    {
      /* Ein mitgefuehrtes Dreibein statt des Frenet-Dreibeins: das Frenet-
         Dreibein dreht sich um die Kurve herum, wo sie sich kruemmt, und die
         Ziffern haetten sich dann an den Kruemmungen sichtbar verdrillt. Hier
         wird die Normale von Ring zu Ring nur so weit gedreht, wie die
         Tangente es erzwingt. */
      let n: [number, number, number] = [0, 0, 1]
      for (let i = 0; i < RINGE; i++) {
        const t = (i / RINGE) * TAU
        const c = kurve(t)
        const tang = normiert(tangente(t))
        tx[i] = tang[0]
        ty[i] = tang[1]
        tz[i] = tang[2]

        /* Die letzte Normale auf die Ebene senkrecht zur Tangente werfen. */
        const d = n[0] * tang[0] + n[1] * tang[1] + n[2] * tang[2]
        n = normiert([n[0] - d * tang[0], n[1] - d * tang[1], n[2] - d * tang[2]])
        if (!Number.isFinite(n[0])) n = normiert(kreuz(tang, [0, 0, 1]))
        const b = kreuz(tang, n)

        for (let j = 0; j < UM; j++) {
          const w = (j / UM) * TAU
          const cw = Math.cos(w)
          const sw = Math.sin(w)
          const fx = cw * n[0] + sw * b[0]
          const fy = cw * n[1] + sw * b[1]
          const fz = cw * n[2] + sw * b[2]
          const k = i * UM + j
          nx[k] = fx
          ny[k] = fy
          nz[k] = fz
          px[k] = c[0] + SCHLAUCH * fx
          py[k] = c[1] + SCHLAUCH * fy
          pz[k] = c[2] + SCHLAUCH * fz
        }
      }
    }

    /* ── Felder fuer die Ausgabe, vorab angelegt ───────────────────────── */
    const sx = new Float32Array(N)
    const sy = new Float32Array(N)
    const sw = new Float32Array(N) // Massstab aus der Perspektive
    const sa = new Float32Array(N) // Deckkraft
    const sd = new Float32Array(N) // Tiefe
    const swi = new Float32Array(N) // Winkel der Ziffer auf dem Bildschirm
    const sichtbar = new Int32Array(N)

    /* Statt zu sortieren: Tiefenfaecher. Sortieren waere pro Bild ein
       n·log n auf siebzehnhundert Eintraegen; die Faecher sind ein Durchlauf,
       und feiner als das Auge es an dieser Zeichengroesse aufloest. */
    const FAECHER = 20
    const fachZahl = new Int32Array(FAECHER)
    const fachStart = new Int32Array(FAECHER + 1)
    const fach = new Int32Array(N)
    const reihe = new Int32Array(N)

    let br = 0
    let ho = 0
    let bezug = 0
    let dpr = 1

    const messen = () => {
      const r = el.getBoundingClientRect()
      br = Math.max(1, r.width)
      ho = Math.max(1, r.height)
      bezug = Math.min(br, ho)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      el.width = Math.round(br * dpr)
      el.height = Math.round(ho * dpr)
    }
    messen()

    let drehung = 0
    let zeit = 0
    let letzte = 0
    let lauf = 0
    let sichtbarImBild = true

    const zeichnen = () => {
      const massstab = bezug * 0.142
      const KAMERA = 17

      /* Zwei Achsen: eine stete Drehung um die Hochachse und eine sehr
         langsame Kippbewegung. Nur eine Achse las sich als Drehteller. */
      const a = drehung
      const b = 0.42 + Math.sin(zeit * 0.21) * 0.24
      const ca = Math.cos(a)
      const sa2 = Math.sin(a)
      const cb = Math.cos(b)
      const sb = Math.sin(b)

      const zx = zeiger.current.x
      const zy = zeiger.current.y
      const radius = bezug * 0.3
      const kraft = bezug * 0.11

      fachZahl.fill(0)
      let anzahl = 0

      for (let k = 0; k < N; k++) {
        /* Erst um die Hochachse, dann kippen. */
        let x = px[k] * ca + pz[k] * sa2
        let z = -px[k] * sa2 + pz[k] * ca
        let y = py[k]
        const y2 = y * cb - z * sb
        z = y * sb + z * cb
        y = y2

        /* Dieselbe Drehung fuer die Normale — nur ihr z entscheidet, ob die
           Ziffer zur Kamera zeigt. */
        let mx = nx[k] * ca + nz[k] * sa2
        let mz = -nx[k] * sa2 + nz[k] * ca
        const my = ny[k]
        mz = my * sb + mz * cb

        if (mz <= 0.06) continue

        const s = KAMERA / (KAMERA - z)
        let bx = x * s * massstab
        let by = y * s * massstab

        /* Die Delle. Sie wirkt auf dem Bildschirm und nicht im Modell: eine
           Verformung im Modell haette den Knoten aufgerissen, hier legt sie
           sich als Linse darueber. */
        const f = zug(bx - zx, by - zy, radius)
        if (f > 0) {
          const dx = bx - zx
          const dy = by - zy
          const d = Math.hypot(dx, dy) || 0.0001
          bx += (dx / d) * f * kraft
          by += (dy / d) * f * kraft
        }

        sx[anzahl] = bx
        sy[anzahl] = by
        sw[anzahl] = s * (1 + f * 0.8)
        sd[anzahl] = z
        sa[anzahl] = (0.22 + 0.78 * Math.pow(mz, 0.7)) * (0.55 + 0.45 * s * 0.8)

        /* Die Ziffer liegt auf dem Schlauch, also in Richtung seiner
           Tangente. Der Winkel kommt aus derselben Drehung. */
        const r = (k / UM) | 0
        const ttx = tx[r] * ca + tz[r] * sa2
        const tty = ty[r] * cb - (-tx[r] * sa2 + tz[r] * ca) * sb
        swi[anzahl] = Math.atan2(tty, ttx)

        sichtbar[anzahl] = k
        anzahl++
      }

      /* Tiefen einfaechern. */
      let min = Infinity
      let max = -Infinity
      for (let i = 0; i < anzahl; i++) {
        if (sd[i] < min) min = sd[i]
        if (sd[i] > max) max = sd[i]
      }
      const spanne = max - min || 1
      for (let i = 0; i < anzahl; i++) {
        const f2 = Math.min(FAECHER - 1, ((sd[i] - min) / spanne) * FAECHER) | 0
        fach[i] = f2
        fachZahl[f2]++
      }

      ctx.setTransform(dpr, 0, 0, dpr, br / 2, ho / 2)
      ctx.clearRect(-br / 2, -ho / 2, br, ho)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = akzent

      const grund = bezug * 0.027
      /* Von hinten nach vorn. Ohne das legen sich Ziffern der Rueckseite
         ueber die Vorderseite, sobald sich der Knoten sich selbst
         durchdringt. Die Reihenfolge entsteht durch Zaehlsortieren ueber die
         Faecher: ein Durchlauf zum Zaehlen, einer zum Einordnen. Der naive
         Weg — pro Fach einmal durch alle Eintraege — waere bei zwanzig
         Faechern und siebzehnhundert Ziffern vierunddreissigtausend
         Vergleiche pro Bild fuer nichts. */
      fachStart[0] = 0
      for (let f2 = 0; f2 < FAECHER; f2++) fachStart[f2 + 1] = fachStart[f2] + fachZahl[f2]
      const platz = fachStart.slice(0, FAECHER)
      for (let i = 0; i < anzahl; i++) reihe[platz[fach[i]]++] = i

      /* Zwei Sparsamkeiten, beide nachgemessen und beide noetig, weil hier
         rund fuenfzehnhundert Zeichen pro Bild durchlaufen:
       *
         Erstens die Matrix von Hand statt save/translate/rotate/restore —
         vier Aufrufe werden einer, und der eine rechnet dieselbe Drehung.
         Zweitens die Schriftgroesse in Stufen. `ctx.font` zu setzen heisst,
         eine Zeichenkette zu zerlegen; pro Ziffer einmal waere das der
         teuerste Posten der ganzen Schleife. Da von hinten nach vorn gemalt
         wird, aendert sich die Stufe ohnehin nur ein paar Dutzend Mal. */
      let stufe = -1
      for (let r2 = 0; r2 < anzahl; r2++) {
        const i = reihe[r2]
        const g = Math.round(grund * sw[i] * 4)
        if (g !== stufe) {
          stufe = g
          ctx.font = `500 ${g / 4}px ${schrift}`
        }
        ctx.globalAlpha = sa[i]
        const co = Math.cos(swi[i]) * dpr
        const si = Math.sin(swi[i]) * dpr
        ctx.setTransform(co, si, -si, co, br / 2 + dpr * sx[i], ho / 2 + dpr * sy[i])
        ctx.fillText(ZIFFERN[ziffern[sichtbar[i]]], 0, 0)
      }
      ctx.setTransform(dpr, 0, 0, dpr, br / 2, ho / 2)
      ctx.globalAlpha = 1
    }

    if (reduce) {
      zeit = 2.1
      drehung = 0.8
      zeichnen()
      const groesseR = new ResizeObserver(() => {
        messen()
        zeichnen()
      })
      groesseR.observe(el)
      return () => groesseR.disconnect()
    }

    const bild = (jetzt: number) => {
      lauf = requestAnimationFrame(bild)
      const dt = letzte ? Math.min(0.05, (jetzt - letzte) / 1000) : 0.016
      letzte = jetzt
      if (!sichtbarImBild) return

      const u = Math.max(0, Math.min(1, unruhe.get()))
      zeit += dt
      drehung += dt * (0.24 + u * 0.5)

      /* Ohne Zeiger wandert ein gedachter. Auf dem Telefon gibt es keinen
         Mauszeiger, und ein Knoten, der dort nur ruhig dreht, waere die halbe
         Sache. */
      if (!zeiger.current.an) {
        zeiger.current.zx = Math.cos(zeit * 0.31) * bezug * 0.26
        zeiger.current.zy = Math.sin(zeit * 0.47) * bezug * 0.2
      }
      zeiger.current.x += (zeiger.current.zx - zeiger.current.x) * Math.min(1, dt * 7)
      zeiger.current.y += (zeiger.current.zy - zeiger.current.y) * Math.min(1, dt * 7)

      /* Ziffernwechsel. Im ruhigen Akt tauschen ein paar pro Bild, im
         unruhigen ein Vielfaches — das ist der ganze Unterschied zwischen
         "wird gemessen" und "die Gewichtung wird gerade umgestellt". */
      const wechsel = 4 + Math.round(u * 40)
      for (let i = 0; i < wechsel; i++) {
        ziffern[(Math.random() * N) | 0] = (Math.random() * 10) | 0
      }

      zeichnen()
    }

    /* Ausserhalb des Bildschirms rechnet nichts. Die Schleife bleibt
       angemeldet, damit sie beim Zurueckscrollen nicht neu anlaufen muss —
       sie kehrt nur sofort um. */
    const beobachter = new IntersectionObserver(
      ([e]) => {
        sichtbarImBild = e.isIntersecting
      },
      { rootMargin: '20% 0px' },
    )
    beobachter.observe(el)

    const groesse = new ResizeObserver(messen)
    groesse.observe(el)

    lauf = requestAnimationFrame(bild)
    return () => {
      cancelAnimationFrame(lauf)
      beobachter.disconnect()
      groesse.disconnect()
    }
  }, [reduce, unruhe])

  const setzen = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = flaeche.current
    if (!el) return
    const r = el.getBoundingClientRect()
    zeiger.current.zx = e.clientX - r.left - r.width / 2
    zeiger.current.zy = e.clientY - r.top - r.height / 2
    zeiger.current.an = true
  }

  return (
    <div
      className="hd-verst-zeichen"
      onPointerMove={setzen}
      onPointerDown={setzen}
      onPointerLeave={() => {
        zeiger.current.an = false
      }}
    >
      <canvas ref={flaeche} className="hd-verst-flaeche" role="img" aria-label={beschriftung} />
    </div>
  )
}
