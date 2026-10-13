import Image from 'next/image'
import type { HdLang } from '@/lib/hd-texte'
import { VISUAL_COPY } from '@/lib/service-visuals'
import { ScrollAccent } from './scroll-accent'

const SERVICE_IMAGES = [
  { src: '/studio/services-20261010/web-development-1200.webp', width: 1200, height: 900 },
  { src: '/videos/schau-1.jpg', width: 720, height: 450 },
  { src: '/studio/services-20261010/automation-1200.webp', width: 1200, height: 900 },
  { src: '/studio/services-20261010/search-answers-1200.webp', width: 1200, height: 900 },
] as const

/** Each service gets its own motif; client screenshots appear only in the work section. */
export function ServiceVisual({
  index,
  lang,
  decorative = false,
}: {
  index: number
  lang: HdLang
  decorative?: boolean
}) {
  const t = VISUAL_COPY[lang]
  const source = SERVICE_IMAGES[index]
  return (
    <div
      className={`service-visual service-visual--${index}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : t.descriptions[index]}
      aria-hidden={decorative || undefined}
    >
      <div className="service-visual-inner" aria-hidden={decorative ? undefined : true}>
        <div className="visual-kicker">
          <span>0{index + 1}</span>
          <span>{t.labels[index]}</span>
        </div>
        <div className={`service-art-media${index === 1 ? ' service-art-media--archive' : ''}`}>
          <Image
            {...source}
            alt=""
            sizes="(max-width: 600px) 90vw, (max-width: 1000px) 85vw, 650px"
          />
        </div>
        <div className="visual-caption">{t.captions[index]}</div>
      </div>
    </div>
  )
}

export function StudioEvidence({ lang }: { lang: HdLang }) {
  const t = VISUAL_COPY[lang]
  return (
    <p className="studio-statement">
      <ScrollAccent text={t.demoText} expressive />
    </p>
  )
}
