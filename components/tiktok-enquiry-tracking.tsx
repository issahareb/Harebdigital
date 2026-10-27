'use client'
import { useEffect } from 'react'
import { KEY, CHANGE, queue, decision } from '@/lib/tiktok-consent'
const PIXEL = 'DBFV1F3C77UAFNQJ71EG'
// TikTok's supplied base code. Inserted only after separate advertising consent.
const BASE = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${PIXEL}');ttq.page()}(window,document,'ttq');`

export function TikTokEnquiryTracking() {
  useEffect(() => {
    const counted = new WeakSet<HTMLFormElement>()
    const sync = () => {
      const allowed = decision()
      if (allowed === true && !document.getElementById('hd-tiktok-base')) {
        const script = document.createElement('script')
        script.id = 'hd-tiktok-base'
        script.textContent = BASE
        document.head.appendChild(script)
      }
    }
    const result = (event: Event) => {
      const detail = (event as CustomEvent<{ form: HTMLFormElement; ok: boolean }>).detail
      if (decision() !== true || !detail?.ok || !(detail.form instanceof HTMLFormElement) || detail.form.dataset.trackId !== 'project-enquiry' || counted.has(detail.form)) return
      // No form values, names, addresses or message text are sent.
      const ttq = queue()
      if (ttq) { ttq.track('SubmitForm'); counted.add(detail.form) }
    }
    const storage = (e: StorageEvent) => {
      if (e.key === KEY || e.key === null) {
        if (decision() !== true && queue()) window.location.reload()
        else sync()
      }
    }
    sync()
    window.addEventListener('hd-form-result', result)
    window.addEventListener(CHANGE, sync)
    window.addEventListener('storage', storage)
    return () => { window.removeEventListener('hd-form-result', result); window.removeEventListener(CHANGE, sync); window.removeEventListener('storage', storage) }
  }, [])
  return null
}
