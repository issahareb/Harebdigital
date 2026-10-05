import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ART_COPY } from '@/lib/studio-art'
import { Anfrageformular } from './anfrageformular'
import { HdUnterseite } from './hd-unterseite'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { DOMAIN, marke } from '@/lib/marke'
import { JsonLd, ORGANIZATION_ID } from './studio-schema'
import { pageMetadata } from '@/lib/seo'

export function contactMetadata(lang: HdLang) {
  return pageMetadata(
    lang,
    '/kontakt/',
    `${HD_TEXTE[lang].kontakt.titel} | Hareb Digital Essen`,
    STUDIO_COPY[lang].contactDescription,
  )
}
export function ContactPage({ lang }: { lang: HdLang }) {
  const t = HD_TEXTE[lang].kontakt
  const copy = STUDIO_COPY[lang]
  const telephone = /^[+\d][\d\s()/.-]+$/.test(marke.telefon) ? marke.telefon : null
  return (
    <HdUnterseite lang={lang} motiv>
      <nav className="breadcrumbs" aria-label={copy.breadcrumb}>
        <Link href={localizedPath(lang)}>{copy.home}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t.titel}</span>
      </nav>
      <span className="eyebrow">HAREB DIGITAL · ESSEN</span>
      <h1 className="mt-5">{t.titel}</h1>
      <p className="service-detail-lead">{copy.contactText}</p>
      <div className="contact-columns">
        <div>
          <Suspense
            fallback={
              <p className="mt-12">
                <a href={`mailto:${marke.email}`}>{marke.email}</a>
              </p>
            }
          >
            <Anfrageformular
              f={t.formular}
              services={HD_TEXTE[lang].leistungen.punkte.map(({ slug, titel }) => ({
                slug,
                titel,
              }))}
              epost={marke.email}
            />
          </Suspense>
          <noscript>
            <p className="mt-8">
              <a className="text-link" href={`mailto:${marke.email}`}>
                {marke.email}
              </a>
            </p>
          </noscript>
        </div>
        <div className="contact-aside">
          <Image className="contact-art" src="/studio/impulse/contact-640.webp" alt={ART_COPY[lang].contact} width={640} height={480} sizes="(max-width: 700px) 90vw, 300px" />
          <dl className="contact-info">
          <div>
            <dt>{t.epost}</dt>
            <dd>
              <a href={`mailto:${marke.email}`}>{marke.email}</a>
            </dd>
          </div>
          {telephone && (
            <div>
              <dt>{t.telefon}</dt>
              <dd>
                <a href={`tel:${telephone.replace(/\s/g, '')}`}>{telephone}</a>
              </dd>
            </div>
          )}
          <div>
            <dt>{t.sitz}</dt>
            <dd>{marke.ort}, Deutschland</dd>
          </div>
          <div>
            <dt>
              {lang === 'de'
                ? 'Dein Ansprechpartner'
                : lang === 'en'
                  ? 'Your contact'
                  : 'Tu contacto'}
            </dt>
            <dd>{marke.inhaber}</dd>
          </div>
        </dl>
        </div>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${DOMAIN}${localizedPath(lang, '/kontakt/')}#webpage`,
          url: `${DOMAIN}${localizedPath(lang, '/kontakt/')}`,
          name: t.titel,
          inLanguage: lang,
          mainEntity: {
            '@type': 'Organization',
            '@id': ORGANIZATION_ID,
            name: marke.name,
            email: marke.email,
            url: DOMAIN,
          },
        }}
      />
    </HdUnterseite>
  )
}
