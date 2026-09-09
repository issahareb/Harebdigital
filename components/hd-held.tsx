"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { EchoText } from "./echo-text";

/**
 * Die grosse Bühne — einmal als Standbild, einmal als Film.
 *
 * `motiv="bild"` ist die Bühne ganz oben: ein einzelnes Standbild, das den
 * ganzen Bildschirm füllt, mit der Schlagzeile darüber. `motiv="film"` ist
 * derselbe Aufbau mit dem Film, der am Scrollen hängt — der stand vorher
 * oben und hat jetzt weiter unten seinen eigenen Abschnitt.
 *
 * Warum ein Bauteil und nicht zwei: alles ausser dem Motiv ist identisch —
 * der Schleier, die Fluchtlinie des Textes, das Zurückziehen der Schrift, der
 * Hinweis nach unten. Zwei Bauteile hiesse, dieselbe Bühne zweimal zu
 * pflegen, und beim nächsten Eingriff wäre eine von beiden vergessen.
 *
 * Der Filmabschnitt ist zwei Bildschirme hoch, die Bühne darin klebt oben fest.
 * Was man scrollt, ist nicht die Seite, sondern die Laufzeit: Nebel zieht ab,
 * die Sonne kommt über den Grat, der Schreibtisch steht frei. Wer stehen
 * bleibt, bei dem bleibt das Bild stehen.
 *
 * Das Verfahren ist das aus taxibbessen (`desktop-video-scroll.ts`), hier auf
 * eine einzelne Bühne eingedampft und um das gebracht, was diese Seite anders
 * macht:
 *
 * 1. Der Film startet nicht bei Null. Das Ausgangsbild ist das Bild bei
 *    2,708 s der Vorlage — davor liegt nur Nebel, in dem nichts zu erkennen
 *    ist. Die Datei ist deshalb ab dort beschnitten; im Bauteil steht keine
 *    Verschiebung, der Film fängt einfach dort an, wo er anfangen soll.
 * 2. Sie hat alle sechs Bilder ein Schlüsselbild. Die Vorlage in taxibb hatte
 *    zwei auf 494 Bilder — jeder Sprung musste dann bis zu 490 Bilder weit
 *    dekodieren, und genau daran ist der erste Versuch dort gescheitert. Das
 *    kostet Dateigrösse und ist der Preis fürs Springen.
 * 3. taxibbessen fährt nur ab 768 Pixeln. Hier fährt es auch auf dem Telefon,
 *    mit einer eigenen, kleineren Datei (960 statt 1600 Pixel Breite, 1,2
 *    statt 3,6 MB). Dazu ein Tastendruck auf Verdacht beim ersten Anfassen:
 *    iOS lädt einen Film mit `preload="auto"` nicht unbedingt vor, ein
 *    einmaliges play/pause zwingt es dazu. Ohne das ruckelt der erste Meter.
 * 4. Ein Standbild liegt darunter und wird zuerst gezeichnet. Es ist dasselbe
 *    Bild, nur früher da: der Film hat bei einer halben Sekunde Ladezeit
 *    sonst ein schwarzes Loch, und das ist das Erste, was jemand sieht.
 *
 * Die Dämpfung ist dieselbe wie dort: bildratenunabhängig über
 * `1 - exp(-14 * dt)`, und `currentTime` wird nur angefasst, wenn sich etwas
 * um mehr als ein halbes Bild geändert hat. Beides zusammen ist der
 * Unterschied zwischen "der Film folgt dem Rad" und "der Film zuckt".
 */

