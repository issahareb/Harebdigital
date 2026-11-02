'use client'

import { useEffect, useRef } from 'react'
import { createHeroScene } from '@/lib/hero-scene'

/** A native-resolution, rigid 3D scene. Scroll moves only its camera. */
export function ScrollFilm({ enabled, onUnavailable }: { enabled: boolean; onUnavailable?: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const surface = canvas.current
    const stage = surface?.closest<HTMLElement>('.cinematic-stage')
    const frame = stage?.querySelector<HTMLElement>('.cinematic-frame')
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!surface || !stage || !frame || !enabled) return
    const captions = Array.from(stage.querySelectorAll<HTMLElement>('.journey-caption > span'))
    const scene = createHeroScene(surface)
    if (!scene) { onUnavailable?.(); return }
    let alive = true
    let visible = false
    let target = 0
    let position = 0
    let raf = 0
    let lastTime = 0
    let elapsed = 0
    let previousProgress = -1
    const clamp = (value: number) => Math.max(0, Math.min(1, value))
    const ease = (value: number) => value * value * (3 - 2 * value)
    if (header) header.dataset.heroMotion = 'true'
    surface.dataset.renderer = 'rigid-webgl'
    const update = () => {
      if (!alive || document.hidden) return
      // The viewport stays the same size. Opening the crop avoids relayout and
      // keeps the camera progress independent of the fullscreen transition.
      const scroll = Math.max(0, -stage.getBoundingClientRect().top)
      const travel = Math.max(1, stage.offsetHeight - frame.offsetHeight)
      const progress = clamp(scroll / travel)
      const expansion = ease(clamp(scroll / (frame.offsetHeight * 0.45)))
      const handoff = ease(clamp((progress - 0.78) / 0.22))
      const exit = ease(clamp((progress - 0.84) / 0.16))
      target = progress
      if (previousProgress === progress) return
      previousProgress = progress
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
    }
    const tick = (time: number) => {
      raf = 0
      if (!alive || !visible || document.hidden) { lastTime = 0; return }
      const delta = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 1 / 60
      lastTime = time
      elapsed += delta
      update()
      // Frame-rate independent camera damping; no crossfades or rounded frames.
      position += (target - position) * (1 - Math.exp(-delta / 0.075))
      if (Math.abs(target - position) < 0.00001) position = target
      scene.render(position, elapsed)
      surface.dataset.ready = 'true'
      surface.dataset.position = position.toFixed(6)
      raf = requestAnimationFrame(tick)
    }
    const schedule = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick)
    }
    const syncVisibility = () => {
      stage.dataset.filmVisible = String(visible && !document.hidden)
      if (!visible || document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
        lastTime = 0
      } else schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncVisibility()
    })
    observer.observe(stage)
    const contextLost = (event: Event) => {
      event.preventDefault()
      // Restore a readable static hero if the browser evicts the GPU context.
      onUnavailable?.()
    }
    surface.addEventListener('webglcontextlost', contextLost)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      surface.removeEventListener('webglcontextlost', contextLost)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('visibilitychange', syncVisibility)
      captions.forEach(caption => {
        caption.style.removeProperty('--caption-opacity')
        caption.style.removeProperty('--caption-enter')
        caption.style.removeProperty('--caption-exit')
      })
      scene.dispose()
      delete surface.dataset.renderer
      delete surface.dataset.ready
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
  }, [enabled, onUnavailable])
  return <canvas ref={canvas} className="hero-sequence" aria-hidden="true" />
}
