
import { ArrowUpRight as InlineArrow } from 'lucide-react'
import Link from 'next/link'
import type { HdLang } from '@/lib/hd-texte'
import { PRICING, WEBSITE_PRICE, WEBSITE_PACKAGE } from '@/lib/pricing'
import { localizedPath } from '@/lib/locale'

export function PricingSummary({ lang }: { lang: HdLang }) {
  const t = PRICING[lang]
  return <section className="wrap section-space" id="preise" aria-labelledby="pricing-title">
    <p className="eyebrow">HAREB DIGITAL</p>
    <h2 id="pricing-title">{t[0]}</h2>
    <div className="service-detail-grid">
      <div><h3>{t[1]}</h3><p>{t[2]}</p><p>{WEBSITE_PACKAGE[lang].timeline}</p><p>{WEBSITE_PACKAGE[lang].extras}</p></div>
      <div><ul>
        {[WEBSITE_PRICE, WEBSITE_PRICE, 190, WEBSITE_PRICE].map((price, i) => <li key={i} style={{ paddingBlock: '0.75rem', borderBottom: '1px solid currentColor' }}><strong>{t[3+i]}: {price} €</strong> {t[7]}{i === 3 ? `, ${t[8]}` : ''}</li>)}
      </ul><p style={{ marginTop: '1.5rem' }}>{t[9]}</p><Link className="text-link" href={localizedPath(lang, '/kontakt/?leistung=neue-website')}>{t[10]} <InlineArrow size={16} aria-hidden /></Link></div>
    </div>
  </section>
}
