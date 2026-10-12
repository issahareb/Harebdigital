import { chromium } from 'playwright'
import assert from 'node:assert/strict'
const base = process.env.SEO_BASE_URL || 'http://localhost:3000'
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
})
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const requests = []
  page.on('request', (r) => {
    if (r.url().includes('hareb-digital-final-v5.mp4')) requests.push(r.url())
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  const video = page.locator('.motion-showcase video')
  assert.equal(
    await video.getAttribute('src'),
    null,
    'No film download before the section is reached',
  )
  assert.equal(requests.length, 0)
  await video.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => {
    const v = document.querySelector('.motion-showcase video')
    return !v.paused && v.currentTime > 0.1
  })
  assert.equal(
    await video.evaluate(
      (v) => v.muted && v.loop && v.playsInline && !v.controls,
    ),
    true,
  )
  await page
    .getByRole('button', { name: 'Ton einschalten', exact: true })
    .click()
  assert.equal(await video.evaluate((v) => v.muted), false)
  await page
    .getByRole('button', { name: 'Ton ausschalten', exact: true })
    .click()
  await video.evaluate((v) => {
    v.currentTime = v.duration - 0.15
  })
  await page.waitForFunction(
    () => document.querySelector('.motion-showcase video').currentTime < 1.5,
  )
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForFunction(
    () => document.querySelector('.motion-showcase video').paused,
  )
  await video.scrollIntoViewIfNeeded()
  await page.waitForFunction(
    () => !document.querySelector('.motion-showcase video').paused,
  )
  await page
    .getByRole('button', { name: 'Film pausieren', exact: true })
    .click()
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await video.scrollIntoViewIfNeeded()
  assert.equal(
    await video.evaluate((v) => v.paused),
    true,
    'Manual pause persists after leaving and returning',
  )
  const reduced = await browser.newPage({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  })
  await reduced.goto(base, { waitUntil: 'networkidle' })
  await reduced.locator('.motion-showcase video').scrollIntoViewIfNeeded()
  assert.equal(
    await reduced.locator('.motion-showcase video').getAttribute('src'),
    null,
    'Reduced motion requires a deliberate play',
  )
  await reduced
    .getByRole('button', { name: 'Film abspielen', exact: true })
    .click()
  await reduced.waitForFunction(
    () => !document.querySelector('.motion-showcase video').paused,
  )

  // Simulate provider responses in the browser; no email is sent by this test.
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: route.request().method() === 'GET' ? 200 : 502,
      json:
        route.request().method() === 'GET'
          ? { available: true }
          : { ok: false, code: 'DELIVERY' },
    })
  })
  await page.goto(`${base}/kontakt/?leistung=social-media-ads`, {
    waitUntil: 'networkidle',
  })
  assert.equal(await page.locator('#leistung').inputValue(), 'social-media-ads')
  await page.locator('#name').fill('QA Test')
  await page.locator('#epost').fill('qa@example.com')
  await page.locator('#nachricht').fill('Eine Testanfrage für Social Media.')
  await page
    .getByRole('button', { name: 'Anfrage senden', exact: true })
    .click()
  await page.locator('.form-status[data-error="true"]').waitFor()
  assert.equal(
    await page.locator('#nachricht').inputValue(),
    'Eine Testanfrage für Social Media.',
  )
  await page.unroute('**/api/contact')
  await page.route('**/api/contact', (route) =>
    route.fulfill({ json: { ok: true } }),
  )
  await page
    .getByRole('button', { name: 'Anfrage senden', exact: true })
    .click()
  await page.locator('.form-status[data-error="false"]').waitFor()
  assert.equal(
    await page
      .getByRole('button', { name: 'Anfrage senden', exact: true })
      .isDisabled(),
    true,
  )
  console.log(
    'PASS: local lazy video, inline muted autoplay, loop, sound toggle, offscreen pause/resume, manual pause, reduced-motion play, contact failure retention and confirmed success UI.',
  )
} finally {
  await browser.close()
}
