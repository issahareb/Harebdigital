'use client'
import { useEffect, useRef } from 'react'

export function IdeaReveal({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = root.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const animations: Animation[] = []
    const finish = () => animations.forEach(animation => animation.finish())
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (preference.matches) return
      element.querySelectorAll<HTMLElement>('.idea-word').forEach((word, index) => {
        animations.push(word.animate([
          { transform: 'translateY(110%) rotate(5deg)', opacity: 0 },
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        ], { duration: 850, delay: index * 85, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }))
      })
      const underline = element.querySelector<HTMLElement>('.idea-underline')
      if (underline) animations.push(underline.animate([
        { transform: 'scaleX(0)' }, { transform: 'scaleX(1)' },
      ], { duration: 700, delay: 650, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }))
    }, { threshold: 0.25 })
    observer.observe(element)
    preference.addEventListener('change', finish)
    return () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      preference.removeEventListener('change', finish)
    }
  }, [text])
  return <span ref={root} className="idea-reveal" aria-label={text.replace(/\n/g, ' ')}>
    {text.split('\n').map((line, lineIndex) => <span className="idea-line" key={lineIndex} aria-hidden="true">
      {line.split(' ').map((word, index) => <span key={index} className="idea-word-mask"><span className="idea-word">{word}</span>{' '}</span>)}
      {lineIndex === 1 && <span className="idea-underline" />}
    </span>)}
  </span>
}
