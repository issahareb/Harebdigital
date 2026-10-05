import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
const base = process.env.SEO_BASE_URL || 'http://localhost:3000'
const output = process.env.QA_OUTPUT_DIR || 'artifacts/qa'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE })
const results = []
for (const [name, viewport, lastFrame] of [
  ['desktop', { width: 1440, height: 960 }, 119],
  ['iphone', { width: 375, height: 812 }, 95],
]) {
  const page = await browser.newPage({ viewport })
  const errors = []
  const frameRequests = []
  page.on('pageerror', e => errors.push(e.message))
  page.on('request', r => { if (r.url().includes('/sequence/')) frameRequests.push(r.url()) })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert(frameRequests.length <= 13, 'Opening must only load nearby frames, not the entire film')
  await page.waitForFunction(() => document.querySelector('canvas')?.dataset.ready === 'true')
  const first = await page.locator('canvas').evaluate(el => el.toDataURL())
  await page.screenshot({ path: `${output}/${name}-opening.png` })
  const travel = await page.locator('.cinematic-stage').evaluate(el => el.offsetHeight - el.querySelector('.cinematic-frame').offsetHeight)
  await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), travel)
  await page.waitForFunction(n => +document.querySelector('canvas').dataset.frame === n, lastFrame)
  const end = await page.locator('canvas').evaluate(el => el.toDataURL())
  assert.notEqual(first, end, 'Camera must change the actual rendered frame')
  await page.waitForTimeout(650)
  await page.screenshot({ path: `${output}/${name}-arrival.png` })
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForFunction(() => document.querySelector('canvas').dataset.frame === '0')
  assert.equal(await page.locator('canvas').evaluate(el => el.toDataURL()), first, 'Reverse scroll returns to the first camera position')
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await page.waitForTimeout(650)
  const modal = page.getByRole('dialog')
  assert(await modal.isVisible())
  assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), 'Focus enters menu')
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab')
  assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), 'Native modal traps keyboard focus')
  await page.screenshot({ path: `${output}/${name}-menu.png` })
  await page.keyboard.press('Escape')
  await modal.waitFor({ state: 'hidden' })
  assert.equal(await page.evaluate(() => document.documentElement.style.overflow), '')
  assert.equal(await page.getByRole('button', { name: 'Menü öffnen' }).evaluate(el => el === document.activeElement), true)
  await page.getByRole('button', { name: 'Animation ausschalten' }).click()
  assert.equal(await page.locator('.cinematic-stage').getAttribute('data-motion'), 'false')
  assert.equal(await page.locator('canvas').getAttribute('data-ready'), null)
  assert.equal(errors.length, 0, errors.join('\n'))
  results.push({ name, reversibleCameraFrames: true, boundedFrameLoading: true, modalFocus: true, escapeRestoresFocus: true, motionOff: true })
  await page.close()
}
for (const mode of ['reduced-motion', 'save-data']) {
  const context = await browser.newContext({ reducedMotion: mode === 'reduced-motion' ? 'reduce' : 'no-preference' })
  if (mode === 'save-data') await context.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true } }))
  const page = await context.newPage()
  const frameRequests = []
  page.on('request', r => { if (r.url().includes('/sequence/')) frameRequests.push(r.url()) })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(frameRequests.length, 0, `${mode} must not fetch motion frames`)
  assert.equal(await page.locator('.cinematic-stage').getAttribute('data-motion'), 'false')
  results.push({ mode, noFrameDownloads: true })
  await context.close()
}
await fs.writeFile(`${output}/motion.json`, JSON.stringify(results, null, 2))
await browser.close()
console.log('PASS: real frame progression and reverse, menu focus trap, Escape, pause, reduced motion and Save-Data.')
