import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'

const calls = []
let providerStatus = 200, providerBody = { id: 'test-provider-id' }, throws = false
const env = { NODE_ENV: 'production', RESEND_API_KEY: 'test-only-not-a-real-key' }
const source = ts.transpileModule(fs.readFileSync('lib/contact-mail.ts', 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText
const context = vm.createContext({
  exports: {}, require: createRequire(import.meta.url), process: { env },
  Request, Response, URL, Buffer, AbortSignal, console: { error() {}, info() {} },
  fetch: async (url, init) => {
    calls.push({ url, ...init, body: JSON.parse(init.body) })
    if (throws) throw Error('network unavailable')
    return Response.json(providerBody, { status: providerStatus })
  },
})
vm.runInContext(source, context)
const { handleContact } = context.exports
let ip = 0
const valid = { name: 'Test Anfrage', email: 'visitor@example.org', message: 'Eine gültige Projektanfrage mit <script> als reinem Text.', service: 'Webdesign', website: '', requestId: '12345678-1234-1234-1234-123456789abc' }
function request(body = valid, options = {}) {
  return new Request('https://hareb.digital/api/kontakt/', {
    method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: { 'content-type': 'application/json', origin: 'https://hareb.digital', 'x-real-ip': `test-${++ip}`, ...options },
  })
}
let response = await handleContact(request({ ...valid, to: 'taxibb@outlook.com', cc: ['other@example.org'], bcc: ['taxibb@outlook.com'] }))
assert.equal(response.status, 200)
assert.equal((await response.json()).ok, true)
assert.deepEqual(calls[0].body.to, ['issa@hareb.org'], 'Visitor input cannot override the sole recipient')
assert.equal(calls[0].body.cc, undefined)
assert.equal(calls[0].body.bcc, undefined)
assert.equal(calls[0].body.reply_to, valid.email)
assert.equal(calls[0].body.from, 'Hareb Digital <anfragen@hareb.org>')
assert.equal(calls[0].body.html, undefined, 'Untrusted message content stays plain text')
await handleContact(request())
assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key'], 'Retries retain provider deduplication key')
for (const body of [null, [], { ...valid, email: 'bad\r\nBcc:evil@example.org' }, { ...valid, message: 'short' }, { ...valid, name: {} }, { ...valid, website: 'spam' }, { ...valid, requestId: 'bad' }]) {
  assert.equal((await handleContact(request(body))).status, 400)
}
const sentBefore = calls.length
assert.equal((await handleContact(request(valid, { origin: 'https://other.example' }))).status, 403)
assert.equal((await handleContact(request('x'.repeat(25000)))).status, 413)
assert.equal((await handleContact(request('{broken'))).status, 400)
assert.equal(calls.length, sentBefore, 'Invalid or oversized requests never call the provider')
delete env.RESEND_API_KEY
response = await handleContact(request())
assert.equal(response.status, 503)
assert.equal((await response.json()).ok, false, 'Missing configuration must never report success')
env.RESEND_API_KEY = 'test-only-not-a-real-key'
providerStatus = 403; providerBody = { message: 'provider rejected' }
assert.equal((await handleContact(request())).status, 502)
providerStatus = 200; providerBody = {}
assert.equal((await handleContact(request())).status, 502, 'Provider acceptance ID is required')
throws = true
assert.equal((await handleContact(request())).status, 502)
throws = false; providerBody = { id: 'test-provider-id' }
for (let i = 0; i < 5; i++) assert.equal((await handleContact(request(valid, { 'x-real-ip': 'same-client' }))).status, 200)
assert.equal((await handleContact(request(valid, { 'x-real-ip': 'same-client' }))).status, 429)
console.log('Passed: only Issa receives mail, no CC/BCC, reply-to, plain text, duplicate protection, validation, origin/body limits, missing key, provider errors and rate limiting. No real mail sent.')
