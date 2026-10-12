import { createHash, randomBytes } from 'node:crypto'
import nodemailer from 'nodemailer'

export type ContactMessage = {
  name: string
  email: string
  message: string
  service: string
  language: 'de' | 'en' | 'es'
  website?: string
}
const serviceNames: Record<string, string> = {
  'neue-website': 'Webdesign & Entwicklung',
  'website-ueberarbeiten': 'Website-Relaunch',
  automatisierung: 'Automatisierung',
  'gefunden-werden': 'SEO & AEO',
  'social-media-ads': 'Social Media & Ads',
}
const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/
export function mailConfigured() {
  return Boolean(
    process.env.CONTACT_FROM &&
      (process.env.RESEND_API_KEY ||
        (process.env.SMTP_HOST &&
          process.env.SMTP_USER &&
          process.env.SMTP_PASSWORD)),
  )
}
export function validateContact(value: unknown): ContactMessage | null {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (typeof input.website === 'string' && input.website.trim()) return null
  if (
    typeof input.name !== 'string' ||
    typeof input.email !== 'string' ||
    typeof input.message !== 'string'
  )
    return null
  const name = input.name.trim(),
    email = input.email.trim(),
    message = input.message.trim()
  if (name.length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name))
    return null
  if (email.length > 254 || !emailPattern.test(email)) return null
  if (message.length < 10 || message.length > 5000 || message.includes('\0'))
    return null
  if (
    typeof input.service !== 'string' ||
    (input.service !== '' && !Object.hasOwn(serviceNames, input.service))
  )
    return null
  if (
    typeof input.language !== 'string' ||
    !['de', 'en', 'es'].includes(input.language)
  )
    return null
  return {
    name,
    email,
    message,
    service: input.service,
    language: input.language as ContactMessage['language'],
  }
}

// Bounded, short-lived abuse protection for this single-replica service.
// Addresses are never logged or retained as plaintext.
const salt = randomBytes(16).toString('hex')
const attempts = new Map<string, { count: number; expires: number }>()
export function allowContactRequest(address: string, now = Date.now()) {
  for (const [key, value] of attempts)
    if (value.expires <= now) attempts.delete(key)
  const key = createHash('sha256')
    .update(salt + address)
    .digest('hex')
  const previous = attempts.get(key)
  if (previous) {
    previous.count++
    return previous.count <= 5
  }
  if (attempts.size >= 5000) return false
  attempts.set(key, { count: 1, expires: now + 15 * 60 * 1000 })
  return true
}

export async function sendContact(message: ContactMessage) {
  const from = process.env.CONTACT_FROM!
  const to = process.env.CONTACT_TO || 'info@hareb.org'
  const subject = `Projektanfrage: ${serviceNames[message.service] || 'Erstgespräch'}`
  const text = [
    `Neue Anfrage über hareb.digital`,
    '',
    `Name: ${message.name}`,
    `E-Mail: ${message.email}`,
    `Leistung: ${serviceNames[message.service] || 'Noch offen'}`,
    `Sprache: ${message.language}`,
    '',
    message.message,
  ].join('\n')
  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.email,
        subject,
        text,
      }),
    })
    if (!response.ok) throw new Error('MAIL_PROVIDER_REJECTED')
    const result = await response.json()
    if (typeof result.id !== 'string' || !result.id)
      throw new Error('MAIL_PROVIDER_UNCONFIRMED')
    return
  }
  const port = Number(process.env.SMTP_PORT || 587)
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error('MAIL_CONFIGURATION')
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  const result = await transport.sendMail({
    from,
    to,
    replyTo: message.email,
    subject,
    text,
  })
  if (!result.accepted?.length) throw new Error('MAIL_PROVIDER_UNCONFIRMED')
}
