'use client'

import { useEffect, useRef } from 'react'

/** A camera move sampled into small local WebP frames. No currentTime seeking:
 * iOS can draw either direction immediately, with a bounded decode budget.
 */
export function ScrollFilm({ enabled }: { enabled: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const surface = canvas.current
    const stage = surface?.closest<HTMLElement>('.cinematic-stage')
    const frame = stage?.querySelector<HTMLElement>('.cinematic-frame')
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!surface || !stage || !frame || !enabled) return
    const context = surface.getContext('2d', { alpha: false })
    if (!context) return
    const captions = Array.from(stage.querySelectorAll<HTMLElement>('.journey-caption > span'))
    const mobile = matchMedia('(max-width: 700px)').matches
    const count = mobile ? 150 : 180
    surface.width = mobile ? 448 : 960
    surface.height = mobile ? 796 : 540
    const images: (HTMLImageElement | undefined)[] = Array(count)
    const requested = new Set<number>()
    let alive = true
    let visible = false
    let busy = 0
    let target = 0
    let position = 0
    let painted = -1
    let paintedPosition = -1
    let raf = 0
    const clamp = (value: number) => Math.max(0, Math.min(1, value))
    const ease = (value: number) => value * value * (3 - 2 * value)
    if (header) header.dataset.heroMotion = 'true'
    const folder = mobile ? 'mobile' : 'desktop'
    const draw = () => {
      if (!alive || !visible || document.hidden) return
      const next = Math.min(count - 1, target + 1)
      if (images[target] && images[next]) {
        if (paintedPosition === position) return
        // Keep the fractional scroll position: rounding held each camera image
        // for 16–22 scroll pixels, particularly noticeable on slow touch drags.
        context.globalAlpha = 1
        context.drawImage(images[target]!, 0, 0, surface.width, surface.height)
        const blend = position - target
        if (blend > 0 && next !== target) {
          context.globalAlpha = blend
          context.drawImage(images[next]!, 0, 0, surface.width, surface.height)
          context.globalAlpha = 1
        }
        painted = target
        paintedPosition = position
        surface.dataset.ready = 'true'
        surface.dataset.frame = String(target)
        surface.dataset.position = String(position)
        return
      }
      let nearest = target
      if (!images[nearest]) {
        let distance = count
        images.forEach((image, i) => {
          // Late image loads may advance towards the target, never overshoot
          // it or move back against the user's current scroll direction.
          const withinPath = painted < 0 ? i <= target
            : target >= painted ? i >= painted && i <= target : i <= painted && i >= target
          if (image && withinPath && Math.abs(i - target) < distance) {
            nearest = i
            distance = Math.abs(i - target)
          }
        })
      }
      if (images[nearest] && painted !== nearest) {
        context.drawImage(images[nearest]!, 0, 0, surface.width, surface.height)
        painted = nearest
        paintedPosition = nearest
        surface.dataset.ready = 'true'
        surface.dataset.frame = String(nearest)
        surface.dataset.position = String(nearest)
      }
    }
    const pump = () => {
      if (!alive || !visible || document.hidden) return
      // Keep only the nearby camera positions decoded, especially on phones.
      // Previously visited WebPs remain available through the browser HTTP cache.
      const priority = [
        target, target + 1,
        // At rest only prepare the first step. The remaining camera positions
        // become useful once scrolling advances the playhead.
        ...Array.from({ length: target === 0 ? 1 : 12 }, (_, i) => [target + i + 1, target - i - 1]).flat(),
      ]
      images.forEach((image, i) => {
        if (image && Math.abs(i - target) > 12) {
          images[i] = undefined
          requested.delete(i)
        }
      })
      for (const i of priority) {
        if (busy >= 4) break
        if (i < 0 || i >= count || requested.has(i)) continue
        requested.add(i)
        busy++
        const image = new Image()
        image.decoding = 'async'
        image.onload = async () => {
          // Decode before entering the paint callback, rather than making the
          // first draw synchronously decode a WebP on the scrolling thread.
          try { await image.decode() } catch { /* Loaded image remains drawable. */ }
          busy--
          if (!alive) return
          if (Math.abs(i - target) <= 12) images[i] = image
          else requested.delete(i)
          schedule()
          pump()
        }
        image.onerror = () => {
          busy--
          if (alive) pump()
        }
        image.src = `/studio/impulse/lime-20261029/sequence/${folder}/${String(i + 1).padStart(3, '0')}.webp`
      }
    }
    const update = () => {
      raf = 0
      if (!alive || document.hidden) return
      // The viewport stays the same size. Opening the crop avoids relayout and
      // keeps the camera progress independent of the fullscreen transition.
      const scroll = Math.max(0, -stage.getBoundingClientRect().top)
      const travel = Math.max(1, stage.offsetHeight - frame.offsetHeight)
      const progress = clamp(scroll / travel)
      const expansion = ease(clamp(scroll / (frame.offsetHeight * 0.45)))
      const handoff = ease(clamp((progress - 0.78) / 0.22))
      const exit = ease(clamp((progress - 0.84) / 0.16))
      position = progress * (count - 1)
      target = Math.floor(position)
      stage.style.setProperty('--journey', String(progress))
      stage.style.setProperty('--hero-expansion', String(expansion))
      stage.style.setProperty('--hero-handoff', String(handoff))
      stage.dataset.introHidden = String(expansion >= 0.8)
      header?.style.setProperty('--hero-cover', String(expansion * (1 - exit)))
      // Scroll controls every phase, including reverse scroll. A quiet reading
      // plateau separates the entrances and exits; no delayed CSS crossfades.
      captions.forEach((caption, index) => {
        const start = index === 0 ? 0.23 : 0.64
        const entrance = ease(clamp((progress - start) / 0.08))
        const departure = index === 0 ? ease(clamp((progress - 0.52) / 0.08)) : ease(clamp((progress - 0.80) / 0.09))
        caption.style.setProperty('--caption-opacity', String(entrance * (1 - departure)))
        caption.style.setProperty('--caption-enter', String(entrance))
        caption.style.setProperty('--caption-exit', String(departure))
      })
      stage.dataset.chapter = progress >= 0.64 ? '2' : progress >= 0.23 ? '1' : '0'
      if (!visible) return
      draw()
      pump()
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const syncVisibility = () => {
      // The compositor keeps a gentle ambient camera drift alive even when
      // scroll is idle. Pause it when hidden/offscreen, without a JS paint loop.
      stage.dataset.filmVisible = String(visible && !document.hidden)
      schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncVisibility()
    })
    observer.observe(stage)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('visibilitychange', syncVisibility)
      captions.forEach(caption => {
        caption.style.removeProperty('--caption-opacity')
        caption.style.removeProperty('--caption-enter')
        caption.style.removeProperty('--caption-exit')
      })
      images.length = 0
      delete surface.dataset.ready
      delete surface.dataset.frame
      delete surface.dataset.position
      stage.style.removeProperty('--journey')
      stage.style.removeProperty('--hero-expansion')
      stage.style.removeProperty('--hero-handoff')
      delete stage.dataset.introHidden
      delete stage.dataset.filmVisible
      stage.dataset.chapter = '0'
      if (header) {
        header.style.removeProperty('--hero-cover')
        delete header.dataset.heroMotion
      }
    }
  }, [enabled])
  return <canvas ref={canvas} className="hero-sequence" aria-hidden="true" />
}
