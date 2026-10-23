import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HdUnterseite } from '@/components/hd-unterseite'
import { JsonLd, ORGANIZATION_ID } from '@/components/studio-schema'
import { TaxiPerformanceCase } from '@/components/taxi-performance-case'
const url='https://hareb.digital/projekte/taxi-bb-essen/'
export const metadata: Metadata={title:'Taxi B&B Essen: Website und Buchungsanfragen | Hareb Digital',description:'Ein veröffentlichtes Kundenprojekt: mobiles Webdesign, Online-Fahrtanfragen, geschützte Verwaltung und automatische Benachrichtigungen für Taxi B&B Essen.',alternates:{canonical:url,languages:{'de-DE':url}},openGraph:{url,title:'Taxi B&B Essen · Kundenprojekt',description:'Website und Buchungsanfragen mit Hareb Digital.'}}
export default function Page(){return <HdUnterseite lang="de" motiv>
  <nav className="breadcrumbs" aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span aria-current="page">Taxi B&B Essen</span></nav>
  <span className="eyebrow">KUNDENPROJEKT · MOBILITÄT</span>
  <h1 className="mt-5">Taxi B&B Essen</h1>
  <p className="service-detail-lead">Eine Website, auf der Fahrgäste passende Leistungen finden und ihre Fahrt online anfragen können. Gestaltung, Entwicklung und Bearbeitungsablauf greifen ineinander.</p>
  <figure className="service-detail-art"><Image src="/studio/evidence/taxi-desktop-20261016-v9.webp" alt="Website von Taxi B&B Essen" width={1440} height={940} sizes="(max-width: 700px) 92vw, 1100px"/><figcaption>Veröffentlichte Website · Aufnahme vom 16. Oktober 2026</figcaption></figure>
  <div className="service-detail-grid"><section><h2>Die Aufgabe</h2><p>Taxiangebote verständlich darstellen und den Weg von der passenden Leistung zur Kontaktaufnahme verkürzen. Das Unternehmen braucht dafür einen übersichtlichen Zugang zu eingehenden Fahrtanfragen.</p><h2 className="mt-8">Die Umsetzung</h2><ul><li>Responsive Website mit eigenen Seiten für relevante Taxi-Leistungen</li><li>Online-Fahrtanfragen mit Abholort, Ziel und Kontaktangaben</li><li>Geschützter Verwaltungsbereich für die Bearbeitung</li><li>Automatische E-Mail-Benachrichtigung bei neuen Anfragen</li><li>Lokale Inhalte und strukturierte Unternehmensdaten</li></ul></section>
  <div><section><h2>Was als Erfolg zählt</h2><p>Eine abgeschickte Anfrage ist noch keine bestätigte oder durchgeführte Fahrt. Aussagekräftig sind bearbeitete Anfragen, tatsächlich durchgeführte Fahrten, Reaktionszeiten und erfasster Umsatz. Telefon- und WhatsApp-Klicks werden getrennt betrachtet.</p></section><section><h2>Ergebnisse transparent belegen</h2><p>Hier werden derzeit keine Buchungssteigerung, Umsatzsteigerung oder KI-Platzierung behauptet. Vergleichbare Kennzahlen mit Zeitraum und Messgrundlage können nach einer ausreichenden Beobachtungsphase und Freigabe durch den Kunden ergänzt werden.</p></section></div></div>
  <TaxiPerformanceCase />
  <div className="mt-12 flex flex-wrap items-center gap-6"><a className="button button-dark" href="https://www.taxibbessen.de/">Website besuchen ↗</a><Link className="text-link" href="/kontakt/?leistung=webanwendungen">Ähnliches Projekt besprechen ↗</Link><Link className="text-link" href="/leistungen/neue-website/">Website erstellen lassen in Essen ↗</Link></div>
  <JsonLd data={{'@context':'https://schema.org','@type':'CreativeWork','@id':`${url}#project`,url,name:'Taxi B&B Essen: Website und Buchungsanfragen',creator:{'@id':ORGANIZATION_ID},inLanguage:'de',description:'Veröffentlichtes Kundenprojekt mit Online-Fahrtanfragen, Verwaltung und automatischen Benachrichtigungen.'}}/>
</HdUnterseite>}
