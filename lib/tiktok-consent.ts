export const KEY = 'hd-tiktok-consent-v1'
const PIXEL = 'DBFV1F3C77UAFNQJ71EG'
export const CHANGE = 'hd-tiktok-consent-change'
type Queue = { track: (event: string) => void; disableCookie?: () => void }
export const queue = () => (window as unknown as { ttq?: Queue }).ttq
export function optedOut() {
  return navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}
export function decision(): boolean | null {
  if (optedOut()) return false
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    return typeof saved?.allowed === 'boolean' ? saved.allowed : null
  } catch { return null }
}


export function setTikTokConsent(allowed: boolean) {
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
  }
