'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import type { StudioCopy } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { ScrollFilm } from './scroll-film'

type HeroCopy = Pick<StudioCopy, 'eyebrow' | 'headline' | 'intro' | 'project' | 'workLink' | 'scroll' | 'motionOff' | 'motionOn' | 'heroAlt'>

/** The page stays native-scrollable; an actual camera journey drives the frames. */
export function CinematicHero({ lang, copy: t }: { lang: HdLang; copy: HeroCopy }) {
  const [enabled, setEnabled] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const active = enabled && allowed
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const sync = () => setAllowed(!preference.matches && !connection?.saveData)
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])
  const chapters = {
    de: ['Ein Impuls.', 'Alles nimmt Fahrt auf.', 'Aus Verbindung wird Energie.'],
    en: ['One impulse.', 'Everything gains momentum.', 'Connection becomes energy.'],
    es: ['Un impulso.', 'Todo toma impulso.', 'La conexión se vuelve energía.'],
  }[lang]

  return (
    <section className="cinematic-stage" data-motion={String(active)} data-chapter="0" aria-labelledby="hero-title">
      <div className="cinematic-frame">
        <div className="hero-topline">
          <span className="eyebrow"><i aria-hidden="true" />{t.eyebrow}</span>
          <span className="hero-index" aria-hidden="true">INDEPENDENT BY DESIGN</span>
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">{t.headline[0]}{' '}<br /><span>{t.headline[1]}</span></h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <Link prefetch={false} href={localizedPath(lang, '/kontakt/')} className="button button-accent">
              {t.project}<ArrowUpRight size={19} aria-hidden />
            </Link>
            <a className="hero-work-link" href="#arbeiten">{t.workLink}<ArrowDown size={16} aria-hidden /></a>
          </div>
        </div>
        <div className="hero-artwork">
          <picture>
            <source type="image/avif" srcSet="/studio/impulse/hero-768.avif 768w, /studio/impulse/hero-1280.avif 1280w, /studio/impulse/hero-1920.avif 1920w" sizes="100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-poster" src="/studio/impulse/hero-1280.webp" srcSet="/studio/impulse/hero-768.webp 768w, /studio/impulse/hero-1280.webp 1280w, /studio/impulse/hero-1920.webp 1920w" sizes="100vw" width="1920" height="1080" fetchPriority="high" alt={t.heroAlt} />
          </picture>
          <ScrollFilm enabled={active} />
        </div>
        <div className="journey-caption" aria-hidden="true">
          {chapters.map((chapter, i) => <span key={chapter} data-scene={i}><small>0{i + 1} / 03</small>{chapter}</span>)}
        </div>
        <div className="hero-bottomline">
          <a href="#anspruch" className="scroll-cue"><ArrowDown size={15} aria-hidden /><span>{t.scroll}</span></a>
          <span className="hero-material" aria-hidden="true">STRATEGY ↗ DESIGN ↗ DEVELOPMENT</span>
          {allowed && <button className="motion-toggle" type="button" aria-label={active ? t.motionOff : t.motionOn} onClick={() => setEnabled(!enabled)}>
            {active ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
          </button>}
        </div>
        <div className="journey-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  )
}
