
import { ArrowUpRight as InlineArrow } from 'lucide-react'
import Link from 'next/link'
import type { HdLang } from '@/lib/hd-texte'
import { PRICING, ONE_PAGER_PRICE, WEBSITE_PRICE, SHOP_PRICE, SHOP_FEATURES, WEBSITE_PACKAGE } from '@/lib/pricing'
import { localizedPath } from '@/lib/locale'

export function PricingSummary({ lang }: { lang: HdLang }) {
  const t = PRICING[lang]
  return <section className="wrap section-space" id="preise" aria-labelledby="pricing-title">
    <p className="eyebrow">HAREB DIGITAL</p>
    <h2 id="pricing-title">{t[0]}</h2>
    <div className="service-detail-grid">
      <div><h3>{t[1]}</h3><p>{t[2]}</p><p>{WEBSITE_PACKAGE[lang].timeline}</p><p>{WEBSITE_PACKAGE[lang].extras}</p></div>
      <div><ul>
        {[ONE_PAGER_PRICE, WEBSITE_PRICE, 190, WEBSITE_PRICE, SHOP_PRICE].map((price, i) => <li key={i} style={{ paddingBlock: '0.75rem', borderBottom: '1px solid currentColor' }}><strong>{i === 4 ? t[11] : t[3+i]}: {i !== 2 && { de: 'ab ', en: 'from ', es: 'desde ' }[lang]}{price.toLocaleString(lang)} €</strong> {t[7]}{i === 3 ? `, ${t[8]}` : ''}</li>)}
      </ul><p style={{ marginTop: '1.5rem' }}>{t[9]}</p>
      {lang === 'de' && <details><summary>Onlineshop im Detail</summary><ul>{SHOP_FEATURES.map(feature => <li key={feature}>{feature}</li>)}</ul></details>}<Link className="text-link" href={localizedPath(lang, '/kontakt/?leistung=neue-website')}>{t[10]} <InlineArrow size={16} aria-hidden /></Link></div>
    </div>
  </section>
}
