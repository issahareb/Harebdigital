import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'

const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3001'
const output = process.env.QA_OUTPUT_DIR || 'artifacts/qa/offers'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const errors = []
try {
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: true })
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(base, { waitUntil: 'networkidle' })
    const decline = page.getByRole('button', { name: 'Ablehnen / widerrufen', exact: true })
    if (await decline.isVisible()) await decline.click()
    const shot = async (locator, path) => locator.screenshot({ path, style: '* { animation: none !important; transition: none !important; } .site-header, .skip-link, [data-track-ignore] { visibility: hidden !important; }' })
    const offers = page.locator('#angebote')
    const voice = page.locator('#ki-telefonie')
    assert(await voice.evaluate(element => Boolean(element.compareDocumentPosition(document.querySelector('#arbeiten')) & Node.DOCUMENT_POSITION_FOLLOWING)), 'Voice precedes work')
    assert(await offers.evaluate(element => Boolean(element.compareDocumentPosition(document.querySelector('#leistungen')) & Node.DOCUMENT_POSITION_FOLLOWING)), 'Offers precede detailed services')
    await voice.getByRole('button', { name: 'Per E-Mail', exact: true }).click()
    assert(await voice.getByText('Neue Telefonanfrage', { exact: true }).isVisible())
    await voice.getByRole('button', { name: 'Beides', exact: true }).click()
    assert(await voice.getByText('Rückruf zur Website', { exact: true }).isVisible())
    assert(await voice.getByText('Neue Telefonanfrage', { exact: true }).isVisible())
    assert((await voice.locator('#lukas-demo-anrufen').getAttribute('href')).startsWith('tel:'))
    await voice.getByRole('button', { name: 'Dein Dashboard', exact: true }).click()
    await shot(voice, `${output}/voice-${width}.png`)
    await offers.scrollIntoViewIfNeeded()
    for (let index = 0; index < 4; index++) {
      await offers.getByRole('tab').nth(index).click()
      const panel = offers.getByRole('tabpanel')
      assert.equal(await panel.count(), 1)
      assert((await panel.innerText()).includes(['490 €', '890 €', '190 €', '590 €'][index]))
      assert((await panel.getByRole('link').getAttribute('href')).endsWith(`angebot=${index}`))
      const visual = panel.locator('[class*=visual]').first()
      const mock = panel.locator('[class*=sitePreview]')
      if (await mock.count()) {
        const bounds = await mock.boundingBox()
        const top = await visual.locator('[class*=visualTop]').boundingBox()
        const bottom = await visual.locator('[class*=visualBottom]').boundingBox()
        assert(bounds.y > top.y + top.height, `Preview clears its top label ${JSON.stringify({width,index,bounds,top,bottom})}`)
        assert(bounds.y + bounds.height < bottom.y, `Preview clears its bottom label ${JSON.stringify({width,index,bounds,top,bottom})}`)
      }
      assert(await offers.evaluate(el => el.scrollWidth <= el.clientWidth + 2), `Gallery overflow at ${width}`)
    }
    await offers.getByRole('tab').nth(2).click()
    await offers.getByRole('button', { name: 'Beispieltag 17', exact: true }).click()
    await offers.getByRole('button', { name: '11:30', exact: true }).click()
    assert(await offers.getByText('Tag 17 · 11:30 Uhr ausgewählt', { exact: true }).isVisible())
    await shot(offers, `${output}/calendar-${width}.png`)
    await offers.getByRole('tab').nth(0).click()
    await shot(offers, `${output}/gallery-${width}.png`)
    await offers.getByRole('tab').nth(0).focus()
    await page.keyboard.press('ArrowRight')
    assert.equal(await offers.getByRole('tab').nth(1).getAttribute('aria-selected'), 'true')
    await page.keyboard.press('End')
    assert.equal(await offers.getByRole('tab').nth(3).getAttribute('aria-selected'), 'true')
    await offers.getByRole('button', { name: 'Nächstes Angebot', exact: true }).click()
    assert.equal(await offers.getByRole('tab').nth(0).getAttribute('aria-selected'), 'true')
    const stage = offers.getByRole('tabpanel')
    await stage.evaluate(el => {
      el.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [new Touch({ identifier: 1, target: el, clientX: 260, clientY: 300 })] }))
      el.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [new Touch({ identifier: 1, target: el, clientX: 80, clientY: 305 })] }))
    })
    assert.equal(await offers.getByRole('tab').nth(1).getAttribute('aria-selected'), 'true', 'Swipe changes offer')
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Page overflow at ${width}`)

    const idea = page.locator('.idea-reveal')
    const position = await idea.evaluate(el => el.getBoundingClientRect().top + scrollY)
    const seek = async fraction => {
      await page.evaluate(({ position, fraction }) => scrollTo({ top: position - innerHeight * fraction, behavior: 'instant' }), { position, fraction })
      await page.waitForTimeout(180)
      return idea.locator('.idea-word').first().evaluate(el => Number(getComputedStyle(el).opacity))
    }
    assert((await seek(.95)) < .01, `Reveal resets below viewport: ${await idea.evaluate(el => JSON.stringify({top:el.getBoundingClientRect().top,scrollY,height:innerHeight,animations:el.querySelector('.idea-word').getAnimations().map(a=>({state:a.playState,time:a.currentTime}))}))}`)
    assert((await seek(.35)) > .99, 'Reveal completes as it enters')
    const gaps = await idea.locator('.idea-line').first().evaluate(el => {
      const words = [...el.querySelectorAll('.idea-word-mask')]
      return words.slice(1).map((word, i) => word.getBoundingClientRect().left - words[i].getBoundingClientRect().right)
    })
    assert(gaps.every(gap => gap > 2), `Visible word spaces: ${gaps}`)
    assert((await seek(.95)) < .01, 'Back scrolling resets reveal')
    assert((await seek(.35)) > .99, 'Reveal replays after back scrolling')
    await idea.screenshot({ path: `${output}/idea-${width}.png` })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    assert((await seek(.95)) > .99, 'Reduced motion keeps text visible')

    await page.goto(`${base}/kontakt/?leistung=automatisierung&angebot=2`)
    assert((await page.locator('#nachricht').inputValue()).includes('Terminwidget für 190 €'))
    await page.goto(`${base}/kontakt/?leistung=automatisierung&angebot=ki-telefonie`)
    assert((await page.locator('#nachricht').inputValue()).includes('eigenem Dashboard'))
    assert.equal(await page.locator('#leistung').inputValue(), 'automatisierung')
    console.log(`PASS ${width}px: gallery, calendar, swipe, keyboard, voice routing, enquiry prefill, reversible motion and word spacing`)
    await page.close()
  }
  for (const [locale, word] of [['en', 'own dashboard'], ['es', 'panel propio']]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
    await page.goto(`${base}/${locale}/kontakt/?leistung=automatisierung&angebot=ki-telefonie`)
    assert((await page.locator('#nachricht').inputValue()).includes(word))
    await page.goto(`${base}/${locale}/`)
    assert.equal(await page.locator('#ki-telefonie').count(), 1)
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    await page.close()
  }
  assert.deepEqual(errors, [])
  console.log('PASS translated voice offers and enquiry messages; no browser exceptions')
} finally { await browser.close() }
