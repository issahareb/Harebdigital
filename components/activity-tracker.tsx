'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { onConsentChange, readConsent, setConsent, OPEN_CONSENT_EVENT } from '@/lib/consent'
import { decision, setTikTokConsent, optedOut, CHANGE } from '@/lib/tiktok-consent'
import { startActivityTracker } from '@/lib/activity-tracker'
import styles from './consent-banner.module.css'

export function ActivityTracker() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [lang, setLang] = useState('de')
  useEffect(() => {
    setLang(document.documentElement.lang.slice(0,2))
    setBlocked(optedOut())
    let stop: ((revoked?: boolean) => void) | undefined
    const unsubscribe = onConsentChange(s => {
      setAnalytics(s?.analytics === true && !optedOut())
      if (s?.analytics === true && !optedOut()) { if (!stop) stop = startActivityTracker(path) }
      else { stop?.(true); stop = undefined }
    })
    const sync = () => setAdvertising(decision() === true)
    sync()
    setOpen(readConsent()?.analytics == null || decision() == null)
    const show = () => { setAnalytics(readConsent()?.analytics === true && !optedOut()); sync(); setExpanded(true); setOpen(true) }
    window.addEventListener(OPEN_CONSENT_EVENT, show)
    window.addEventListener(CHANGE, sync)
    return () => { unsubscribe(); stop?.(); window.removeEventListener(OPEN_CONSENT_EVENT, show); window.removeEventListener(CHANGE, sync) }
  }, [path])
  const en = lang === 'en', es = lang === 'es'
  const analyticsDetail=en?'With your permission we measure active time, viewed sections, scroll stops, button positions, video use and form steps (including abandonment), but never your entered text or chats. A random visit ID in sessionStorage connects events for up to 30 minutes of inactivity. No cross-site matching. Data is available only in our private LUKAS dashboard, hosted by Railway in the USA, and deleted after 90 days at the next data ingestion. You can withdraw here at any time.':es?'Con tu permiso medimos tiempo activo, secciones vistas, pausas al desplazar, botones, vídeos y pasos de formularios (incluido abandono), nunca textos introducidos ni chats. Un identificador aleatorio en sessionStorage une eventos hasta 30 minutos de inactividad, sin seguimiento entre sitios. Datos solo en nuestro panel privado LUKAS, alojado por Railway en EE. UU.; eliminación tras 90 días en la siguiente recepción. Puedes retirar el permiso aquí.':'Mit deiner Zustimmung messen wir aktive Verweildauer, sichtbare Abschnitte, Scrollstopps, Buttonpositionen, Videonutzung und Formularschritte einschließlich Abbrüchen. Keine eingegebenen Texte oder Chats. Eine zufällige Besuchs-ID in sessionStorage verbindet Ereignisse bis zu 30 Minuten Inaktivität, ohne websiteübergreifende Zuordnung. Die Daten erscheinen nur in unserem privaten LUKAS-Dashboard, gehostet bei Railway in den USA. Löschung nach 90 Tagen bei der nächsten Datenannahme. Hier jederzeit widerrufbar.'
  const advertisingDetail = en ? 'Only if you allow it, TikTok receives page visits and confirmed enquiry submissions, plus IP address, device/browser information and cookie identifiers to match visits to ads. Processing outside the EU, including the USA, is possible. We do not send your form text or contact details. This is separate from website analytics. Declining does not affect the form; withdraw anytime in TikTok settings.' : es ? 'Solo con tu permiso, TikTok recibe visitas y formularios enviados correctamente, dirección IP, datos del dispositivo y cookies para relacionar visitas con anuncios. Puede haber tratamiento fuera de la UE, incluido EE. UU. No enviamos el texto ni los datos de contacto del formulario. Es independiente de la analítica. Puedes rechazar o retirar el permiso sin afectar al formulario.' : 'Nur mit deiner Zustimmung erhält TikTok Seitenaufrufe und bestätigte Formularsendungen sowie IP-Adresse, Geräte-/Browserdaten und Cookie-Kennungen zur Zuordnung zu Anzeigen. Eine Verarbeitung außerhalb der EU, auch in den USA, ist möglich. Wir senden keine Formulartexte oder Kontaktdaten. Dies ist getrennt von der Website-Analyse. Ablehnen beeinträchtigt das Formular nicht; Widerruf jederzeit über TikTok-Einstellungen.'
