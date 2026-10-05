'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import type { StudioCopy } from '@/lib/studio-copy'
import { localizedPath } from '@/lib/locale'

/** One scroll listener, no perpetual animation loop or scroll interception.
 * The server renders the complete hero. Motion only enhances that first paint.
 * An optional generated film can replace the poster motion once an asset exists.
 */
type HeroCopy = Pick<
  StudioCopy,
  | 'eyebrow'
  | 'headline'
  | 'intro'
  | 'project'
  | 'workLink'
  | 'scroll'
  | 'motionOff'
  | 'motionOn'
  | 'heroAlt'
>
export function CinematicHero({
  lang,
  copy: t,
  videoSrc,
}: {
  lang: HdLang
  copy: HeroCopy
  videoSrc?: string
}) {
  const stage = useRef<HTMLElement>(null)
  const artwork = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const progressBar = useRef<HTMLSpanElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [enabled, setEnabled] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    setReady(true)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const section = stage.current
    if (!section || !artwork.current) return
    let frame = 0
    let visible = true
    let targetTime = 0
    const active = enabled && !reduced
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData
    section.dataset.motion = String(active)
    const seek = () => {
      const film = video.current
      if (
        film &&
        !film.seeking &&
        film.readyState >= 2 &&
        Math.abs(film.currentTime - targetTime) > 0.035
      )
        film.currentTime = targetTime
    }
    const update = () => {
      frame = 0
      if (!visible || document.hidden || !artwork.current) return
      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, section.offsetHeight - window.innerHeight + 86)
      const progress = Math.min(1, Math.max(0, -rect.top / travel))
      artwork.current.style.transform = active
        ? `translate3d(${-progress * 2.4}%, ${progress * 1.5}%, 0) scale(${1 + progress * 0.13})`
        : ''
      if (copy.current)
        copy.current.style.transform = active ? `translate3d(0, ${-progress * 34}px, 0)` : ''
      if (progressBar.current)
        progressBar.current.style.transform = `scaleX(${active ? progress : 0})`
      if (active && !saveData && videoSrc && progress > 0.015) setLoadVideo(true)
      if (video.current && Number.isFinite(video.current.duration)) {
        targetTime = progress * Math.max(0, video.current.duration - 0.04)
        seek()
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
    })
    observer.observe(section)
    const film = video.current
    film?.addEventListener('loadeddata', schedule)
    film?.addEventListener('seeked', seek)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('visibilitychange', schedule)
    schedule()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('visibilitychange', schedule)
      film?.removeEventListener('loadeddata', schedule)
      film?.removeEventListener('seeked', seek)
    }
  }, [enabled, reduced, videoSrc, loadVideo])

  return (
    <section className="cinematic-stage" ref={stage} aria-labelledby="hero-title">
      <div className="cinematic-frame">
        <div ref={artwork} className="hero-artwork">
          {/* Optimised local sources avoid a runtime image transformation on LCP. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source
              media="(max-width: 600px)"
              type="image/avif"
              srcSet="/studio/h-monolith-mobile-v2.avif"
            />
            <source
              type="image/avif"
              srcSet="/studio/h-monolith-v2-768.avif 768w, /studio/h-monolith-v2-1280.avif 1280w, /studio/h-monolith-v2-1920.avif 1920w"
              sizes="100vw"
            />
            <img
              className="hero-poster"
              src="/studio/h-monolith-v1-1920.webp"
              srcSet="/studio/h-monolith-v1-768.webp 768w, /studio/h-monolith-v1-1280.webp 1280w, /studio/h-monolith-v1-1920.webp 1920w"
              sizes="(max-width: 600px) 1400px, 100vw"
              width="1920"
              height="1072"
              fetchPriority="high"
              alt={t.heroAlt}
            />
          </picture>
          {videoSrc && loadVideo && (
            <video
              ref={video}
              className="hero-film"
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
            />
          )}
        </div>
        <div className="hero-shade" />
        <div className="hero-topline">
          <span className="eyebrow">
            <i aria-hidden="true" />
            {t.eyebrow}
          </span>
          <span className="hero-index" aria-hidden="true">
            HD — 01
          </span>
        </div>
        <div ref={copy} className="hero-copy">
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
            <a className="hero-work-link" href="#arbeiten">
              {t.workLink}
              <ArrowDown size={16} aria-hidden />
            </a>
          </div>
        </div>
        <div className="hero-bottomline">
          <a href="#anspruch" className="scroll-cue">
            <ArrowDown size={15} aria-hidden />
            <span>{t.scroll}</span>
          </a>
          <span className="hero-material" aria-hidden="true">
            IDEA → FORM → IMPACT
          </span>
          {ready && !reduced && (
            <button
              className="motion-toggle"
              type="button"
              aria-label={enabled ? t.motionOff : t.motionOn}
              onClick={() => setEnabled(!enabled)}
            >
              {enabled ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
            </button>
          )}
        </div>
        <div className="hero-progress" aria-hidden="true">
          <span ref={progressBar} />
        </div>
      </div>
    </section>
  )
}
