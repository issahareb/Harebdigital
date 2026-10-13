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
    <nav className="breadcrumbs" aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><Link href="/#leistungen">Leistungen</Link><span>/</span><span aria-current="page">{s.title}</span></nav>
    <span className="eyebrow">HAREB DIGITAL · LEISTUNGEN</span>
    <h1 className="mt-5">{s.title}</h1>
    <p className="service-detail-lead">{s.lead}</p>
    <div className="service-detail-grid">
      <section><h2>Was wir umsetzen können</h2><ul>{s.items.map(item=><li key={item}>{item}</li>)}</ul></section>
      <div><section><h2>So läuft die Zusammenarbeit</h2><p>{s.process}</p></section><section><h2>{s.proofTitle}</h2><p>{s.proof}</p><Link className="text-link" href={s.proofHref}>{s.proofLabel} ↗</Link></section></div>
    </div>
    <div className="mt-12 flex flex-wrap items-center gap-6"><Link className="button button-dark" href={`/kontakt/?leistung=${s.slug}`}>Projekt anfragen ↗</Link><Link className="text-link" href="/#leistungen">Alle Leistungen</Link></div>
    <JsonLd data={{'@context':'https://schema.org','@type':'Service','@id':`${url}#service`,url,name:s.title,description:s.description,provider:{'@id':ORGANIZATION_ID},areaServed:{'@type':'Country',name:'Germany'}}}/>
  </HdUnterseite>
}
