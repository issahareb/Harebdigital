'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'

const COPY = {
  de: { label: 'Motion Design & Werbevideos', title: 'Deine Marke.', accent: 'In Bewegung.', text: 'Ich produziere Motion-Videos für Websites, Social Media und Werbekampagnen. Von der Idee über Animation und Schnitt bis zum fertigen Video.', cta: 'Dein Video anfragen', credit: 'Eine Produktion für Hareb Digital', sound: 'Ton einschalten', mute: 'Ton ausschalten', play: 'Video abspielen', pause: 'Video pausieren', tags: ['Motion Design', 'Social Ads', 'Markenvideos'] },
  en: { label: 'Motion design & advertising videos', title: 'Your brand.', accent: 'In motion.', text: 'I produce motion videos for websites, social media and advertising campaigns. From the idea through animation and editing to the finished video.', cta: 'Enquire about your video', credit: 'A production for Hareb Digital', sound: 'Turn sound on', mute: 'Turn sound off', play: 'Play video', pause: 'Pause video', tags: ['Motion design', 'Social ads', 'Brand videos'] },
  es: { label: 'Motion design y videos publicitarios', title: 'Tu marca.', accent: 'En movimiento.', text: 'Produzco videos animados para sitios web, redes sociales y campañas publicitarias. Desde la idea y la animación hasta la edición del video final.', cta: 'Hablemos de tu video', credit: 'Una producción para Hareb Digital', sound: 'Activar sonido', mute: 'Silenciar', play: 'Reproducir video', pause: 'Pausar video', tags: ['Motion design', 'Anuncios sociales', 'Videos de marca'] },
}

export function MotionFeature({ lang }: { lang: HdLang }) {
  const t = COPY[lang]
  const video = useRef<HTMLVideoElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [decoded, setDecoded] = useState(false)
  const userPaused = useRef(false)
  const manual = useRef(false)
  const inView = useRef(false)
  const source = '/videos/hareb-motion-final-v5.mp4'

  useEffect(() => {
    const el = video.current, area = screen.current
    if (!el || !area) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const sync = () => {
      if (inView.current && !document.hidden && !userPaused.current && (manual.current || (!reduced.matches && !saveData))) {
        if (!el.getAttribute('src')) el.src = source
        el.play().catch(() => setPlaying(false))
      } else {
        el.pause()
        if (!inView.current || document.hidden) { el.muted = true; setMuted(true) }
      }
    }
    const prepare = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced.matches && !saveData) {
        if (!el.getAttribute('src')) { el.preload = 'auto'; el.src = source }
        prepare.disconnect()
      }
    }, { rootMargin: '300px' })
    const observer = new IntersectionObserver(([entry]) => { inView.current = entry.intersectionRatio >= .3; sync() }, { threshold: [0, .3] })
    prepare.observe(area); observer.observe(area)
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    return () => { prepare.disconnect(); observer.disconnect(); el.pause(); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync) }
  }, [])

  const togglePlay = () => {
    const el = video.current
    if (!el) return
    if (el.paused) {
      manual.current = true; userPaused.current = false
      if (!el.getAttribute('src')) el.src = source
      el.play().catch(() => setPlaying(false))
    } else { userPaused.current = true; el.pause() }
  }

  return <section id="motion-design" className="motion-feature" aria-labelledby="motion-title">
    <div className="wrap">
      <div className="motion-feature-heading">
        <div><span className="eyebrow">{t.label}</span><h2 id="motion-title">{t.title}<br /><span>{t.accent}</span></h2></div>
        <div className="motion-feature-copy"><p>{t.text}</p><Link href={lang === 'de' ? '/kontakt/' : `/${lang}/kontakt/`} className="motion-feature-cta">{t.cta}<ArrowUpRight size={20} aria-hidden /></Link></div>
      </div>
      <div ref={screen} className="motion-feature-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/videos/hareb-motion-final-v5.webp" alt="" className="motion-feature-poster" />
        <video ref={video} muted={muted} loop playsInline preload="none" poster="/videos/hareb-motion-final-v5.webp" data-decoded={decoded} aria-label={t.credit}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)}
          onPlaying={event => { const el = event.currentTarget; if ('requestVideoFrameCallback' in el) el.requestVideoFrameCallback(() => setDecoded(true)); else setDecoded(true) }} />
        <div className="motion-feature-player">
          <button type="button" aria-label={playing ? t.pause : t.play} onClick={togglePlay}>{playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}</button>
          <button type="button" onClick={() => { const el = video.current; if (!el) return; el.muted = !el.muted; setMuted(el.muted); if (el.paused) togglePlay() }} aria-label={muted ? t.sound : t.mute}>{muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}<span>{muted ? t.sound : t.mute}</span></button>
        </div>
      </div>
      <div className="motion-feature-caption"><span>{t.credit}</span><ul>{t.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
    </div>
  </section>
}
