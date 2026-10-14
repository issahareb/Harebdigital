import { createHash } from 'node:crypto'

// Deliberately fixed on the server. Never accept recipients from form input.
export const CONTACT_RECIPIENT = 'kontakt@hareb.digital'
const CONTACT_FROM = 'Hareb Digital <anfragen@hareb.org>'
const WINDOW_MS = 15 * 60 * 1000
const attempts = new Map<string, { count: number; until: number }>()

function result(status: number, code: string) {
  return Response.json({ ok: status === 200, code }, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function handleContact(request: Request): Promise<Response> {
  const origin = request.headers.get('origin')
  const trusted = ['https://hareb.digital', 'https://www.hareb.digital']
  if (process.env.NODE_ENV !== 'production') trusted.push(new URL(request.url).origin)
  if ((origin && !trusted.includes(origin)) || request.headers.get('sec-fetch-site') === 'cross-site') return result(403, 'invalid_origin')
  if (!request.headers.get('content-type')?.includes('application/json')) return result(415, 'invalid_request')

  // Bounded per-instance burst protection. The deployed service has one replica.
  const now = Date.now()
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key)
  const address = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const ipHash = createHash('sha256').update(address).digest('hex')
  const entry = attempts.get(ipHash)
  if ((entry && entry.count >= 5) || (!entry && attempts.size >= 5000)) return result(429, 'rate_limited')
  attempts.set(ipHash, { count: (entry?.count ?? 0) + 1, until: entry?.until ?? now + WINDOW_MS })

  let input: Record<string, unknown>
  try {
    // Bound reads even if Content-Length is missing or forged.
    const reader = request.body?.getReader()
    if (!reader) return result(400, 'invalid_request')
    let size = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const part = await reader.read()
      if (part.done) break
      size += part.value.byteLength
      if (size > 24000) { await reader.cancel(); return result(413, 'invalid_request') }
      chunks.push(part.value)
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return result(400, 'invalid_request')
    input = parsed
  } catch { return result(400, 'invalid_request') }

  const { name, email, message, service = '', website = '', requestId } = input
  if (typeof website !== 'string' || website !== '') return result(400, 'invalid_request')
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120 || /[\r\n\u0000]/.test(name)
    || typeof email !== 'string' || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000
    || typeof service !== 'string' || service.length > 120 || /[\r\n\u0000]/.test(service)
    || typeof requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(requestId)) return result(400, 'invalid_request')

  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return result(503, 'unavailable')
  const text = [
    'Neue Projektanfrage über hareb.digital', '',
    `Name: ${name.trim()}`, `E-Mail: ${email.trim()}`,
    `Leistung: ${service.trim() || 'Noch offen'}`, '', message.trim(),
  ].join('\n')
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `hareb-contact/${requestId}` },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_RECIPIENT],
        reply_to: email.trim(),
        subject: `Projektanfrage: ${service.trim() || 'Hareb Digital'} · ${name.trim()}`,
        text,
      }),
      signal: AbortSignal.timeout(15000),
    })
    const sent = await response.json().catch(() => null)
    if (!response.ok || typeof sent?.id !== 'string' || !sent.id) {
      console.error('[CONTACT] Provider rejected request', response.status)
      return result(502, 'send_failed')
    }
    console.info('[CONTACT] Accepted by email provider', sent.id)
    return result(200, 'sent')
  } catch {
    console.error('[CONTACT] Email provider unavailable')
    return result(502, 'send_failed')
  }
}
