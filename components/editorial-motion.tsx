'use client'

import { useEffect } from 'react'

/** Only off-screen content is enhanced. SSR and no-JS content stays visible. */
export function EditorialMotion() {
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    let observer: IntersectionObserver | undefined
    const setup = () => {
      observer?.disconnect()
      elements.forEach(el => el.removeAttribute('data-reveal-pending'))
      if (preference.matches) return
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.removeAttribute('data-reveal-pending')
          observer?.unobserve(entry.target)
        }
      }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' })
      for (const el of elements) if (el.getBoundingClientRect().top > innerHeight) {
        el.setAttribute('data-reveal-pending', '')
        observer.observe(el)
      }
    }
    setup()
    preference.addEventListener('change', setup)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', setup)
      elements.forEach(el => el.removeAttribute('data-reveal-pending'))
    }
  }, [])
  return null
}
