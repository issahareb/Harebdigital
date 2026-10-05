import Link from 'next/link'
import Image from 'next/image'
import { SERVICE_ART, ART_COPY } from '@/lib/studio-art'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { HD_TEXTE, type HdLang } from '@/lib/hd-texte'
import { STUDIO_COPY } from '@/lib/studio-copy'
import { DOMAIN } from '@/lib/marke'
import { localizedPath } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { HdUnterseite } from './hd-unterseite'
import { JsonLd, ORGANIZATION_ID } from './studio-schema'

const descriptions: Record<HdLang, string[]> = {
  de: [
    'Individuelles Webdesign aus Essen: Struktur, Texte, responsive Entwicklung und technisches SEO. Eine neue Website mit Issa Hareb von Hareb Digital planen.',
    'Website-Relaunch mit Hareb Digital: bestehende Inhalte bewahren, Design verbessern und Ladezeiten senken. Klare Planung und ein fester Ansprechpartner in Essen.',
    'Wiederkehrende Aufgaben automatisieren: Angebote, Terminerinnerungen und Anfragen. Hareb Digital aus Essen verbindet Abläufe mit deinen bestehenden Werkzeugen.',
    'Technisches SEO und AEO aus Essen: klare Seitenstruktur, lokale Sichtbarkeit und verständliche Antworten. Hareb Digital prüft und verbessert deine Website.',
  ],
  en: [
    'Bespoke web design from Essen: content, responsive development and technical SEO. Plan your new website directly with Issa Hareb at Hareb Digital.',
    'Redesign your website with Hareb Digital: preserve useful content, improve the design and reduce loading times. Clear planning and one point of contact.',
    'Automate recurring tasks, from quotes and appointment reminders to enquiries. Hareb Digital connects workflows with the tools your business already uses.',
    'Technical SEO and AEO from Essen: clear site structure, local visibility and useful answers. Hareb Digital reviews and improves your existing website.',
  ],
  es: [
    'Diseño web a medida desde Essen: contenidos, desarrollo adaptable y SEO técnico. Planifica tu nueva web directamente con Issa Hareb en Hareb Digital.',
    'Rediseña tu web con Hareb Digital: conserva los contenidos útiles, mejora el diseño y reduce los tiempos de carga. Planificación clara y contacto directo.',
    'Automatiza tareas recurrentes, presupuestos, recordatorios y consultas. Hareb Digital conecta procesos con las herramientas que tu empresa ya utiliza.',
    'SEO técnico y AEO desde Essen: estructura clara, visibilidad local y respuestas útiles. Hareb Digital analiza y mejora tu sitio web actual.',
  ],
}
export function serviceMetadata(lang: HdLang, slug: string) {
  const index = HD_TEXTE[lang].leistungen.punkte.findIndex((l) => l.slug === slug)
  if (index < 0) notFound()
  const title = `${STUDIO_COPY[lang].serviceNames[index]}${lang === 'de' ? ' in Essen' : ''} | Hareb Digital`
  return pageMetadata(lang, `/leistungen/${slug}/`, title, descriptions[lang][index])
}
export function ServicePage({ lang, slug }: { lang: HdLang; slug: string }) {
  const t = STUDIO_COPY[lang]
  const original = HD_TEXTE[lang]
  const i = original.leistungen.punkte.findIndex((l) => l.slug === slug)
  if (i < 0) notFound()
  const service = original.leistungen.punkte[i]
  const url = `${DOMAIN}${localizedPath(lang, `/leistungen/${slug}/`)}`
  return (
    <HdUnterseite lang={lang} motiv>
      <nav className="breadcrumbs" aria-label={t.breadcrumb}>
        <Link href={localizedPath(lang)}>{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`${localizedPath(lang)}#leistungen`}>{t.nav[1]}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t.serviceNames[i]}</span>
      </nav>
      <span className="eyebrow">
        {service.n} / {t.nav[1]}
      </span>
      <h1 className="mt-5">{t.serviceNames[i]}</h1>
      <p className="service-detail-lead">{service.detail.vorspann}</p>
      <figure className="service-detail-art" data-reveal>
        <Image src={`/studio/impulse/${SERVICE_ART[i]}-1200.webp`} alt={ART_COPY[lang].services[i]} width={1200} height={900} sizes="(max-width: 700px) 90vw, 1050px" />
        <figcaption><span>0{i + 1} / {t.serviceNames[i]}</span><span>HAREB DIGITAL</span></figcaption>
      </figure>
      <div className="service-detail-grid" data-reveal>
        <section>
          <h2>{service.detail.dabei.titel}</h2>
          <ul>
            {service.detail.dabei.punkte.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <div>
          <section>
            <h2>{service.detail.ablauf.titel}</h2>
            <p>{service.detail.ablauf.text}</p>
          </section>
          <section>
            <h2>{service.detail.preis.titel}</h2>
            <p>{service.detail.preis.text}</p>
          </section>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Link
          href={`${localizedPath(lang, '/kontakt/')}?leistung=${service.slug}`}
          className="button button-dark"
        >
          {t.project}
          <ArrowUpRight size={18} aria-hidden />
        </Link>
        <Link href={`${localizedPath(lang)}#leistungen`} className="text-link">
          {t.nav[1]}
          <ArrowUpRight size={17} aria-hidden />
        </Link>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': `${url}#service`,
              name: t.serviceNames[i],
              description: descriptions[lang][i],
              url,
              provider: {
                '@type': 'Organization',
                '@id': ORGANIZATION_ID,
                name: 'Hareb Digital',
                url: `${DOMAIN}/`,
              },
              areaServed: { '@type': 'Country', name: 'Germany' },
              availableChannel: {
                '@type': 'ServiceChannel',
                serviceUrl: `${DOMAIN}${localizedPath(lang, '/kontakt/')}`,
              },
            },
            {
              '@type': 'WebPage',
              '@id': `${url}#webpage`,
              url,
              name: t.serviceNames[i],
              inLanguage: lang,
              mainEntity: { '@id': `${url}#service` },
              isPartOf: { '@id': `${DOMAIN}/#website` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t.home,
                  item: `${DOMAIN}${localizedPath(lang)}`,
                },
                { '@type': 'ListItem', position: 2, name: t.serviceNames[i], item: url },
              ],
            },
          ],
        }}
      />
    </HdUnterseite>
  )
}
