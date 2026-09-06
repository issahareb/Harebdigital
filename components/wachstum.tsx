/**
 * Die Wachstumsszene rechts in der Buehne.
 *
 * Eine Ameise laeuft durch eine Tuer und kommt als Elefant wieder heraus.
 * Was es mitteilt: hier wird aus klein gross, und zwar durch etwas hindurch,
 * das gebaut werden muss. Das ist der Verkaufssatz der Seite als Bild.
 *
 * Warum das ueberhaupt hier steht: die Buehne war ein Film mit Schrift davor
 * und sonst nichts. Die rechte Haelfte trug Nebel. Ein Blickfang dort gibt
 * dem Bild eine zweite Stelle, an der etwas passiert, ohne dass der Film
 * lauter werden muss.
 *
 * Die beiden Silhouetten sind erzeugt, nicht gezeichnet. `design-taste-frontend`
 * Abschnitt 4.8: handgemalte Zier-SVGs sind die letzte Wahl, ein
 * Bildgenerator die erste, wenn einer vorhanden ist. Sie kamen weiss auf
 * Schwarz und wurden freigestellt, indem die Helligkeit zur Deckkraft wurde.
 *
 * Die Bewegung ist reines CSS. Kein Skript, kein Zustand, keine Messung —
 * eine Schleife aus `transform` und `opacity`, die der Browser auf der
 * Grafikkarte abfaehrt. Bei abgeschalteter Bewegung steht der Elefant
 * einfach da: die Aussage bleibt, die Schleife faellt weg.
 */
export function Wachstum({ zeile, alt }: { zeile: string; alt: string }) {
  return (
    <div className="hd-wachstum">
      <p className="hd-wachstum__zeile">{zeile}</p>

      {/* Die Szene traegt ihre Beschreibung als Beschriftung, nicht als
          Alternativtext an den Bildern: die beiden Silhouetten allein sagen
          nichts, erst ihre Abfolge tut es. */}
      <div className="hd-wachstum__buehne" role="img" aria-label={alt}>
        <span aria-hidden className="hd-wachstum__tuer" />
        <span aria-hidden className="hd-wachstum__schwelle" />
        {/* `width` und `height` stehen dran, obwohl die Breite aus dem
            Stilblatt kommt: ohne die Eigenmasse kennt der Browser das
            Seitenverhaeltnis nicht und reserviert keine Hoehe — die Szene
            wuerde beim Laden aufspringen. Die Werte sind die echten Masse
            der freigestellten Dateien. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden
          alt=""
          src="/wachstum/ameise.webp"
          width={420}
          height={197}
          className="hd-wachstum__ameise"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden
          alt=""
          src="/wachstum/elefant.webp"
          width={900}
          height={766}
          className="hd-wachstum__elefant"
        />
      </div>
    </div>
  )
}
