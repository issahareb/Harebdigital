import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { DOMAIN, marke, PORTFOLIO } from '@/lib/marke'
import { localizedPath } from '@/lib/locale'
import { ONE_PAGER_PRICE, HOSTING_MONTHLY_PRICE } from '@/lib/pricing'

// Preserve the entity IDs already used by the portfolio and Taxi B&B.
export const ORGANIZATION_ID = `${PORTFOLIO}/#hareb-digital`
export const PERSON_ID = `${PORTFOLIO}/#issa-hareb`
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
export function StudioSchema({ lang }: { lang: HdLang }) {
  const t = STUDIO_COPY[lang]
  const url = `${DOMAIN}${localizedPath(lang)}`
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
            '@id': ORGANIZATION_ID,
            name: marke.name,
            url: `${DOMAIN}/`,
            logo: `${DOMAIN}/studio/logo-v1.png`,
            email: marke.kontaktEmail,
            telephone: marke.telefon,
            foundingDate: marke.gruendungsjahr,
            founder: { '@id': PERSON_ID },
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Nordrhein-Westfalen',
              addressLocality: marke.arbeitsort,
              addressCountry: marke.land,
            },
            areaServed: [{ '@type': 'City', name: marke.arbeitsort }, { '@type': 'City', name: 'Bonn' }, { '@type': 'Place', name: 'Ruhrgebiet' }, { '@type': 'Country', name: 'Germany' }],
            sameAs: ['https://share.google/EUZlSQOOkoXIK0AMM', PORTFOLIO, 'https://clutch.co/profile/hareb-digital', 'https://www.sortlist.com/fr/agency/hareb-digital'],
          },
          {
            '@type': 'Person',
            '@id': PERSON_ID,
            name: marke.inhaber,
            url: PORTFOLIO,
            jobTitle: 'Founder & Web Developer',
            worksFor: { '@id': ORGANIZATION_ID },
            sameAs: ['https://www.instagram.com/issa3701__/', 'https://www.tiktok.com/@issa3701'],
          },
          {
            '@type': 'WebSite',
            '@id': `${DOMAIN}/#website`,
            name: marke.name,
            url: `${DOMAIN}/`,
            inLanguage: ['de', 'en', 'es'],
            publisher: { '@id': ORGANIZATION_ID },
          },
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: t.title,
            description: t.description,
            inLanguage: lang,
            isPartOf: { '@id': `${DOMAIN}/#website` },
            about: { '@id': ORGANIZATION_ID },
            mainEntity: { '@id': `${url}#services` },
          },
          {
            '@type': 'OfferCatalog',
            '@id': `${url}#services`,
            name: HD_TEXTE[lang].leistungen.label,
            itemListElement: [...HD_TEXTE[lang].leistungen.punkte.map((service, i) => ({
              '@type': 'Offer',
              ...(i === 0 ? {
                priceCurrency: 'EUR',
                priceSpecification: { '@type': 'PriceSpecification', minPrice: ONE_PAGER_PRICE, priceCurrency: 'EUR' },
              } : {}),
              itemOffered: {
                '@type': 'Service',
                name: t.serviceNames[i],
                description: service.detail.vorspann,
                url: `${DOMAIN}${localizedPath(lang, `/leistungen/${service.slug}/`)}`,
                provider: { '@id': ORGANIZATION_ID },
              },
            })), {
              '@type': 'Offer',
              name: 'Betreuung/Hosting',
              price: HOSTING_MONTHLY_PRICE,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: HOSTING_MONTHLY_PRICE,
                priceCurrency: 'EUR',
                unitCode: 'MON',
                unitText: 'pro Monat',
                referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
              },
              itemOffered: { '@type': 'Service', name: 'Betreuung/Hosting', provider: { '@id': ORGANIZATION_ID } },
            }, ...(lang === 'de' ? ADDITIONAL_SERVICES.map(s => ({'@type':'Offer',itemOffered:{'@type':'Service',name:s.title,description:s.description,url:`${DOMAIN}/leistungen/${s.slug}/`,provider:{'@id':ORGANIZATION_ID}}})) : [])],
          },

        ],
      }}
    />
  )
}
