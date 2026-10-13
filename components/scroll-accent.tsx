'use client'

import { useEffect, useRef } from 'react'

/** Keep the full sentence in the HTML; scrolling only changes its word colors. */
export function ScrollAccent({ text, expressive = false }: { text: string; expressive?: boolean }) {
  const line = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = line.current
    if (!element) return
    const words = [...element.querySelectorAll<HTMLElement>('.scroll-accent-word')]
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const clamp = (value: number) => Math.max(0, Math.min(1, value))
    let frame = 0
    let previous = -1

    const update = () => {
      frame = 0
      if (document.hidden) return
      // Begin as the line enters the lower viewport; finish near its centre.
      const progress = preference.matches
        ? 1
        : clamp((innerHeight * (expressive ? .78 : .84) - element.getBoundingClientRect().top) / (innerHeight * (expressive ? .48 : .42)))
      if (progress === previous) return
      previous = progress
      words.forEach((word, index) => {
        const amount = expressive
          ? clamp(progress * (words.length * .65 + 1) - index * .65)
          : clamp(progress * words.length - index)
        const eased = amount * amount * (3 - 2 * amount)
        word.style.setProperty('--word-reveal', String(eased))
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('visibilitychange', schedule)
    preference.addEventListener('change', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('visibilitychange', schedule)
      preference.removeEventListener('change', schedule)
    }
  }, [text, expressive])

  return (
    <span ref={line} className={`scroll-accent${expressive ? ' scroll-accent--expressive' : ''}`}>
      {text.split(/(\s+)/).map((part, index) =>
        part.trim() ? (
          <span className="scroll-accent-word" key={index}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  )
}
