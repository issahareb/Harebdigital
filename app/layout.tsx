import type { Metadata, Viewport } from 'next'
import { Anton, League_Spartan, Oswald, Source_Sans_3 } from 'next/font/google'
import { HD_HREFLANG } from '@/lib/hd-texte'
import { DOMAIN } from '@/lib/marke'
import { sprache } from '@/lib/sprache'
import './globals.css'

/**
 * Das Wurzel-Layout von hareb.digital.
 *
 * Die Seite kam als `/start` aus dem Portfolio-Repo herüber, wo sie unter
 * issahareb.me lag und `noindex` trug — mit der ausdrücklichen Begründung,
 * dass eine Seite, die erst unter der einen Domain Bewertungen sammelt und
 * danach umzieht, gegen sich selbst anträte. Der Umzug ist jetzt passiert,
 * die eigene Domain steht, und damit fällt der Grund weg: hier wird
 * indexiert.
 *
 * Was dabei unverändert mitgekommen ist: die Sprachwahl aus dem
 * Accept-Language-Kopf und einem Keks statt aus der Adresse. Das war unter
 * `noindex` richtig — der Verkehr kam aus Anzeigen, und ein Besucher sollte
 * ohne Zwischenklick in seiner Sprache ankommen.
 *
 * OFFEN, und zwar bewusst als eigener Schritt: mit Index ist es das nicht
 * mehr. Derselbe Pfad liefert je nach Kopf einen anderen Text, und
 * `Vary: Accept-Language` liesse sich hier nicht einmal setzen — der App
 * Router schreibt `Vary` für seine eigenen RSC-Anfragen und überschreibt
 * dabei alles, was aus `headers()` oder aus einer Middleware kommt
 * (nachgemessen, beides kam nicht an). Die Sprachen brauchen eigene
 * Adressen samt hreflang. Das ist der nächste Umbau, nicht dieser.
 */

const bodyFace = Source_Sans_3({ subsets: ['latin'], variable: '--font-body-face' })
const headingFace = League_Spartan({ subsets: ['latin'], variable: '--font-heading-face' })
const posterFace = Anton({ subsets: ['latin'], weight: ['400'], variable: '--font-poster-face' })
const labelFace = Oswald({ subsets: ['latin'], variable: '--font-label-face' })

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      /* /favicon.ico steht mit dabei und nicht nur als Datei im Ordner:
         Googles Favicon-Crawler fragt genau diesen Pfad ab. */
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon-32-v2.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512-v2.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon-v2.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  /* Dunkel, seit der Held ein formatfuellender Film ist: ein Schreibtisch auf
     einem Berggipfel im Sonnenaufgang. Die Seite darunter im hellen Papierton
     zu lassen waere kein Wechsel, sondern ein Bruch — man saehe zwei Seiten,
     die zufaellig untereinander stehen.

     Der Wert steuert auch die Farbe der Adressleiste auf dem Telefon und die
     Voreinstellung der Formularfelder. Beides stand vorher auf Hell und waere
     jetzt zweimal falsch. */
  colorScheme: 'dark',
  themeColor: '#0b0a09',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  /* Dieselbe Sprachwahl wie in der Seite darunter, aus demselben Kopf. Sie
     steht hier ein zweites Mal, weil nur das Layout das html-Element schreibt
     und ein falsches lang-Attribut echte Folgen hat: Vorleseprogramme sprechen
     die Seite dann mit deutscher Aussprache englisch vor. */
  const lang = await sprache()
  return (
    <html
      lang={HD_HREFLANG[lang]}
      className={`${bodyFace.variable} ${headingFace.variable} ${posterFace.variable} ${labelFace.variable}`}
    >
      <body className="hd antialiased">{children}</body>
    </html>
  )
}
