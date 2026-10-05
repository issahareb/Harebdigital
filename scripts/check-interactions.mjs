import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
const output = process.env.QA_OUTPUT_DIR || 'artifacts/qa'
const base = process.env.SEO_BASE_URL || 'http://localhost:3000'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch()
const results = []
for (const width of [320, 390, 768, 1920]) {
  for (const locale of ['', 'en/', 'es/']) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } })
    const p = await ctx.newPage()
    await p.goto(base + '/' + locale, { waitUntil: 'networkidle' })
    const check = await p.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      heroHeight: document.querySelector('.cinematic-frame').clientHeight,
      actionsBottom: document.querySelector('.hero-actions').getBoundingClientRect().bottom,
      heroBottom: document.querySelector('.hero-bottomline').getBoundingClientRect().top,
    }))
    assert(check.scroll <= check.width, `${locale} ${width}: horizontal overflow`)
    assert(check.actionsBottom < check.heroBottom, `${locale} ${width}: hero actions collide`)
    results.push({ locale: locale || 'de', width, passed: true })
    await ctx.close()
  }
}
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
const p = await ctx.newPage()
await p.goto(base + '/', { waitUntil: 'networkidle' })
await p.keyboard.press('Tab')
assert.equal(await p.locator('.skip-link').evaluate((el) => el === document.activeElement), true)
await p.keyboard.press('Enter')
assert.equal(await p.evaluate(() => location.hash), '#main')
await p.getByRole('button', { name: 'Menü öffnen' }).click()
await p
  .getByRole('navigation', { name: 'Menü öffnen' })
  .getByRole('link', { name: '03 Studio' })
  .click()
assert.equal(await p.locator('#mobile-navigation').isVisible(), false)
await p.waitForTimeout(600)
assert((await p.locator('#studio').boundingBox()).y >= 60, 'Anchor clears sticky navigation')
await p.locator('#faq summary').nth(1).click()
assert.equal(await p.locator('#faq details').nth(1).getAttribute('open'), '')
await p.goto(base + '/kontakt/?leistung=automatisierung', { waitUntil: 'networkidle' })
assert.equal(await p.locator('#leistung').inputValue(), 'automatisierung')
assert.equal(await p.locator('form').evaluate((el) => el.checkValidity()), false)
await p.locator('#nachricht').fill('Bitte meine Buchungsanfragen automatisieren.')
assert.equal(await p.locator('form').evaluate((el) => el.checkValidity()), true)
assert.equal(
  await p.getByRole('link', { name: 'English', exact: true }).getAttribute('href'),
  '/en/kontakt/?leistung=automatisierung',
)
await p.getByRole('link', { name: 'English', exact: true }).click()
await p.waitForURL('**/en/kontakt/?leistung=automatisierung')
assert.equal(await p.locator('#leistung').inputValue(), 'automatisierung')
await p.goto(base + '/')
await p.getByRole('button', { name: 'Animation ausschalten' }).click()
assert.equal(await p.locator('.cinematic-stage').getAttribute('data-motion'), 'false')
await p.evaluate(() => scrollTo(0, 350))
await p.waitForTimeout(100)
assert.equal(
  await p.locator('.hero-artwork').evaluate((el) => getComputedStyle(el).transform),
  'none',
)
await ctx.close()
await fs.writeFile(
  `${output}/interactions.json`,
  JSON.stringify(
    {
      viewports: results,
      keyboard: true,
      mobileMenu: true,
      anchor: true,
      faq: true,
      servicePreselection: true,
      nativeFormValidation: true,
      languageQueryRetention: true,
      motionToggle: true,
    },
    null,
    2,
  ),
)
console.log(
  'PASS: 12 viewport/locale combinations, keyboard skip link, mobile navigation, anchor offset, FAQ, form validation, service preselection, language switch query and motion toggle.',
)
await browser.close()
