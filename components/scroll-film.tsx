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
    if (!surface || !stage || !frame || !enabled) return
    const context = surface.getContext('2d', { alpha: false })
    if (!context) return
    const mobile = matchMedia('(max-width: 700px)').matches
    const count = mobile ? 96 : 120
    surface.width = mobile ? 448 : 960
    surface.height = mobile ? 796 : 540
    const images: (HTMLImageElement | undefined)[] = Array(count)
    const requested = new Set<number>()
    let alive = true
    let visible = false
    let busy = 0
    let target = 0
    let painted = -1
    let raf = 0
    const folder = mobile ? 'mobile' : 'desktop'
    const draw = () => {
      let nearest = target
      if (!images[nearest]) {
        let distance = count
        images.forEach((image, i) => {
          if (image && Math.abs(i - target) < distance) { nearest = i; distance = Math.abs(i - target) }
        })
      }
      if (images[nearest] && painted !== nearest) {
        context.drawImage(images[nearest]!, 0, 0, surface.width, surface.height)
        painted = nearest
        surface.dataset.ready = 'true'
        surface.dataset.frame = String(nearest)
      }
    }
    const pump = () => {
      if (!alive || !visible || document.hidden) return
      // Keep only the nearby camera positions decoded, especially on phones.
      // Previously visited WebPs remain available through the browser HTTP cache.
      const priority = [target, ...Array.from({ length: 12 }, (_, i) => [target + i + 1, target - i - 1]).flat()]
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
        image.onload = () => {
          busy--
          if (!alive) return
          if (Math.abs(i - target) <= 12) images[i] = image
          else requested.delete(i)
          draw()
          pump()
        }
        image.onerror = () => { busy--; if (alive) pump() }
        image.src = `/studio/impulse/sequence/${folder}/${String(i + 1).padStart(3, '0')}.webp`
      }
    }
    const update = () => {
      raf = 0
      if (!alive || !visible || document.hidden) return
      const top = parseFloat(getComputedStyle(frame).top) || 0
      const travel = Math.max(1, stage.offsetHeight - frame.offsetHeight)
      const progress = Math.max(0, Math.min(1, (top - stage.getBoundingClientRect().top) / travel))
      target = Math.round(progress * (count - 1))
      stage.style.setProperty('--journey', String(progress))
      stage.dataset.chapter = String(Math.min(2, Math.floor(progress * 3)))
      draw()
      pump()
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
    })
    observer.observe(stage)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('visibilitychange', schedule)
      images.length = 0
      delete surface.dataset.ready
      stage.style.removeProperty('--journey')
      stage.dataset.chapter = '0'
    }
  }, [enabled])
  return <canvas ref={canvas} className="hero-sequence" aria-hidden="true" />
}
