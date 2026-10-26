import Link from 'next/link'
import type { HdLang } from '@/lib/hd-texte'
import { PRICING } from '@/lib/pricing'
import { localizedPath } from '@/lib/locale'

export function PricingSummary({ lang }: { lang: HdLang }) {
  const t = PRICING[lang]
  return <section className="wrap section-space" id="preise" aria-labelledby="pricing-title">
    <p className="eyebrow">HAREB DIGITAL</p>
    <h2 id="pricing-title">{t[0]}</h2>
    <div className="service-detail-grid">
      <div><h3>{t[1]}</h3><p>{t[2]}</p></div>
      <div><ul>
        {[490, 890, 190, 590].map((price, i) => <li key={price} style={{ paddingBlock: '0.75rem', borderBottom: '1px solid currentColor' }}><strong>{t[3+i]}: {price} €</strong> {t[7]}{i === 3 ? `, ${t[8]}` : ''}</li>)}
      </ul><p style={{ marginTop: '1.5rem' }}>{t[9]}</p><Link className="text-link" href={localizedPath(lang, '/kontakt/?leistung=neue-website')}>{t[10]} ↗</Link></div>
    </div>
  </section>
}
