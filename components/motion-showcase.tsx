'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'

const LABELS = {
  de: {
    title: 'Hareb Digital in Bewegung',
    pause: 'Film pausieren',
    play: 'Film abspielen',
    sound: 'Ton einschalten',
    mute: 'Ton ausschalten',
    fallback: 'Film ansehen',
    detail: 'Motion Design · Eigene Markenarbeit',
  },
  en: {
    title: 'Hareb Digital in motion',
    pause: 'Pause film',
    play: 'Play film',
    sound: 'Turn sound on',
    mute: 'Mute sound',
    fallback: 'Watch film',
    detail: 'Motion design · Own brand work',
  },
  es: {
    title: 'Hareb Digital en movimiento',
    pause: 'Pausar vídeo',
    play: 'Reproducir vídeo',
    sound: 'Activar sonido',
    mute: 'Silenciar',
    fallback: 'Ver vídeo',
    detail: 'Motion design · Marca propia',
  },
}
const SOURCE = '/studio/showreel/hareb-digital-final-v5.mp4'

/** Native, local media. Visibility controls playback, never the page scroll. */
export function MotionShowcase({ lang }: { lang: HdLang }) {
  const video = useRef<HTMLVideoElement>(null)
  const visible = useRef(false)
  const manualPause = useRef(false)
  const reduced = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const t = LABELS[lang]

  useEffect(() => {
    const el = video.current
    if (!el) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection
    let disposed = false
    el.muted = true
    const load = () => {
      if (!el.getAttribute('src')) {
        el.src = SOURCE
        el.load()
      }
    }
    const sync = () => {
      if (
        !visible.current ||
        document.hidden ||
        manualPause.current ||
        reduced.current
      ) {
        el.pause()
        return
      }
      load()
      void el
        .play()
        .then(() => {
          if (
            disposed ||
            !visible.current ||
            document.hidden ||
            manualPause.current ||
            reduced.current
          )
            el.pause()
        })
        .catch(() => {
          /* Low Power Mode can require a deliberate tap. */
        })
    }
    const preferences = () => {
      reduced.current = preference.matches || Boolean(connection?.saveData)
      sync()
    }
    preferences()
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting && entry.intersectionRatio >= 0.3
        sync()
      },
      { threshold: [0, 0.3, 0.6] },
    )
    observer.observe(el)
    document.addEventListener('visibilitychange', sync)
    preference.addEventListener('change', preferences)
    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      preference.removeEventListener('change', preferences)
      el.pause()
    }
  }, [])

  const toggle = async () => {
    const el = video.current
    if (!el) return
    if (!el.paused) {
      manualPause.current = true
      el.pause()
      return
    }
    manualPause.current = false
    reduced.current = false
    if (!el.getAttribute('src')) {
      el.src = SOURCE
      el.load()
    }
    try {
      await el.play()
    } catch {
      setPlaying(false)
    }
  }

  return (
    <figure className="motion-showcase" aria-label={t.title}>
      <div className="motion-screen">
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          poster="/studio/showreel/poster-v5.webp"
          width={910}
          height={512}
          aria-label={t.title}
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true)
            setPlaying(false)
          }}
        />
        {failed && (
          <a className="motion-recovery" href={SOURCE}>
            {t.fallback}
            <Play size={16} aria-hidden />
          </a>
        )}
        <div className="motion-controls">
          <button
            type="button"
            aria-label={playing ? t.pause : t.play}
            onClick={toggle}
          >
            {playing ? (
              <Pause size={16} aria-hidden />
            ) : (
              <Play size={16} aria-hidden />
            )}
          </button>
          <button
            type="button"
            aria-label={muted ? t.sound : t.mute}
            aria-pressed={!muted}
            onClick={() => {
              const next = !muted
              if (video.current) video.current.muted = next
              setMuted(next)
            }}
          >
            {muted ? (
              <VolumeX size={16} aria-hidden />
            ) : (
              <Volume2 size={16} aria-hidden />
            )}
          </button>
        </div>
      </div>
      <figcaption>
        <span>HAREB DIGITAL.</span>
        <span>{t.detail}</span>
        <span>00:24</span>
      </figcaption>
      <noscript>
        <a className="text-link" href={SOURCE}>
          {t.fallback}
        </a>
      </noscript>
    </figure>
  )
}
