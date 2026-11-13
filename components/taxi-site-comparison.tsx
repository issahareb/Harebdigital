'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeftRight, ArrowUpRight } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import s from './taxi-site-comparison.module.css'

const COPY = {
  de: { example: 'Kundenprojekt · Taxi B&B Essen', before: 'Vorher', after: 'Nachher', compare: 'Taxi Beige und TaxiBB vergleichen', instruction: 'Regler ziehen und den Relaunch entdecken.', source: 'Vorher: rekonstruierter Archivstand vom 23.01.2023. Nachher: Aufnahme vom 13.11.2026.', oldTitle: 'Rekonstruierte Startseite von Taxi Beige, Archivstand 23. Januar 2023', newAlt: 'Taxi B&B Essen nach dem Relaunch mit Fahrzeugen, Logo und direktem Anfragebereich', project: 'Projekt ansehen', percent: 'Prozent Nachher' },
  en: { example: 'Client project · Taxi B&B Essen', before: 'Before', after: 'After', compare: 'Compare Taxi Beige and TaxiBB', instruction: 'Drag the slider to explore the redesign.', source: 'Before: reconstructed archive dated 23 January 2023. After: captured 13 November 2026.', oldTitle: 'Reconstructed Taxi Beige homepage, archived 23 January 2023', newAlt: 'Taxi B&B Essen after the redesign with vehicles, logo and a direct enquiry section', project: 'View project', percent: 'per cent after' },
  es: { example: 'Proyecto real · Taxi B&B Essen', before: 'Antes', after: 'Después', compare: 'Comparar Taxi Beige y TaxiBB', instruction: 'Arrastra el control para descubrir el rediseño.', source: 'Antes: reconstrucción del archivo del 23 de enero de 2023. Después: captura del 13 de noviembre de 2026.', oldTitle: 'Inicio reconstruido de Taxi Beige, archivo del 23 de enero de 2023', newAlt: 'Taxi B&B Essen tras el rediseño con vehículos, logotipo y formulario de solicitud directo', project: 'Ver proyecto', percent: 'por ciento después' },
} satisfies Record<HdLang, object>

export function TaxiSiteComparison({ lang }: { lang: HdLang }) {
  const t = COPY[lang]
  const root = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [ready, setReady] = useState(false)
  const [reveal, setReveal] = useState(50)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const size = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    size.observe(element)
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true)
        visibility.disconnect()
      }
    }, { rootMargin: '250px' })
    visibility.observe(element)
    return () => { size.disconnect(); visibility.disconnect() }
  }, [])

  return <div className={s.root}>
    <span className={s.example}>{t.example}</span>
    <div ref={root} className={s.compare} data-taxi-comparison>
      <div className={s.archived} aria-hidden="true">
        {ready && width > 0 && <iframe
          className={s.archiveFrame}
          src="/projekte/taxi-vergleich/beige-20230123/index.html"
          title={t.oldTitle}
          width="1363" height="936" tabIndex={-1} sandbox="allow-same-origin" loading="lazy"
          referrerPolicy="no-referrer"
          style={{ transform: `scale(${width / 1363})` }}
        />}
      </div>
      <div className={s.current} style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
        <Image src="/projekte/taxi-vergleich/taxibb-20261113.webp" alt={t.newAlt} fill sizes="(max-width: 700px) 100vw, 620px" className={s.currentImage} />
      </div>
      <div className={s.labels} aria-hidden="true"><span>{t.after}</span><span>{t.before}</span></div>
      <div className={s.divider} style={{ left: `${reveal}%` }} aria-hidden="true"><span><ArrowLeftRight size={18} /></span></div>
      <input className={s.control} type="range" min="0" max="100" value={reveal} onChange={event => setReveal(Number(event.target.value))} aria-label={t.compare} aria-valuetext={`${reveal} ${t.percent}`} />
    </div>
    <p className={s.instruction}>{t.instruction}</p>
    <p className={s.source}>{t.source}</p>
    <a className={s.project} href="/projekte/taxi-bb-essen/">{t.project}<ArrowUpRight size={15} aria-hidden="true" /></a>
  </div>
}
