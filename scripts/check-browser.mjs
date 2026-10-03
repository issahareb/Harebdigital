import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
const output = process.env.QA_OUTPUT_DIR || 'artifacts/qa'
const base = process.env.SEO_BASE_URL || 'http://localhost:3000'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const summary = []
for (const [name, viewport, url] of [
  ['desktop', { width: 1440, height: 1000 }, '/'],
  ['mobile', { width: 390, height: 844 }, '/'],
  ['english', { width: 1440, height: 1000 }, '/en/'],
  ['service', { width: 1440, height: 1000 }, '/leistungen/neue-website/'],
  ['contact', { width: 390, height: 844 }, '/kontakt/?leistung=automatisierung'],
]) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(base + url, { waitUntil: 'networkidle' })
  for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 650) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y)
    await page.waitForTimeout(70)
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(200)
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: true })
  const metrics = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: [...document.querySelectorAll('h1')].map((x) => x.textContent),
    title: document.title,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    brokenImages: [...document.images]
      .filter((i) => i.complete && !i.naturalWidth)
      .map((i) => i.src),
  }))
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag21a'])
    .options({ rules: { 'label-content-name-mismatch': { enabled: true } } })
    .analyze()
  const result = {
    name,
    ...metrics,
    errors,
    violations: axe.violations.map((x) => ({
      id: x.id,
      impact: x.impact,
      description: x.description,
      nodes: x.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })).slice(0, 6),
    })),
  }
  summary.push(result)
  console.log(JSON.stringify(result))
  if (name === 'desktop') {
    await page.screenshot({ path: `${output}/desktop-hero.png` })
    await page.evaluate(() => scrollTo(0, 500))
    await page.waitForTimeout(200)
    console.log(
      'Motion',
      await page.locator('.hero-artwork').evaluate((el) => getComputedStyle(el).transform),
    )
    await page.screenshot({ path: `${output}/desktop-scroll.png` })
  }
  if (name === 'mobile') {
    await page.screenshot({ path: `${output}/mobile-hero.png` })
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    console.log('Mobile menu', await page.locator('#mobile-navigation').isVisible())
    await page.keyboard.press('Escape')
  }
  await context.close()
}
const page = await browser.newPage({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
})
await page.goto(base + '/es/')
console.log(
  'No JS Spanish',
  await page.locator('h1').textContent(),
  await page.locator('nav').count(),
)
const reduced = await browser.newPage({ reducedMotion: 'reduce' })
await reduced.goto(base + '/', { waitUntil: 'networkidle' })
await reduced.evaluate(() => scrollTo(0, 450))
console.log(
  'Reduced motion',
  await reduced.locator('.hero-artwork').evaluate((el) => getComputedStyle(el).transform),
)
await fs.writeFile(`${output}/audit.json`, JSON.stringify(summary, null, 2))
await browser.close()
assert(
  summary.every(
    (r) =>
      !r.errors.length &&
      !r.violations.length &&
      !r.brokenImages.length &&
      r.scrollWidth <= r.width,
  ),
  'Browser audit failed; inspect artifacts/qa/audit.json',
)
