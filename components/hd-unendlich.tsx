"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, type MotionValue } from "motion/react";

/**
 * Die Unendlichkeitsschleife, mit Code gezeichnet.
 *
 * Warum gezeichnet und nicht als Datei: die Schleife ist das Argument des
 * Abschnitts und kein Schmuck. Ein Algorithmus misst dieselben Groessen immer
 * wieder, in einer Bahn ohne Anfang und ohne Ende, und die Ziffern darauf sind
 * die Messwerte. Ein fertiges Bild koennte das zeigen; nur ein gerechnetes
 * kann darauf reagieren, dass jemand mit der Maus hineinfaehrt. Genau das war
 * die Vorgabe.
 *
 * Die Bahn ist eine Lemniskate von Bernoulli. Sie ist die mathematische
 * Fassung des Zeichens: eine einzige geschlossene Kurve, die sich in der
 * Mitte kreuzt. Zwei aneinandergelegte Kreise waeren einfacher und an der
 * Kreuzung sofort als Fuge zu erkennen.
 *
 * Was hier bewusst NICHT passiert: kein React-Zustand pro Bild. Die Schleife
 * laeuft mit sechzig Bildern in der Sekunde, und jeder davon als Zustand
 * waere sechzig Durchlaeufe des ganzen Abschnitts pro Sekunde. Der
 * Unruhewert kommt als MotionValue herein und wird in der Schleife gelesen,
 * der Zeiger liegt in einem Ref. Beides loest keine Darstellung aus.
 */

const TAU = Math.PI * 2;
const ZIFFERN = "0123456789";

/* Ein Punkt der Lemniskate. `a` ist die halbe Breite. */
function bahn(t: number, a: number): [number, number] {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const n = 1 + s * s;
  return [(a * c) / n, (a * s * c) / n];
}

/* Die Verzerrung. Der Zeiger drueckt alles im Umkreis von sich weg, quadratisch
   abfallend — linear abfallend sah aus, als schoebe man eine Scheibe, nicht als
   verforme man etwas Elastisches. Zurueck gibt sie auch die Staerke, weil die
   Ziffer an dieser Stelle zusaetzlich groesser und schraeger stehen soll. */
function verzerrt(
  x: number,
  y: number,
  px: number,
  py: number,
  radius: number,
  kraft: number,
): [number, number, number] {
  const dx = x - px;
  const dy = y - py;
  const d = Math.hypot(dx, dy) || 0.0001;
  if (d > radius) return [x, y, 0];
  const f = 1 - d / radius;
  const s = f * f * kraft;
  return [x + (dx / d) * s, y + (dy / d) * s, f];
}

