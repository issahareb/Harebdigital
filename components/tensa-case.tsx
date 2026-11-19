import { CenteredVideo } from './centered-video'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import styles from './tensa-case.module.css'

export const TENSA_GATE_URL = 'https://tensa.shop/'

const COPY = {
  de: {
    status: 'Kundenprojekt · Gate-Seite online · Shop im Aufbau',
    title: 'TENSA. Der erste Drop beginnt vor dem Shop.',
    text: 'Für die Modemarke TENSA entsteht ein umfangreicher Onlineshop. Ein leuchtender 3D-Ring inszeniert den Zip-Hoodie und macht auf der Gate-Seite neugierig auf den ersten Drop.',
    scope: 'Dahinter im Aufbau: Kundenkonten, Produktvarianten, Warenkorb und Bestellverwaltung. Geplant sind PayPal, Klarna, Apple Pay, Google Pay, Vorkasse und Kauf auf Rechnung.',
    caption: 'Gate-Seite aus der laufenden Entwicklung. Der Shop wird aktuell aufgebaut.',
    video: 'Video der TENSA-Gate-Seite mit interaktivem Licht und Ankündigung des ersten Drops',
    gateLink: 'TENSA-Gate-Seite besuchen',
    link: 'Einblick ins Projekt', tags: ['Onlineshop', 'Launch-Inszenierung', 'Kundenkonten'],
  },
  en: {
    status: 'Client project · Launch page live · Shop in development',
    title: 'TENSA. The first drop starts before the shop.',
    text: 'A comprehensive online shop is taking shape for fashion label TENSA. A glowing 3D ring frames the zip hoodie on the launch page and builds anticipation for the first drop.',
    scope: 'In development: customer accounts, product variants, cart and order management. Planned payments: PayPal, Klarna, Apple Pay, Google Pay, bank transfer and invoice.',
    caption: 'Launch gate from the ongoing development. The shop is currently being built.',
    video: 'Video of the TENSA launch gate with interactive lighting and first drop announcement',
    gateLink: 'Visit the TENSA launch page',
    link: 'Project details (German)', tags: ['Online shop', 'Launch experience', 'Customer accounts'],
  },
  es: {
    status: 'Proyecto de cliente · Prelanzamiento disponible · Tienda en desarrollo',
    title: 'TENSA. El primer drop empieza antes de la tienda.',
    text: 'Estamos creando una tienda online completa para la marca de moda TENSA. Un anillo 3D luminoso enmarca la sudadera con cremallera y anticipa el primer drop.',
    scope: 'En desarrollo: cuentas de cliente, variantes, carrito y gestión de pedidos. Pagos previstos: PayPal, Klarna, Apple Pay, Google Pay, transferencia y factura.',
    caption: 'Página de prelanzamiento en desarrollo. La tienda se está construyendo.',
    video: 'Vídeo de TENSA con iluminación interactiva y anuncio del primer drop',
    gateLink: 'Visitar el prelanzamiento de TENSA',
    link: 'Detalles del proyecto (alemán)', tags: ['Tienda online', 'Prelanzamiento', 'Cuentas de cliente'],
  },
}

export function TensaVideo({ lang = 'de' }: { lang?: HdLang }) {
  const t = COPY[lang]
  return <figure className={styles.preview}>
    <CenteredVideo controls playsInline preload="none" poster="/projekte/tensa/launch-poster.webp" width={884} height={438} aria-label={t.video}>
      <source src="/projekte/tensa/launch-einblick.mp4" type="video/mp4" />
      <a href="/projekte/tensa/launch-einblick.mp4">{t.video}</a>
    </CenteredVideo>
    <figcaption>{t.caption}</figcaption>
  </figure>
}

export function TensaCase({ lang }: { lang: HdLang }) {
  const t = COPY[lang]
  return <article className={`featured-work ${styles.case}`} aria-labelledby={`tensa-title-${lang}`}>
    <TensaVideo lang={lang} />
    <div className="project-story">
      <span className="eyebrow">{t.status}</span>
      <h3 id={`tensa-title-${lang}`}>{t.title}</h3>
      <p>{t.text}</p>
      <ul className="tag-list">{t.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={TENSA_GATE_URL} className="text-link">{t.gateLink}<ArrowUpRight size={17} aria-hidden /></a>
        <Link href="/projekte/tensa/" className="text-link">{t.link}<ArrowUpRight size={17} aria-hidden /></Link>
      </div>
    </div>
  </article>
}
