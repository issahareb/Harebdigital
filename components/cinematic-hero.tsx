'use client'

import { useEffect, useState } from 'react'
import { preload } from 'react-dom'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { PlaybackIcon } from './control-icons'
import type { HdLang } from '@/lib/hd-texte'
import type { StudioCopy } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'
import { ScrollFilm } from './scroll-film'

type HeroCopy = Pick<
  StudioCopy,
  | 'headline'
  | 'kicker'
  | 'intro'
  | 'project'
  | 'scroll'
  | 'motionOff'
  | 'motionOn'
  | 'heroAlt'
  | 'heroChapters'
>

const HERO_AVIF_SRCSET = '/studio/impulse/hero-768.avif 768w, /studio/impulse/hero-1280.avif 1280w, /studio/impulse/hero-1920.avif 1920w'

/** The page stays native-scrollable; an actual camera journey drives the frames. */
export function CinematicHero({ lang, copy: t }: { lang: HdLang; copy: HeroCopy }) {
  // React does not automatically preload images inside <picture>. Start the
  // exact responsive AVIF candidate in the head, without also fetching WebP.
  preload('/studio/impulse/hero-1280.avif', {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: HERO_AVIF_SRCSET,
    imageSizes: '100vw',
    fetchPriority: 'high',
  })
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
  return (
    <section
      className="cinematic-stage"
      data-motion={String(active)}
      data-chapter="0"
      aria-labelledby="hero-title"
    >
      <div className="cinematic-frame">
        <div className="hero-copy">
          <p className="hero-kicker">{t.kicker}</p>
          <h1 id="hero-title">
            {t.headline[0]} <br />
            <span>{t.headline[1]}</span>
          </h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <Link
              prefetch={false}
              href={localizedPath(lang, '/kontakt/')}
              className="button button-accent"
            >
              {t.project}
              <ArrowUpRight size={19} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="hero-artwork">
          <picture>
            <source
              type="image/avif"
              srcSet={HERO_AVIF_SRCSET}
              sizes="100vw"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-poster"
              src="/studio/impulse/hero-1280.webp"
              srcSet="/studio/impulse/hero-768.webp 768w, /studio/impulse/hero-1280.webp 1280w, /studio/impulse/hero-1920.webp 1920w"
              sizes="100vw"
              width="1920"
              height="1080"
              fetchPriority="high"
              alt={t.heroAlt}
            />
          </picture>
          <ScrollFilm enabled={active} />
        </div>
        <div className="journey-caption" aria-hidden="true">
          {t.heroChapters.map((chapter, i) => (
            <span key={chapter.label} data-scene={i + 1}>
              <small>{chapter.label}</small>
              {chapter.title}
              <span className="journey-description">{chapter.description}</span>
            </span>
          ))}
        </div>
        <div className="hero-bottomline">
          <a href="#anspruch" className="scroll-cue">
            <ArrowDown size={15} aria-hidden />
            <span>{t.scroll}</span>
          </a>
          {allowed && (
            <button
              className="motion-toggle"
              type="button"
              aria-label={active ? t.motionOff : t.motionOn}
              onClick={() => setEnabled(!enabled)}
            >
              <PlaybackIcon playing={active} size={14} />
            </button>
          )}
        </div>
        <div className="journey-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
