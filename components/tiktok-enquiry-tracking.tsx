'use client'

import { useEffect, useState } from 'react'
import { onConsentChange } from '@/lib/consent'

const KEY = 'hd-tiktok-consent-v1'
const PIXEL = 'DBFV1F3C77UAFNQJ71EG'
const CHANGE = 'hd-tiktok-consent-change'
type Queue = { track: (event: string) => void; disableCookie?: () => void }
const queue = () => (window as unknown as { ttq?: Queue }).ttq
function optedOut() {
  return navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}
function decision(): boolean | null {
  if (optedOut()) return false
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    return typeof saved?.allowed === 'boolean' ? saved.allowed : null
  } catch { return null }
}

// TikTok's supplied base code. Inserted only after separate advertising consent.
const BASE = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${PIXEL}');ttq.page()}(window,document,'ttq');`

export function TikTokEnquiryTracking() {
  const [open, setOpen] = useState(false)
  const [analyticsAnswered, setAnalyticsAnswered] = useState(false)
  const [lang, setLang] = useState('de')
  const [blocked, setBlocked] = useState(false)
  useEffect(() => {
    setLang(document.documentElement.lang.slice(0, 2))
    setBlocked(optedOut())
    const counted = new WeakSet<HTMLFormElement>()
    const sync = () => {
      const allowed = decision()
      setOpen(allowed === null)
      if (allowed === true && !document.getElementById('hd-tiktok-base')) {
        const script = document.createElement('script')
        script.id = 'hd-tiktok-base'
        script.textContent = BASE
        document.head.appendChild(script)
      }
    }
    const stop = onConsentChange(s => setAnalyticsAnswered(s?.analytics != null))
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
    return () => { stop(); window.removeEventListener('hd-form-result', result); window.removeEventListener(CHANGE, sync); window.removeEventListener('storage', storage) }
  }, [])
  const choose = (allowed: boolean) => {
    if (allowed && optedOut()) return
    try { localStorage.setItem(KEY, JSON.stringify({ allowed, decidedAt: new Date().toISOString() })) }
    catch { return } // Fail closed if the decision cannot be stored.
    if (!allowed && queue()) {
      queue()?.disableCookie?.()
      for (const name of ['_ttp', 'ttcsid', `ttcsid_${PIXEL}`]) {
        for (const domain of ['', `; domain=${location.hostname}`, '; domain=.hareb.digital']) document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`
      }
      window.location.reload()
      return
    }
    window.dispatchEvent(new Event(CHANGE))
    setOpen(false)
  }
  const en = lang === 'en', es = lang === 'es'
  const title = en ? 'Optional TikTok advertising measurement' : es ? 'Medición publicitaria opcional de TikTok' : 'Optionale TikTok-Werbemessung'
  const detail = en ? 'Only if you allow it, TikTok receives page visits and confirmed enquiry submissions, plus IP address, device/browser information and cookie identifiers to match visits to ads. Processing outside the EU, including the USA, is possible. We do not send your form text or contact details. This is separate from website analytics. Declining does not affect the form; withdraw anytime in TikTok settings.' : es ? 'Solo con tu permiso, TikTok recibe visitas y formularios enviados correctamente, dirección IP, datos del dispositivo y cookies para relacionar visitas con anuncios. Puede haber tratamiento fuera de la UE, incluido EE. UU. No enviamos el texto ni los datos de contacto del formulario. Es independiente de la analítica. Puedes rechazar o retirar el permiso sin afectar al formulario.' : 'Nur mit deiner Zustimmung erhält TikTok Seitenaufrufe und bestätigte Formularsendungen sowie IP-Adresse, Geräte-/Browserdaten und Cookie-Kennungen zur Zuordnung zu Anzeigen. Eine Verarbeitung außerhalb der EU, auch in den USA, ist möglich. Wir senden keine Formulartexte oder Kontaktdaten. Dies ist getrennt von der Website-Analyse. Ablehnen beeinträchtigt das Formular nicht; Widerruf jederzeit über TikTok-Einstellungen.'
  const button = { border: '1px solid #384534', borderRadius: 8, padding: '10px 14px', background: '#F3F1EB', color: '#384534', cursor: 'pointer', font: 'inherit' } as const
  return <div data-track-ignore>
    {open && analyticsAnswered ? <section role="dialog" aria-label={title} style={{ position: 'fixed', bottom: 48, right: 16, left: 16, maxWidth: 520, marginLeft: 'auto', zIndex: 99998, background: '#F3F1EB', color: '#384534', border: '1px solid #384534', borderRadius: 16, padding: 20, fontSize: 14, lineHeight: 1.5 }}>
      <strong>{title}</strong><p style={{ margin: '12px 0' }}>{detail}</p>
      <a href="/datenschutz/#tiktok" style={{ textDecoration: 'underline' }}>{en ? 'Privacy details' : es ? 'Privacidad' : 'Datenschutzhinweise'}</a>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
        <button type="button" style={button} onClick={() => choose(false)}>{en ? 'Decline / withdraw' : es ? 'Rechazar / retirar' : 'Ablehnen / widerrufen'}</button>
        <button type="button" style={button} disabled={blocked} onClick={() => choose(true)}>{en ? 'Allow TikTok measurement' : es ? 'Permitir medición TikTok' : 'TikTok-Messung erlauben'}</button>
      </div>
    </section> : <button type="button" style={{ ...button, position: 'fixed', bottom: 8, right: 8, zIndex: 9998, fontSize: 11, padding: '5px 9px' }} onClick={() => { setAnalyticsAnswered(true); setOpen(true) }}>{en ? 'TikTok settings' : es ? 'Ajustes TikTok' : 'TikTok-Einstellungen'}</button>}
  </div>
}
