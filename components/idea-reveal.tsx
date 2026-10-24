'use client'
import { Fragment, useEffect, useRef } from 'react'

export function IdeaReveal({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = root.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let animations: Animation[] = []
    let frame = 0
    let duration = 0
    const update = () => {
      frame = 0
      if (!animations.length) return
      const { top } = element.getBoundingClientRect()
      // Tie the reveal to the viewport, so scrolling back reverses it exactly.
      const progress = Math.max(0, Math.min(1, (innerHeight * .9 - top) / (innerHeight * .4)))
      animations.forEach(animation => { animation.currentTime = progress * duration })
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    const setup = () => {
      animations.forEach(animation => animation.cancel())
      animations = []
      if (preference.matches) return
      const words = element.querySelectorAll<HTMLElement>('.idea-word')
      duration = Math.max(1350, 850 + (words.length - 1) * 85)
      words.forEach((word, index) => {
        const animation = word.animate([
          { transform: 'translateY(110%) rotate(5deg)', opacity: 0 },
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        ], { duration: 850, delay: index * 85, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' })
        animation.pause()
        animations.push(animation)
      })
      const underline = element.querySelector<HTMLElement>('.idea-underline')
      if (underline) {
        const animation = underline.animate([
          { transform: 'scaleX(0)' }, { transform: 'scaleX(1)' },
        ], { duration: 700, delay: 650, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' })
        animation.pause()
        animations.push(animation)
      }
      update()
    }
    setup()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    preference.addEventListener('change', setup)
    return () => {
      cancelAnimationFrame(frame)
      animations.forEach(animation => animation.cancel())
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      preference.removeEventListener('change', setup)
    }
  }, [text])
  return <span ref={root} className="idea-reveal" aria-label={text.replace(/\n/g, ' ')}>
    {text.split('\n').map((line, lineIndex) => <span className="idea-line" key={lineIndex} aria-hidden="true">
      {line.split(' ').map((word, index) => <Fragment key={index}>{index > 0 && ' '}<span className="idea-word-mask"><span className="idea-word">{word}</span></span></Fragment>)}
      {lineIndex === 1 && <span className="idea-underline" />}
    </span>)}
  </span>
}
