import Link from 'next/link'
import { ArrowUpRight, Server, ShieldCheck, Sparkles } from 'lucide-react'
import { HOSTING_COPY } from '@/lib/hosting-copy'
import type { HdLang } from '@/lib/hd-texte'
import { localizedPath } from '@/lib/locale'

const icons = [Server, ShieldCheck, Sparkles]

export function HostingCare({ lang }: { lang: HdLang }) {
  const t = HOSTING_COPY[lang]
  return <section id="hosting-wartung" className="hosting-care wrap section-space" aria-labelledby="hosting-title">
    <div className="section-heading" data-reveal>
      <div>
        <div className="section-label"><span className="small-index">07 /</span><span className="eyebrow">{t.label}</span></div>
        <h2 id="hosting-title">{t.title.split('\n').map(line => <span className="heading-line" key={line}>{line}</span>)}</h2>
      </div>
      <p>{t.intro}</p>
    </div>
    <div className="hosting-care-grid">
      {t.cards.map((card, index) => {
        const Icon = icons[index]
        return <article key={card.title} data-reveal>
          <Icon size={28} strokeWidth={1.4} aria-hidden />
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          <ul>{card.items.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
      })}
    </div>
    <div className="hosting-care-commitment" data-reveal>
      <div><h3>{t.promise}</h3><p>{t.detail}</p></div>
      <Link className="text-link" href={localizedPath(lang, '/kontakt/')}>{t.cta}<ArrowUpRight size={18} aria-hidden /></Link>
    </div>
    <p className="hosting-care-scope">{t.scope}</p>
  </section>
}
