import Image from 'next/image'
import Link from 'next/link'
import { PORTFOLIO } from '@/lib/marke'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'

/**
 * Der Rahmen der Unterseiten: Kontakt, Impressum, Datenschutz.
 *
 * Die Landingpage bringt ihre Kopfzeile und ihre Fusszeile selbst mit — sie
 * sind dort an den Film und an den fliegenden Knopf gebunden und lassen sich
 * nicht herausloesen, ohne beides zu zerlegen. Die drei ruhigen Seiten
 * bekommen deshalb ihren eigenen, viel kleineren Rahmen: dieselbe Marke,
 * dieselben Farben, dieselbe Schrift, aber nichts, was sich bewegt.
 *
 * Das ist Absicht und nicht Sparsamkeit. Wer hier landet, sucht eine Adresse
 * oder einen Rechtstext; ein Scroll-Film davor waere im Weg. Zugehoerigkeit
 * ist eine Frage von Schrift, Farbe und Abstand, nicht davon, dieselben
 * Megabyte noch einmal auszuliefern.
 */
export function HdUnterseite({
  lang,
  children,
}: {
  lang: HdLang
  children: React.ReactNode
}) {
  const t = HD_TEXTE[lang]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="hd-rule-unten px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link href="/" className="hd-kartenmenue__marke">
            <Image src="/icon-32-v2.png" alt="" width={28} height={28} className="rounded-lg" />
            <span className="font-display text-[18px] font-bold tracking-tight">Hareb Digital</span>
          </Link>
          <Link
            href="/"
            className="text-[15px] text-[color:var(--hd-ink-soft)] hover:text-[color:var(--hd-ink)]"
          >
            {t.kontakt.zurueck}
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24 pt-14 sm:pt-20">{children}</main>

      <footer className="hd-rule px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <span className="text-[15px] text-[color:var(--hd-ink-soft)]">
            <strong className="font-semibold text-[color:var(--hd-ink)]">Hareb Digital</strong>,{' '}
            {t.fuss.inhaber}
          </span>
          <nav className="hd-fuss-nav flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] text-[color:var(--hd-ink-soft)] [&_a]:inline-flex [&_a]:min-h-[24px] [&_a]:items-center [&_a:hover]:text-[color:var(--hd-ink)]">
            <a href="mailto:info@hareb.org">info@hareb.org</a>
            <Link href="/impressum/">{t.fuss.impressum}</Link>
            <Link href="/datenschutz/">{t.fuss.datenschutz}</Link>
            <a href={PORTFOLIO} rel="me">
              {t.fuss.portfolio}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

/** Ueberschrift und Fliesstext der Rechtsseiten, in der Sprache der Seite. */
export function Rechtsabschnitt({
  titel,
  children,
}: {
  titel: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold tracking-tight">{titel}</h2>
      <div className="mt-3 leading-relaxed text-[color:var(--hd-ink-soft)]">{children}</div>
    </section>
  )
}
