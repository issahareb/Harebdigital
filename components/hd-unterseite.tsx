import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import type { HdLang } from '@/lib/hd-texte'

export function HdUnterseite({
  lang,
  motiv = false,
  children,
}: {
  lang: HdLang
  motiv?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader lang={lang} />
      <main id="main" className={`subpage wrap${motiv ? ' subpage--editorial' : ''}`}>
        {children}
      </main>
      <SiteFooter lang={lang} compact />
    </>
  )
}
export function Rechtsabschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight">{titel}</h2>
      <div className="mt-3 leading-relaxed text-[color:var(--hd-ink-soft)]">{children}</div>
    </section>
  )
}
