'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import { SHOWCASE_COPY, WEBSITE_CLIPS } from '@/lib/website-clips'

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Native vertical scrolling moves the rail. No wheel/touch interception or scroll lock. */
export function WebsiteShowcase({ lang }: { lang: HdLang }) {
  const copy = SHOWCASE_COPY[lang]
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const progress = useRef<HTMLSpanElement>(null)
  const position = useRef(0)
  const distance = useRef(0)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [manualPlayback, setManualPlayback] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const root = section.current
    const frame = stage.current
    const strip = rail.current
    const windowEl = viewport.current
    if (!root || !frame || !strip || !windowEl) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    let request = 0
    let enabled = false

    const draw = () => {
      request = 0
      if (!enabled) return
      const top = parseFloat(getComputedStyle(frame).top) || 0
      const amount = clamp((top - root.getBoundingClientRect().top) / Math.max(1, distance.current))
      strip.style.transform = `translate3d(${-amount * distance.current}px, 0, 0)`
      progress.current?.style.setProperty('--showcase-progress', String(amount))
      const index = Math.round(amount * (WEBSITE_CLIPS.length - 1))
      if (index !== position.current) { position.current = index; setActive(index) }
    }
    const schedule = () => { if (!request) request = requestAnimationFrame(draw) }
    const measure = () => {
      // On very short screens and with reduced motion, keep a native swipe carousel.
      enabled = !preference.matches && innerHeight >= 540
      distance.current = Math.max(0, strip.scrollWidth - windowEl.clientWidth)
      root.style.setProperty('--showcase-distance', `${distance.current}px`)
      root.dataset.pinned = String(enabled)
      setPinned(enabled)
      setManualPlayback(preference.matches || !!connection?.saveData)
      if (!enabled) {
        strip.style.transform = ''
        const cardWidth = (strip.children[1] as HTMLElement)?.offsetLeft || 1
        const index = Math.min(WEBSITE_CLIPS.length - 1, Math.round(windowEl.scrollLeft / cardWidth))
        position.current = index; setActive(index)
        progress.current?.style.setProperty('--showcase-progress', String(index / (WEBSITE_CLIPS.length - 1)))
      } else windowEl.scrollLeft = 0
      schedule()
    }
    const resize = new ResizeObserver(measure)
    resize.observe(windowEl)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(frame)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    preference.addEventListener('change', measure)
    measure()
    return () => {
      cancelAnimationFrame(request)
      resize.disconnect(); observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      preference.removeEventListener('change', measure)
    }
  }, [])

  useEffect(() => {
    let disposed = false
    const sync = () => {
      videos.current.forEach((video, index) => {
        if (!video) return
        if (index === active && visible && !paused && !manualPlayback && !document.hidden) {
          const clip = WEBSITE_CLIPS[index]
          if (!video.getAttribute('src')) { video.src = clip.src; video.load() }
          video.muted = true
          video.play().then(() => { if (!disposed) setBlocked(false) }).catch(() => {
            if (!disposed && !video.paused) return
            if (!disposed) setBlocked(true)
          })
        } else video.pause()
      })
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => { disposed = true; document.removeEventListener('visibilitychange', sync); videos.current.forEach(video => video?.pause()) }
  }, [active, visible, paused, manualPlayback])

  const moveTo = (index: number) => {
    const next = Math.max(0, Math.min(WEBSITE_CLIPS.length - 1, index))
    if (pinned && section.current && stage.current) {
      const top = parseFloat(getComputedStyle(stage.current).top) || 0
      window.scrollTo({ top: scrollY + section.current.getBoundingClientRect().top - top + distance.current * next / (WEBSITE_CLIPS.length - 1), behavior: 'smooth' })
    } else {
      const card = rail.current?.children[next] as HTMLElement | undefined
      if (card && viewport.current) viewport.current.scrollTo({ left: card.offsetLeft, behavior: manualPlayback ? 'auto' : 'smooth' })
    }
  }

  const togglePlayback = () => {
    const video = videos.current[active]
    if (!video) return
    if (paused || manualPlayback || blocked) {
      if (!video.getAttribute('src')) { video.src = WEBSITE_CLIPS[active].src; video.load() }
      video.muted = true
      setPaused(false); setManualPlayback(false)
      video.play().then(() => setBlocked(false)).catch(() => setBlocked(true))
    } else setPaused(true)
  }

  return (
    <section ref={section} id="werkschau" className="website-showcase" aria-labelledby="showcase-title" data-pinned="false">
      <div ref={stage} className="showcase-stage">
        <div className="showcase-heading wrap">
          <div><span className="eyebrow">{copy.label}</span><h2 id="showcase-title">{copy.title}</h2></div>
          <p>{copy.intro}</p>
        </div>
        <div ref={viewport} className="showcase-viewport" tabIndex={0} role="group" aria-roledescription={copy.carousel} aria-label={copy.title}
          onKeyDown={event => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveTo(active + (event.key === 'ArrowRight' ? 1 : -1)) }
          }}
          onScroll={() => {
            if (pinned || !viewport.current || !rail.current) return
            const width = (rail.current.children[1] as HTMLElement)?.offsetLeft || 1
            const index = Math.min(WEBSITE_CLIPS.length - 1, Math.round(viewport.current.scrollLeft / width))
            position.current = index; setActive(index)
            progress.current?.style.setProperty('--showcase-progress', String(index / (WEBSITE_CLIPS.length - 1)))
          }}>
          <div ref={rail} className="showcase-rail">
            {WEBSITE_CLIPS.map((clip, index) => (
              <article key={clip.id} className="showcase-card" aria-label={`${index + 1} / ${WEBSITE_CLIPS.length}: ${clip.title}`}>
                <div className="showcase-media" style={{ backgroundColor: clip.color }}>
                  <video ref={element => { videos.current[index] = element }} poster={clip.poster} muted loop playsInline preload="none" aria-label={clip.title}
                    onError={() => setFailed(previous => ({ ...previous, [clip.id]: true }))} />
                  {failed[clip.id] && <span className="showcase-video-fallback">{copy.unavailable}</span>}
                </div>
                <div className="showcase-caption">
                  <div><span className="showcase-number">0{index + 1}</span><h3>{clip.title}</h3></div>
                  {clip.source ? <a href={clip.source} target="_blank" rel="noopener noreferrer" tabIndex={pinned && index !== active ? -1 : 0}>{copy.source}<ArrowUpRight size={14} aria-hidden /></a> : <span>{copy.reference}</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="showcase-controls wrap">
          <div className="showcase-status"><span>{String(active + 1).padStart(2, '0')} / {String(WEBSITE_CLIPS.length).padStart(2, '0')}</span><span ref={progress} className="showcase-progress" aria-hidden><i /></span></div>
          <div className="showcase-buttons">
            <button type="button" onClick={() => moveTo(active - 1)} disabled={active === 0} aria-label={copy.previous}><ArrowLeft size={18} aria-hidden /></button>
            <button type="button" onClick={togglePlayback} aria-label={paused || manualPlayback || blocked ? copy.play : copy.pause}>{paused || manualPlayback || blocked ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}</button>
            <button type="button" onClick={() => moveTo(active + 1)} disabled={active === WEBSITE_CLIPS.length - 1} aria-label={copy.next}><ArrowRight size={18} aria-hidden /></button>
          </div>
          <a className="showcase-continue" href="#leistungen">{copy.continue}<ArrowDown size={15} aria-hidden /></a>
        </div>
        <noscript><p className="showcase-no-js wrap">{copy.noJs}</p></noscript>
      </div>
    </section>
  )
}
