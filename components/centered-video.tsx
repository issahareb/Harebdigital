'use client'
import { useEffect, useRef, type VideoHTMLAttributes } from 'react'

/** Muted autoplay only while the video intersects the middle half of the viewport. */
export function CenteredVideo({ src, children, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const video = useRef<HTMLVideoElement>(null)
  const centered = useRef(false)
  const userPaused = useRef(false)
  useEffect(() => {
    const el = video.current
    if (!el) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const sync = () => {
      if (centered.current && !document.hidden && !userPaused.current && !preference.matches && !saveData) void el.play().catch(() => {})
      else el.pause()
    }
    const observer = new IntersectionObserver(([entry]) => { centered.current = entry.isIntersecting; sync() }, { rootMargin: `-${Math.round(innerHeight * .25)}px 0px -${Math.round(innerHeight * .25)}px 0px`, threshold: .01 })
    observer.observe(el)
    const visibility = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) el.pause() })
    visibility.observe(el)
    document.addEventListener('visibilitychange', sync)
    preference.addEventListener('change', sync)
    return () => { centered.current = false; observer.disconnect(); visibility.disconnect(); el.pause(); document.removeEventListener('visibilitychange', sync); preference.removeEventListener('change', sync) }
  }, [src])
  return <video {...props} ref={video} src={src} muted loop playsInline controls preload="none" onPause={() => { if (centered.current && !document.hidden) userPaused.current = true }} onPlay={() => { userPaused.current = false }}>{children}</video>
}