type Props = {
  /* Was auf der Bühne steht. Das Standbild braucht keine Laufzeit, also
     entfaellt bei ihm die ganze Filmmechanik — kein Vorladen, kein
     Nachfuehren, keine zweite Datei fuer schmale Geraete. */
  motiv: 'bild' | 'film';
  /* Genau eine Ueberschrift erster Ordnung pro Seite. Die gehoert der Bühne
     ganz oben; der Filmabschnitt weiter unten ist eine zweiter Ordnung. */
  rang?: 'h1' | 'h2';
  /* Der kleine Kicker ueber der Ueberschrift. Die Buehne ganz oben hat
     keinen — dort ist die Schlagzeile das Erste, was jemand liest. */
  label?: string;
  bild?: { src: string; klein?: string };
  /* Der Abschnitt gehoert diesem Bauteil, aber die Kopfzeile und der
     fliegende Knopf messen dagegen. Deshalb kommt der Verweis von aussen und
     wird hier nur eingehaengt. */
  sektion: React.RefObject<HTMLElement | null>;
  titelOben: string;
  titelUnten: string;
  vorspann: string;
  bildAlt: string;
  /* Der Hinweis nach unten. Nur die Buehne ganz oben hat einen: mitten auf
     der Seite ist "Scrollen" keine Auskunft, sondern eine Selbstverstaendlichkeit. */
  hinweis?: string;
  children: React.ReactNode;
};

const klemm = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);


