import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
const base = process.env.SEO_BASE_URL || 'http://localhost:3000'
const output = process.env.QA_OUTPUT_DIR || 'artifacts/qa'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
})
const results = []
for (const [name, viewport, lastFrame] of [
  ['desktop', { width: 1440, height: 960 }, 119],
  ['iphone', { width: 375, height: 812 }, 95],
]) {
  const page = await browser.newPage({ viewport })
  const errors = []
  const frameRequests = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('request', (r) => {
    if (r.url().includes('/sequence/')) frameRequests.push(r.url())
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert(frameRequests.length <= 13, 'Opening must only load nearby frames, not the entire film')
  await page.waitForFunction(() => document.querySelector('canvas')?.dataset.ready === 'true')
  const first = await page.locator('canvas').evaluate((el) => el.toDataURL())
  await page.screenshot({ path: `${output}/${name}-opening.png` })
  const geometry = () =>
    page.evaluate(() => {
      const frame = document.querySelector('.cinematic-frame')
      const rect = frame.getBoundingClientRect()
      const header = document.querySelector('.site-header').getBoundingClientRect()
      const insets = getComputedStyle(frame)
        .clipPath.match(/[\d.]+/g)
        .map(Number)
      return {
        top: insets[0],
        side: insets[1] ?? insets[0],
        bottom: insets[2] ?? insets[0],
        width: rect.width,
        height: rect.height,
        y: rect.y,
        headerTop: header.top,
        headerBottom: header.bottom,
        cornersCovered: [
          [1, 1],
          [innerWidth - 2, 1],
          [1, innerHeight - 2],
          [innerWidth - 2, innerHeight - 2],
        ].every(([x, y]) => frame.contains(document.elementFromPoint(x, y))),
      }
    })
  const scrollTo = async (y) => {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y)
    await page.waitForTimeout(100)
    return geometry()
  }
  const opening = await geometry()
  assert(opening.top > 0 && opening.side > 0 && opening.bottom > 0, 'Opening has a visible frame')
  const early = await scrollTo(viewport.height * 0.05)
  const middle = await scrollTo(viewport.height * 0.2)
  assert(
    early.top < opening.top && early.side < opening.side,
    'Frame begins expanding on the first scroll',
  )
  assert(
    middle.top < early.top && middle.top > 0,
    'Expansion is continuous, not a fullscreen toggle',
  )
  await page.screenshot({ path: `${output}/${name}-expanding.png` })
  const fullscreen = await scrollTo(viewport.height * 0.5)
  assert.equal(
    fullscreen.top + fullscreen.side + fullscreen.bottom,
    0,
    'Film has no remaining border',
  )
  assert.equal(fullscreen.y, 0)
  assert.equal(fullscreen.width, viewport.width)
  assert.equal(fullscreen.height, viewport.height)
  assert(
    fullscreen.cornersCovered && fullscreen.headerBottom <= 0.5,
    'Film covers all four viewport corners',
  )
  await page.screenshot({ path: `${output}/${name}-fullscreen.png` })
  const reverse = await scrollTo(viewport.height * 0.2)
  assert.deepEqual(reverse, middle, 'Reverse scrolling restores the same intermediate frame')
  await scrollTo(0)
  assert.deepEqual(
    await geometry(),
    opening,
    'Returning to the top restores the original frame and navigation',
  )
  const travel = await page
    .locator('.cinematic-stage')
    .evaluate((el) => el.offsetHeight - el.querySelector('.cinematic-frame').offsetHeight)
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), travel)
  await page.waitForFunction(
    (n) => +document.querySelector('canvas').dataset.frame === n,
    lastFrame,
  )
  const end = await page.locator('canvas').evaluate((el) => el.toDataURL())
  assert.notEqual(first, end, 'Camera must change the actual rendered frame')
  await page.waitForTimeout(650)
  await page.screenshot({ path: `${output}/${name}-arrival.png` })
  await page.getByRole('link', { name: 'hareb digital. · Startseite', exact: true }).first().focus()
  assert.equal(
    (await geometry()).headerTop,
    0,
    'Keyboard focus brings the navigation back during the film',
  )
  await page
    .locator('.brand-link')
    .first()
    .evaluate((el) => el.blur())
  assert.equal(
    (await scrollTo(travel + viewport.height)).headerTop,
    0,
    'Navigation returns after leaving the hero, including large scroll jumps',
  )
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForFunction(() => document.querySelector('canvas').dataset.frame === '0')
  assert.equal(
    await page.locator('canvas').evaluate((el) => el.toDataURL()),
    first,
    'Reverse scroll returns to the first camera position',
  )
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await page.waitForTimeout(650)
  const modal = page.getByRole('dialog')
  assert(await modal.isVisible())
  assert(
    await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)),
    'Focus enters menu',
  )
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab')
  assert(
    await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)),
    'Native modal traps keyboard focus',
  )
  await page.screenshot({ path: `${output}/${name}-menu.png` })
  await page.keyboard.press('Escape')
  await modal.waitFor({ state: 'hidden' })
  assert.equal(await page.evaluate(() => document.documentElement.style.overflow), '')
  assert.equal(
    await page
      .getByRole('button', { name: 'Menü öffnen' })
      .evaluate((el) => el === document.activeElement),
    true,
  )
  await page.getByRole('button', { name: 'Animation ausschalten' }).click()
  assert.equal(await page.locator('.cinematic-stage').getAttribute('data-motion'), 'false')
  assert.equal(await page.locator('canvas').getAttribute('data-ready'), null)
  assert.equal(errors.length, 0, errors.join('\n'))
  results.push({
    name,
    reversibleFullscreen: true,
    immediateExpansion: true,
    navigationReturn: true,
    keyboardNavigationDuringFilm: true,
    reversibleCameraFrames: true,
    boundedFrameLoading: true,
    modalFocus: true,
    escapeRestoresFocus: true,
    motionOff: true,
  })
  await page.close()
}
for (const mode of ['reduced-motion', 'save-data']) {
  const context = await browser.newContext({
    reducedMotion: mode === 'reduced-motion' ? 'reduce' : 'no-preference',
  })
  if (mode === 'save-data')
    await context.addInitScript(() =>
      Object.defineProperty(navigator, 'connection', { value: { saveData: true } }),
    )
  const page = await context.newPage()
  const frameRequests = []
  page.on('request', (r) => {
    if (r.url().includes('/sequence/')) frameRequests.push(r.url())
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(frameRequests.length, 0, `${mode} must not fetch motion frames`)
  assert.equal(await page.locator('.cinematic-stage').getAttribute('data-motion'), 'false')
  results.push({ mode, noFrameDownloads: true })
  await context.close()
}
await fs.writeFile(`${output}/motion.json`, JSON.stringify(results, null, 2))
await browser.close()
console.log(
  'PASS: continuous fullscreen expansion and reversal, viewport coverage, navigation recovery, real camera frames, menu focus, Escape, pause, reduced motion and Save-Data.',
)
