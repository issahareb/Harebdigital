import { NextRequest, NextResponse } from 'next/server'
import {
  allowContactRequest,
  mailConfigured,
  sendContact,
  validateContact,
} from '@/lib/contact-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store' }
const reply = (code: string, status: number) =>
  NextResponse.json({ ok: false, code }, { status, headers })

export async function GET() {
  return NextResponse.json({ available: mailConfigured() }, { headers })
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  // Same-origin only. No arbitrary contact relay or cross-site submission.
  const expected = new URL(request.url).origin
  if (
    !origin ||
    ![expected, 'https://hareb.digital', 'https://www.hareb.digital'].includes(
      origin,
    )
  )
    return reply('ORIGIN', 403)
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply('CONTENT_TYPE', 415)
  if (Number(request.headers.get('content-length') || 0) > 16384)
    return reply('SIZE', 413)
  if (!mailConfigured()) return reply('UNAVAILABLE', 503)
  const address =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  if (!allowContactRequest(address)) return reply('RATE_LIMIT', 429)
  let body: unknown
  try {
    const reader = request.body?.getReader()
    if (!reader) return reply('INVALID', 422)
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 16384) {
        await reader.cancel()
        return reply('SIZE', 413)
      }
      chunks.push(value)
    }
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return reply('INVALID', 422)
  }
  const message = validateContact(body)
  if (!message) return reply('INVALID', 422)
  try {
    await sendContact(message)
    return NextResponse.json({ ok: true }, { headers })
  } catch {
    // Do not log message contents, addresses or provider responses.
    console.error('Contact delivery failed')
    return reply('DELIVERY', 502)
  }
}