export function HdHeld({
  motiv,
  rang = 'h1',
  label,
  bild,
  sektion,
  titelOben,
  titelUnten,
  vorspann,
  bildAlt,
  hinweis,
  children,
}: Props) {
  const reduce = !!useReducedMotion();
  const abschnitt = sektion;
  const film = useRef<HTMLVideoElement>(null);
  const [bereit, setBereit] = useState(false);
  const [quelle, setQuelle] = useState<string | null>(null);

  /* Welche Datei, entscheidet sich erst im Browser. Ein `media`-Attribut auf
     der Quelle waere der kurze Weg, aber das ist aus der Spezifikation für
     Filme herausgefallen und wird nicht überall gelesen. */
  useEffect(() => {
    if (reduce || motiv !== "film") return;
    const eng = window.matchMedia("(max-width: 900px)");
    const waehlen = () =>
      setQuelle(
        eng.matches ? "/videos/hero-berg-mobil.mp4" : "/videos/hero-berg.mp4",
      );
    waehlen();
    eng.addEventListener("change", waehlen);
    return () => eng.removeEventListener("change", waehlen);
  }, [reduce, motiv]);

  /* Der Fortschritt der Bühne, von 0 bis 1. Eine einzige Zahl für alles, was
     an ihr hängt: die Laufzeit des Films, das Zurückziehen des Textes, der
     Hinweis nach unten.

     Sie wird hier selbst gerechnet und kommt nicht aus `useScroll`. Mit
     `offset: ['start start', 'end end']` lief der Wert nachgemessen bis etwa
     0,72 hoch und danach wieder herunter — die Schlagzeile blendete auf der
     letzten Strecke also wieder ein, statt draussen zu bleiben. Die Rechnung
     unten ist dieselbe wie die für den Film, und damit können Bild und Text
     gar nicht mehr auseinanderlaufen. */
  const fortschrittWert = useMotionValue(0);

  /* Der Antrieb. Ein Zeiger auf die Zeit, gedämpft nachgeführt. */
  useEffect(() => {
    if (reduce) return;
    const el = abschnitt.current;
    if (!el) return;

    const v = film.current;
    if (v) {
      v.pause();
      v.loop = false;
      v.autoplay = false;
      v.muted = true;
      v.preload = "auto";
    }

    let laeuft = true;
    let zeit = 0;
    let ziel = 0;
    let letzte = performance.now();

    const fortschritt = () => {
      const r = el.getBoundingClientRect();
      const oben = r.top + window.scrollY;
      /* Der Weg ist die Höhe des Abschnitts minus der Bühne, die darin
         klebt: genau die Strecke, auf der die Bühne oben steht. */
      const weg = Math.max(el.offsetHeight - window.innerHeight, 1);
      return klemm((window.scrollY - oben) / weg);
    };

    /* Steht die Buehne im Bild? Startwert true, damit der erste Meter
       gerechnet wird, bevor der Beobachter das erste Mal antwortet. */
    let weiter = true;

    const bild = (jetzt: number) => {
      if (!laeuft) return;
      /* Ausserhalb des Bildes wird nichts gerechnet.
         Die Schleife lief vorher ueber die ganze Seite weiter — auch wenn die
         Buehne achttausend Pixel darueber lag. Auf dem Rechner faellt das
         nicht auf; auf einem Telefon haelt es den Videodekoder und einen
         Bildtakt am Leben, waehrend weiter unten die Galerie ihren eigenen
         Dekoder braucht. iOS hat dafuer eine harte Grenze, und wer sie
         reisst, bekommt keine Fehlermeldung, sondern eine neu geladene Seite.

         `weiter` wird vom Beobachter unten gesetzt. Die Schleife bleibt
         angemeldet, sie rechnet nur nichts — so faengt sie ohne Zutun wieder
         an, sobald die Buehne zurueck ins Bild kommt. */
      if (!weiter) {
        requestAnimationFrame(bild);
        return;
      }
      const dt = Math.min((jetzt - letzte) / 1000, 0.1);
      letzte = jetzt;

      const p = fortschritt();
      fortschrittWert.set(p);

      const dauer = v && Number.isFinite(v.duration) ? v.duration : 0;
      if (v && dauer > 0) {
        ziel = p * Math.max(dauer - 0.04, 0);
        /* Bildratenunabhängige Dämpfung: direkt genug fürs Rad, ruhig genug
           für die ungleichmässigen Scrollereignisse, die der Browser
           liefert. */
        zeit += (ziel - zeit) * (1 - Math.exp(-14 * dt));
        if (Math.abs(v.currentTime - zeit) > 1 / 120) v.currentTime = zeit;
      }

      requestAnimationFrame(bild);
    };

    const setzen = () => {
      if (!v) return;
      const dauer = Number.isFinite(v.duration) ? v.duration : 0;
      if (dauer <= 0) return;
      zeit = fortschritt() * Math.max(dauer - 0.04, 0);
      ziel = zeit;
      v.currentTime = zeit;
      setBereit(true);
    };

    /* iOS lädt sonst nichts vor. Ein einziges play/pause beim ersten
       Anfassen genügt, danach lässt sich springen. */
    const anstossen = () => {
      if (!v) return;
      const versuch = v.play();
      if (versuch) versuch.then(() => v.pause()).catch(() => {});
    };

    /* Ob die Buehne ueberhaupt in der Naehe ist. Ein Bildschirm Rand nach
       oben und unten, damit die Schleife wieder laeuft, bevor man die Buehne
       sieht — sonst stuende der Film beim Zurueckscrollen einen Moment. */
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        weiter = eintrag.isIntersecting;
        /* Ausserhalb wird der Film angehalten. Er ist ohnehin nur ein
           Standbild, das gescrubbt wird — laufen muss er nie. */
        if (!weiter && v) v.pause();
      },
      { rootMargin: "100% 0px" },
    );
    beobachter.observe(el);

    if (v) {
      if (v.readyState >= 1) setzen();
      v.addEventListener("loadedmetadata", setzen, { once: true });
      v.addEventListener("loadeddata", () => setBereit(true), { once: true });
      window.addEventListener("pointerdown", anstossen, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchstart", anstossen, {
        once: true,
        passive: true,
      });
    }

    const id = requestAnimationFrame(bild);
    return () => {
      laeuft = false;
      beobachter.disconnect();
      cancelAnimationFrame(id);
      window.removeEventListener("pointerdown", anstossen);
      window.removeEventListener("touchstart", anstossen);
    };
  }, [reduce, quelle, fortschrittWert]);

  /* Der Text zieht sich zurück, während der Film weiterläuft: das letzte
     Drittel der Bühne gehört dem Bild allein. */
  const Ueberschrift = rang;

  const textDeckung = useTransform(fortschrittWert, [0, 0.42, 0.72], [1, 1, 0]);
  const textY = useTransform(fortschrittWert, [0, 0.72], [0, -70]);
  const hinweisDeckung = useTransform(fortschrittWert, [0, 0.06], [1, 0]);

  return (
    <section
      ref={abschnitt}
      className={[
        "hd-held",
        motiv === "bild" ? "hd-held--bild" : "",
        rang === "h2" ? "hd-held--zweit" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={titelOben + " " + titelUnten}
    >
      <div className="hd-held-buehne">
        {/* Zuerst das Standbild. Es ist das LCP-Element dieser Seite und
            deshalb `priority`: der Film darüber hat immer Ladezeit. */}
        <Image
          src={bild?.src ?? "/videos/hero-berg.jpg"}
          alt={bildAlt}
          fill
          priority={motiv === "bild"}
          sizes="100vw"
          className="hd-held-bild"
        />

        {motiv === "film" && quelle && (
          <video
            ref={film}
            key={quelle}
            className="hd-held-film"
            data-bereit={bereit ? "ja" : "nein"}
            poster="/videos/hero-berg.jpg"
            preload="auto"
            muted
            playsInline
            tabIndex={-1}
            aria-hidden
          >
            <source src={quelle} type="video/mp4" />
          </video>
        )}

        <div className="hd-held-schleier" />

        <motion.div
          className="hd-held-text"
          style={{ opacity: textDeckung, y: textY }}
        >
          {/* Schrift oben, Knöpfe unten, das Bild dazwischen frei.

              Als ein Block standen sie zuerst am Fuss (dort lag der Text dem
              Schreibtisch im Weg) und danach oben (dort lagen die Knöpfe auf
              dem Bildschirm). Auseinandergezogen gehört die Mitte wieder dem
              Bild — und genau dort steht der Gegenstand, um den es geht. */}
          {/* Schrift links, Szene rechts.
              Die rechte Haelfte der Buehne trug bisher nur Nebel. Ein
              Blickfang dort gibt dem Bild eine zweite Stelle, an der etwas
              passiert, ohne dass der Film lauter werden muss. */}
          <div className="hd-held-kopf">
          <div>
            {/* Jede Zeile mit ihrem eigenen Nachhall (EchoText, React Bits).
              Über einem Film ist die Tönung wichtiger als in der alten,
              hellen Fassung: der Nachhall ist warm und dunkel getönt und
              liest sich dadurch als Schatten und nicht als zweite Schrift.
              Bei abgeschalteter Bewegung fallen die Schatten weg — das
              regelt das Stilblatt, nicht dieses Bauteil. */}
            {label ? <span className="hd-label hd-held-label">{label}</span> : null}
            <Ueberschrift className="font-display font-bold text-[color:var(--hd-ink)]">
              {[titelOben, titelUnten].filter(Boolean).map((zeile) => (
                <span key={zeile} className="hd-held-zeile">
                  <EchoText
                    text={zeile}
                    echoes={5}
                    offset={12}
                    lag={0.26}
                    fade={0.7}
                    blur={2}
                    direction="right"
                    duration={1100}
                    ease="ease-out"
                    cursorRadius={420}
                    tint="#2a1508"
                    color="#f7f4f0"
                    fontSize="inherit"
                    fontWeight="inherit"
                  />
                </span>
              ))}
            </Ueberschrift>

            <p className="hd-held-vorspann mt-5 max-w-[46ch] text-pretty text-[17px] leading-[1.6] sm:text-[19px]">
              {vorspann}
            </p>
          </div>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-3">
            {children}
          </div>
        </motion.div>

        {hinweis ? (
          <motion.div
            className="hd-held-hinweis"
            style={{ opacity: hinweisDeckung }}
            aria-hidden
          >
            <span>{hinweis}</span>
            <span />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
