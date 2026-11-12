import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

async function load(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const { addDays, dateKey, demoSlots, isBookable, trades } = await load('../lib/booking-demo.ts')
const { readProjectBrief, PROJECT_BRIEF_LIMIT } = await load('../lib/project-brief.ts')
// Thursday before a weekend; the upper boundary crosses both a month and a year.
const today = new Date('2026-11-12T12:00:00')
assert.equal(isBookable('2026-11-12', today), false, 'same-day appointments must not be offered')
assert.equal(isBookable('2026-11-11', today), false, 'past appointments must not be offered')
assert.equal(isBookable('2026-11-13', today), true)
assert.equal(isBookable('2026-11-14', today), false, 'Saturday')
assert.equal(isBookable('2026-11-15', today), false, 'Sunday')
assert.equal(isBookable('2026-11-16', today), true)
assert.equal(isBookable('2027-01-11', today), true, 'day 60 is selectable')
assert.equal(isBookable('2027-01-12', today), false, 'day 61 is outside the booking window')
assert.equal(isBookable('2026-11-31', today), false, 'invalid dates must not roll into another month')
assert.equal(isBookable('invalid', today), false)
for (const trade of trades) for (const service of trade.services) for (let day = 1; day <= 60; day++) {
  const date = dateKey(addDays(today, day))
  if (!isBookable(date, today)) continue
  const available = demoSlots(date, service.duration).filter(slot => !slot.disabled)
  assert.ok(available.length >= 1, `${trade.label}: no selectable slots on ${date}`)
  for (const slot of available) {
    const [hours, minutes] = slot.value.split(':').map(Number)
    assert.ok(hours * 60 + minutes + service.duration <= 17 * 60, 'appointment cannot end after closing')
  }
}
assert.equal(demoSlots('2026-11-13', 120).find(slot => slot.value === '16:00').disabled, true)
assert.equal(demoSlots('2026-11-13', 60).find(slot => slot.value === '16:00').disabled, false)
const brief = 'Branche: Handwerk\nZiel: Termine\nFunktionen: Kalender & Dashboard\nIdee: Küche ✓'
assert.equal(readProjectBrief(new URLSearchParams(`projekt=${encodeURIComponent(brief)}`).get('projekt')), brief)
assert.equal(readProjectBrief(null), '')
assert.equal(readProjectBrief('\u0000Text\nZeile'), 'Text\nZeile')
assert.equal(readProjectBrief('a'.repeat(3000)).length, PROJECT_BRIEF_LIMIT)
const demo = await readFile(new URL('../components/handwerker-demo.tsx', import.meta.url), 'utf8')
assert.ok(!/\bfetch\s*\(|\blocalStorage\b|\bsessionStorage\b/.test(demo), 'demo must not send or persist customer data')
assert.ok(/data-demo-form="true" data-track-ignore/.test(demo), 'demo must not be counted as a real enquiry form')
console.log('OK: booking boundaries, weekends, year transition, service duration, available slots, brief handoff and demo isolation.')
