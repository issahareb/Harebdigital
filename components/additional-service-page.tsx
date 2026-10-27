import { SERVICE_QUESTIONS } from '@/lib/service-questions'
import { LocalServices } from './local-services'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { DOMAIN } from '@/lib/marke'
import { HdUnterseite } from './hd-unterseite'
import { JsonLd, ORGANIZATION_ID } from './studio-schema'

type Service = (typeof ADDITIONAL_SERVICES)[number]
export function additionalServiceMetadata(service: Service): Metadata {
  const url = `${DOMAIN}/leistungen/${service.slug}/`
  return { title: `${service.title} | Hareb Digital`, description: service.description,
    alternates: {canonical:url,languages:{'de-DE':url}},
    openGraph:{title:service.title,description:service.description,url,locale:'de_DE'} }
}
export function AdditionalServicePage({service:s}: {service:Service}) {
  const url = `${DOMAIN}/leistungen/${s.slug}/`
  return <HdUnterseite lang="de" motiv>
    <nav className="breadcrumbs" aria-label="Brotkrumennavigation"><Link data-track-id="additional-service-page-link-1" href="/">Startseite</Link><span>/</span><Link data-track-id="additional-service-page-link-2" href="/#leistungen">Leistungen</Link><span>/</span><span aria-current="page">{s.title}</span></nav>
    <span className="eyebrow">HAREB DIGITAL · LEISTUNGEN</span>
    <h1 className="mt-5">{s.title}</h1>
    <p className="service-detail-lead">{s.lead}</p>
    <div className="service-detail-grid">
      <section data-track-section="additional-service-page-section-3"><h2>Was wir umsetzen können</h2><ul>{s.items.map(item=><li key={item}>{item}</li>)}</ul></section>
      <div><section data-track-section="additional-service-page-section-4"><h2>So läuft die Zusammenarbeit</h2><p>{s.process}</p></section><section data-track-section="additional-service-page-section-5"><h2>{s.proofTitle}</h2><p>{s.proof}</p><Link data-track-id="additional-service-page-link-6" className="text-link" href={s.proofHref}>{s.proofLabel} ↗</Link></section></div>
    </div>
    <section className="service-buying-questions" aria-label="Fragen zur Zusammenarbeit"><h2>Vor dem Projektstart</h2>{SERVICE_QUESTIONS[s.slug]?.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
    <LocalServices currentPath={`/leistungen/${s.slug}/`} />
    <div className="mt-12 flex flex-wrap items-center gap-6"><Link data-track-id="additional-service-page-link-7" className="button button-dark" href={`/kontakt/?leistung=${s.slug}`}>Projekt anfragen ↗</Link><Link data-track-id="additional-service-page-link-8" className="text-link" href="/#leistungen">Alle Leistungen</Link></div>
    <JsonLd data={{'@context':'https://schema.org','@type':'Service','@id':`${url}#service`,url,name:s.title,description:s.description,provider:{'@id':ORGANIZATION_ID},areaServed:{'@type':'Country',name:'Germany'}}}/>
  </HdUnterseite>
}
