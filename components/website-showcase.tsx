'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { PlaybackIcon } from './control-icons'
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
  const [edges, setEdges] = useState({ start: true, end: false })
  const [pinned, setPinned] = useState(false)
  const [paused, setPaused] = useState(false)
  const [visibleClips, setVisibleClips] = useState<Set<number>>(() => new Set())
  const [manualPlayback, setManualPlayback] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [decoded, setDecoded] = useState<Record<string, boolean>>({})
  const [failed, setFailed] = useState<Record<string, boolean>>({})

  useLayoutEffect(() => {
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
      const rect = root.getBoundingClientRect()
      const enter = clamp((innerHeight * 0.8 - rect.top) / (innerHeight * 0.65))
      const leave = clamp((rect.bottom - 120) / (innerHeight * 0.65))
      root.style.setProperty('--showcase-focus', String(preference.matches ? 0 : Math.min(enter, leave)))
      if (!enabled) return
      const top = parseFloat(getComputedStyle(frame).top) || 0
      const amount = clamp((top - rect.top) / Math.max(1, distance.current))
      strip.style.transform = `translate3d(${-amount * distance.current}px, 0, 0)`
      progress.current?.style.setProperty('--showcase-progress', String(amount))
      setEdges(previous => {
        const start = amount <= 0.001, end = amount >= 0.999
        return previous.start === start && previous.end === end ? previous : { start, end }
      })
      Array.from(strip.children).forEach((card, index) => {
        (card as HTMLElement).style.setProperty('--clip-focus', String(clamp(1 - Math.abs(amount * (WEBSITE_CLIPS.length - 1) - index))))
      })
      const slidePosition = amount * (WEBSITE_CLIPS.length - 1)
      const index = Math.round(slidePosition)
      // Small finger movements around a midpoint must not repeatedly restart playback.
      if (index !== position.current && Math.abs(slidePosition - position.current) > 0.58) {
        position.current = index; setActive(index)
      }
    }
    const schedule = () => { if (!request) request = requestAnimationFrame(draw) }
    const measure = () => {
      // On very short screens and with reduced motion, keep a native swipe carousel.
      enabled = !preference.matches && innerHeight >= 540
      distance.current = Math.max(0, (strip.lastElementChild as HTMLElement)?.offsetLeft || 0)
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
        setEdges({ start: windowEl.scrollLeft <= 1, end: windowEl.scrollLeft >= distance.current - 1 })
      } else windowEl.scrollLeft = 0
      draw()
    }
    const resize = new ResizeObserver(measure)
    resize.observe(windowEl)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    preference.addEventListener('change', measure)
    measure()
    return () => {
      cancelAnimationFrame(request)
      resize.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      preference.removeEventListener('change', measure)
    }
  }, [])

  useEffect(() => {
    // Observe each actual video: the heading/sticky stage can be visible while
    // its media is still below the fold or clipped outside the horizontal rail.
    const observer = new IntersectionObserver(entries => {
      setVisibleClips(previous => {
        const next = new Set(previous)
        for (const entry of entries) {
          const index = videos.current.indexOf(entry.target as HTMLVideoElement)
          if (entry.isIntersecting && entry.intersectionRect.width > 0 && entry.intersectionRect.height > 0) next.add(index)
          else next.delete(index)
        }
        return next
      })
    }, { threshold: [0, 0.001], rootMargin: '0px' })
    videos.current.forEach(video => { if (video) observer.observe(video) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let disposed = false
    const sync = () => {
      videos.current.forEach((video, index) => {
        if (!video) return
        if (visibleClips.has(index) && !paused && !manualPlayback && !document.hidden) {
          // No neighbour prefetch: attach the source only once this clip is on screen.
          if (!video.getAttribute('src')) {
            video.preload = 'auto'
            video.src = WEBSITE_CLIPS[index].src
          }
          video.muted = true
          video.play().then(() => { if (!disposed && index === active) setBlocked(false) }).catch(error => {
            if (!disposed && index === active && error.name !== 'AbortError') setBlocked(true)
          })
        } else video.pause()
      })
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => { disposed = true; document.removeEventListener('visibilitychange', sync) }
  }, [active, visibleClips, paused, manualPlayback])

  useEffect(() => () => { videos.current.forEach(video => video?.pause()) }, [])

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
    if (!video || !visibleClips.has(active)) return
    if (paused || manualPlayback || blocked) {
      if (!video.getAttribute('src')) { video.src = WEBSITE_CLIPS[active].src }
      video.muted = true
      setPaused(false); setManualPlayback(false)
      video.play().then(() => setBlocked(false)).catch(() => setBlocked(true))
    } else setPaused(true)
  }

  return (
    <section data-track-section="website-showcase-section-1" ref={section} id="werkschau" className="website-showcase" aria-labelledby="showcase-title" data-pinned="true">
      <div className="showcase-surround" aria-hidden />
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
            setEdges({ start: viewport.current.scrollLeft <= 1, end: viewport.current.scrollLeft >= distance.current - 1 })
            progress.current?.style.setProperty('--showcase-progress', String(index / (WEBSITE_CLIPS.length - 1)))
          }}>
          <div ref={rail} className="showcase-rail">
            {WEBSITE_CLIPS.map((clip, index) => (
              <article key={clip.id} className="showcase-card" data-active={index === active} aria-label={`${index + 1} / ${WEBSITE_CLIPS.length}: ${clip.title}`}>
                <div className="showcase-media" style={{ backgroundColor: clip.color }}>
                  {/* A separate poster remains until the first frame has actually been presented. */}
                  <Image className="showcase-poster" src={clip.poster} alt={clip.alt[lang]} aria-hidden={decoded[clip.id] || undefined} fill sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 800px) calc(100vw - 48px), min(1120px, calc(100vw - 112px), calc((100svh - 420px) * 1.6))" />
                  <video data-decoded={!!decoded[clip.id]} ref={element => { videos.current[index] = element }} muted loop playsInline preload="none" aria-label={`${clip.title}: ${clip.alt[lang]}`}
                    onPlaying={event => {
                      const video = event.currentTarget
                      const reveal = () => setDecoded(previous => previous[clip.id] ? previous : { ...previous, [clip.id]: true })
                      if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(reveal)
                      else reveal()
                    }}
                    onError={() => setFailed(previous => ({ ...previous, [clip.id]: true }))}>
                    {/* Verified: four files have no audio stream; Spectrum's
                        audio stream contains only digital silence. */}
                    <track kind="captions" src={`/captions/silent-webdesign.${lang}.vtt`} srcLang={lang} label={lang === 'de' ? 'Deutsch' : lang === 'en' ? 'English' : 'Español'} />
                  </video>
                  {failed[clip.id] && <span className="showcase-video-fallback">{copy.unavailable}</span>}
                </div>
                <div className="showcase-caption">
                  <div><span className="showcase-number">0{index + 1}</span><span className="showcase-clip-title">{clip.title}</span></div>
                  <span>{copy.reference}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="showcase-controls wrap">
          <div className="showcase-status"><span>{String(active + 1).padStart(2, '0')} / {String(WEBSITE_CLIPS.length).padStart(2, '0')}</span><span ref={progress} className="showcase-progress" aria-hidden><i /></span></div>
          <div className="showcase-buttons">
            <button data-track-id="website-showcase-button-2" type="button" onClick={() => moveTo(active - 1)} disabled={edges.start} aria-label={copy.previous}><ArrowLeft size={18} aria-hidden /></button>
            <button data-track-id="website-showcase-button-3" type="button" onClick={togglePlayback} aria-label={paused || manualPlayback || blocked ? copy.play : copy.pause}><PlaybackIcon playing={!(paused || manualPlayback || blocked)} size={16} /></button>
            <button data-track-id="website-showcase-button-4" type="button" onClick={() => moveTo(active + 1)} disabled={edges.end} aria-label={copy.next}><ArrowRight size={18} aria-hidden /></button>
          </div>
          <a data-track-id="website-showcase-a-5" className="showcase-continue" href="#leistungen">{copy.continue}<ArrowDown size={15} aria-hidden /></a>
        </div>
        <noscript>
          <style>{`.website-showcase{height:auto!important}.showcase-stage{position:static!important;height:auto!important}.showcase-viewport{overflow-x:auto!important;scroll-snap-type:x mandatory!important}.showcase-surround{display:none}`}</style>
          <p className="showcase-no-js wrap">{copy.noJs}</p>
        </noscript>
      </div>
    </section>
  )
}