const title = en ? 'Your privacy. Your choice.' : es ? 'Tu privacidad. Tú decides.' : 'Deine Privatsphäre. Deine Wahl.'
  const save = (a: boolean, t: boolean) => {
    setConsent('analytics', a && !blocked)
    setOpen(false)
    setExpanded(false)
    setTikTokConsent(t && !blocked)
  }
  return <div data-track-ignore>
    {open ? <section role="dialog" aria-labelledby="privacy-title" aria-describedby="privacy-summary" className={styles.banner}>
      <span className={styles.label}>{en ? 'PRIVACY' : es ? 'PRIVACIDAD' : 'DATENSCHUTZ'}</span>
      <h2 id="privacy-title">{title}</h2>
      <p id="privacy-summary">{en ? 'With your permission, we use cookies and browser storage for website statistics and TikTok advertising measurement. TikTok may process data in the USA. Everything works without consent.' : es ? 'Con tu permiso usamos cookies y almacenamiento del navegador para estadísticas y medición publicitaria de TikTok. TikTok puede tratar datos en EE. UU. La web funciona sin aceptar.' : 'Mit deiner Zustimmung nutzen wir Cookies und Browser-Speicher für Website-Statistik und TikTok-Werbemessung. TikTok kann Daten in den USA verarbeiten. Die Website funktioniert auch ohne Zustimmung.'}</p>
      {expanded && <div id="privacy-options" className={styles.options}>
        <p>{en ? 'Necessary storage remembers your settings. Optional categories start only with permission.' : es ? 'El almacenamiento necesario recuerda tus ajustes. Las categorías opcionales requieren permiso.' : 'Notwendiger Speicher merkt sich deine Einstellungen. Optionale Kategorien starten erst mit deiner Zustimmung.'}</p>
        <label><span>{en ? 'Website statistics' : es ? 'Estadísticas web' : 'Website-Statistik'}</span><input type="checkbox" checked={analytics} disabled={blocked} onChange={e => setAnalytics(e.target.checked)} /></label>
        <details><summary>{en ? 'Statistics details' : es ? 'Detalles de estadísticas' : 'Details zur Statistik'}</summary><p>{analyticsDetail}</p></details>
        <label><span>{en ? 'TikTok advertising measurement' : es ? 'Medición publicitaria TikTok' : 'TikTok-Werbemessung'}</span><input type="checkbox" checked={advertising} disabled={blocked} onChange={e => setAdvertising(e.target.checked)} /></label>
        <details><summary>{en ? 'TikTok details' : es ? 'Detalles de TikTok' : 'Details zu TikTok'}</summary><p>{advertisingDetail.replace(/TikTok-Einstellungen/g, 'Datenschutzeinstellungen').replace(/TikTok settings/g, 'privacy settings')}</p></details>
        {blocked && <p>{en ? 'Your browser requests no tracking. Optional measurement stays off.' : es ? 'Tu navegador solicita no ser rastreado. La medición opcional permanece desactivada.' : 'Dein Browser wünscht kein Tracking. Optionale Messungen bleiben ausgeschaltet.'}</p>}
        <button type="button" className="button button-dark" onClick={() => save(analytics, advertising)}>{en ? 'Save selection' : es ? 'Guardar selección' : 'Auswahl speichern'}</button>
      </div>}
      <div className={styles.actions}>
        <button type="button" className="button button-dark" onClick={() => save(false,false)}>{en ? 'Decline all' : es ? 'Rechazar todo' : 'Alle ablehnen'}</button>
        <button type="button" className="button button-dark" disabled={blocked} onClick={() => save(true,true)}>{en ? 'Allow all' : es ? 'Permitir todo' : 'Alle erlauben'}</button>
      </div>
      <div className={styles.links}><button type="button" aria-expanded={expanded} aria-controls="privacy-options" onClick={() => setExpanded(!expanded)}>{en ? 'Settings' : es ? 'Ajustes' : 'Einstellungen'}</button><a href="/datenschutz/">{en ? 'Privacy details' : es ? 'Privacidad' : 'Datenschutzhinweise'}</a></div>
    </section> : <button type="button" className={styles.reopen} onClick={() => { setExpanded(true); setOpen(true) }}>{en ? 'Privacy settings' : es ? 'Ajustes de privacidad' : 'Datenschutzeinstellungen'}</button>}
  </div>
}