export function HdUnendlich({
  unruhe,
  beschriftung,
}: {
  /* 0 = ruhig, 1 = die Gewichtung verschiebt sich. Steuert Tempo, Ziffernwechsel
     und den weissen Versatz. */
  unruhe: MotionValue<number>;
  beschriftung: string;
}) {
  const flaeche = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  /* Zeigerziel und gefederter Ist-Wert. Ohne die Federung springt die Delle
     dorthin, wo die Maus gerade ist, statt ihr zu folgen. */
  const zeiger = useRef({ zx: 0, zy: 0, x: 0, y: 0, an: false });

  useEffect(() => {
    const el = flaeche.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    /* `seite` ist die Bezugsgroesse fuer alles Gezeichnete und haengt an der
       Breite, nicht an der kleineren Seite: die Flaeche ist bewusst breiter
       als hoch, und an der Hoehe gemessen waere die Schleife darin winzig. */
    let br = 0;
    let ho = 0;
    let seite = 0;
    let dpr = 1;

    const messen = () => {
      const r = el.getBoundingClientRect();
      br = Math.max(1, r.width);
      ho = Math.max(1, r.height);
      seite = br;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      el.width = Math.round(br * dpr);
      el.height = Math.round(ho * dpr);
    };
    messen();

    /* Die Akzentfarbe steht als CSS-Variable im Abschnitt und wird einmal
       ausgelesen. `oklch()` kann der Canvas seit Jahren, aber nur als
       fertige Zeichenkette — deshalb hier die getrennten Alpha-Werte statt
       einer Farbe mit eingebautem Alpha. */
    const stil = getComputedStyle(el);
    const akzent =
      stil.getPropertyValue("--hd-schleife-farbe").trim() || "#7fe3e0";
    const schrift =
      stil.getPropertyValue("--hd-schleife-schrift").trim() ||
      "ui-sans-serif, sans-serif";

    const N = 128;
    const ziffern: string[] = Array.from(
      { length: N },
      () => ZIFFERN[(Math.random() * 10) | 0],
    );

    /* Gleiche Schritte im Parameter sind auf der Lemniskate keine gleichen
       Abstaende auf der Kurve: an der Kreuzung draengeln sich die Ziffern,
       auf den Bauchseiten reisst die Kette auf. Sichtbar war das als "X mit
       Luecken" statt als geschlossenes Zeichen. Deshalb einmal die Bogenlaenge
       tabellieren und die Ziffern danach setzen. Die Tabelle haengt nur an
       der Form, nicht an der Groesse — sie wird also genau einmal gebaut. */
    const FEIN = 1440;
    const bogen = new Float64Array(FEIN + 1);
    {
      let vx = 1;
      let vy = 0;
      for (let i = 1; i <= FEIN; i++) {
        const t = (i / FEIN) * TAU;
        const [x, y] = bahn(t, 1);
        bogen[i] = bogen[i - 1] + Math.hypot(x - vx, y - vy);
        vx = x;
        vy = y;
      }
    }
    const gesamt = bogen[FEIN];
    /* Zu jedem der N Plaetze der passende Parameterwert. */
    const stellen = new Float64Array(N);
    {
      let j = 0;
      for (let i = 0; i < N; i++) {
        const ziel = (i / N) * gesamt;
        while (j < FEIN && bogen[j + 1] < ziel) j++;
        const spanne = bogen[j + 1] - bogen[j] || 1;
        stellen[i] = ((j + (ziel - bogen[j]) / spanne) / FEIN) * TAU;
      }
    }

    let phase = 0;
    let zeit = 0;
    let letzte = 0;
    let lauf = 0;
    let sichtbar = true;

    const bild = (jetzt: number) => {
      lauf = requestAnimationFrame(bild);
      const dt = letzte ? Math.min(0.05, (jetzt - letzte) / 1000) : 0.016;
      letzte = jetzt;
      if (!sichtbar) return;

      const u = Math.max(0, Math.min(1, unruhe.get()));
      zeit += dt;
      phase += dt * (0.22 + u * 0.75);

      /* Ohne Zeiger wandert ein gedachter. Auf dem Telefon gibt es keinen
         Mauszeiger, und eine Schleife, die dort nur ruhig laeuft, waere die
         halbe Sache. Er faehrt die beiden Baeuche ab und nicht die Mitte: an
         der Kreuzung liegen die Ziffern ohnehin am dichtesten, und eine Delle
         genau dort machte aus ihnen einen Haufen. */
      if (!zeiger.current.an) {
        zeiger.current.zx = Math.cos(zeit * 0.34) * seite * 0.33;
        zeiger.current.zy = Math.sin(zeit * 0.68) * ho * 0.2;
      }
      zeiger.current.x +=
        (zeiger.current.zx - zeiger.current.x) * Math.min(1, dt * 7);
      zeiger.current.y +=
        (zeiger.current.zy - zeiger.current.y) * Math.min(1, dt * 7);

      /* Ziffernwechsel. Im ruhigen Akt tauscht eine pro Bild, im unruhigen
         bis zu acht — das ist der ganze Unterschied zwischen "wird gemessen"
         und "die Gewichtung wird gerade umgestellt". */
      const wechsel = 1 + Math.round(u * 7);
      for (let k = 0; k < wechsel; k++) {
        ziffern[(Math.random() * N) | 0] = ZIFFERN[(Math.random() * 10) | 0];
      }

      ctx.setTransform(dpr, 0, 0, dpr, br / 2, ho / 2);
      ctx.clearRect(-br / 2, -ho / 2, br, ho);

      const a = seite * 0.4;
      const px = zeiger.current.x;
      const py = zeiger.current.y;
      const radius = seite * 0.27;
      const kraft = seite * 0.075;

      /* Zuerst die Bahn selbst, sehr schwach. Sie haelt die Ziffern
         zusammen: ohne sie liest sich der Ring an duenn besetzten Stellen
         als Streuung und nicht als Kurve. */
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const t = (i / 240) * TAU;
        const [bx, by] = bahn(t, a);
        const [vx, vy] = verzerrt(bx, by, px, py, radius, kraft);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.strokeStyle = akzent;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.stroke();

      const grad = seite * 0.038;
      ctx.font = `500 ${grad}px ${schrift}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < N; i++) {
        const t = stellen[i];
        const [bx, by] = bahn(t, a);
        const [vx, vy, f] = verzerrt(bx, by, px, py, radius, kraft);

        /* Die Ziffer liegt auf der Kurve, nicht darauf gestellt. Der Winkel
           kommt aus zwei Nachbarpunkten statt aus einer Ableitung von Hand:
           kuerzer, und an der Kreuzung genauso richtig. */
        const [ax, ay] = bahn(t + 0.02, a);
        const winkel = Math.atan2(ay - by, ax - bx);

        /* Eine Welle laeuft die Bahn entlang und laesst die Ziffern
           aufleuchten. Was es mitteilt: hier fliesst etwas, es steht nicht. */
        const welle = 0.5 + 0.5 * Math.sin(t * 3 - phase * 3.2);
        const hell = 0.55 + 0.45 * welle * welle;

        ctx.save();
        ctx.translate(vx, vy);
        ctx.rotate(winkel + f * 0.8);
        ctx.scale(1 + f * 0.85, 1 + f * 0.85);
        ctx.globalAlpha = hell;
        ctx.fillStyle = akzent;
        ctx.fillText(ziffern[i], 0, 0);
        ctx.restore();

        /* Der weisse Versatz im unruhigen Akt. Er ist kein Farbeffekt,
           sondern ein Nachbild: dieselbe Ziffer, wo sie eben noch stand. */
        if (u > 0.02) {
          ctx.save();
          ctx.translate(vx + u * 7, vy - u * 3);
          ctx.rotate(winkel + f * 0.55);
          ctx.globalAlpha = hell * u * 0.34;
          ctx.fillStyle = "#ffffff";
          ctx.fillText(ziffern[i], 0, 0);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    };

    /* Bei reduzierter Bewegung genau ein Bild, ohne Delle und ohne Schleife. */
    if (reduce) {
      const a = seite * 0.4;
      ctx.setTransform(dpr, 0, 0, dpr, br / 2, ho / 2);
      ctx.clearRect(-br / 2, -ho / 2, br, ho);
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const [bx, by] = bahn((i / 240) * TAU, a);
        if (i === 0) ctx.moveTo(bx, by);
        else ctx.lineTo(bx, by);
      }
      ctx.strokeStyle = akzent;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = `500 ${seite * 0.038}px ${schrift}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = akzent;
      for (let i = 0; i < N; i++) {
        const t = stellen[i];
        const [bx, by] = bahn(t, a);
        const [ax, ay] = bahn(t + 0.02, a);
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(Math.atan2(ay - by, ax - bx));
        ctx.fillText(ziffern[i], 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      return;
    }

    /* Ausserhalb des Bildschirms rechnet nichts. Die Schleife bleibt
       angemeldet, damit sie beim Zurueckscrollen nicht neu anlaufen muss —
       sie kehrt nur sofort um. */
    const beobachter = new IntersectionObserver(
      ([e]) => {
        sichtbar = e.isIntersecting;
      },
      { rootMargin: "20% 0px" },
    );
    beobachter.observe(el);

    const groesse = new ResizeObserver(messen);
    groesse.observe(el);

    lauf = requestAnimationFrame(bild);
    return () => {
      cancelAnimationFrame(lauf);
      beobachter.disconnect();
      groesse.disconnect();
    };
  }, [reduce, unruhe]);

  const setzen = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = flaeche.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    zeiger.current.zx = e.clientX - r.left - r.width / 2;
    zeiger.current.zy = e.clientY - r.top - r.height / 2;
    zeiger.current.an = true;
  };

  return (
    <div
      className="hd-verst-schleife"
      onPointerMove={setzen}
      onPointerDown={setzen}
      onPointerLeave={() => {
        zeiger.current.an = false;
      }}
    >
      <canvas
        ref={flaeche}
        className="hd-verst-flaeche"
        role="img"
        aria-label={beschriftung}
      />
    </div>
  );
}
