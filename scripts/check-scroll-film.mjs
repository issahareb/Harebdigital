import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Exercise the actual component effect with controlled scroll and image timing.
// This catches frame holds, late-load reversals and work after unmount without
// relying on network speed or a browser's automated scrolling implementation.
const source = ts.transpileModule(fs.readFileSync('components/scroll-film.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText

for (const mobile of [false, true]) {
  let cleanup
  let top = 0
  let observer
  let nextRaf = 1
  const callbacks = new Map()
  const listeners = new Map()
  const pending = []
  const draws = []
  const style = { setProperty() {}, removeProperty() {} }
  const frame = { offsetHeight: 800 }
  const stage = {
    style, dataset: {}, offsetHeight: 3200,
    getBoundingClientRect: () => ({ top }),
    querySelector: () => frame, querySelectorAll: () => [],
  }
  const context = { globalAlpha: 1, drawImage(image) { draws.push([image.index, this.globalAlpha]) } }
  const surface = { dataset: {}, closest: () => stage, getContext: () => context }
  const document = {
    hidden: false, querySelector: () => ({ style, dataset: {} }),
    addEventListener: (event, fn) => listeners.set(event, fn),
    removeEventListener: (event) => listeners.delete(event),
  }
  class Image {
    set src(url) { this.index = Number(url.match(/(\d+)\.webp$/)[1]) - 1; pending.push(this) }
    async decode() { this.decoded = true }
  }
  const module = { exports: {} }
  vm.runInNewContext(source, {
    exports: module.exports,
    require: (name) => name === 'react' ? {
      useRef: () => ({ current: surface }), useEffect: (effect) => { cleanup = effect() },
    } : { jsx: () => null },
    Image, document, matchMedia: () => ({ matches: mobile }),
    window: {
      addEventListener: (event, fn) => listeners.set(event, fn),
      removeEventListener: (event) => listeners.delete(event),
    },
    IntersectionObserver: class {
      constructor(callback) { observer = callback }
      observe() {} disconnect() {}
    },
    requestAnimationFrame: (fn) => { const id = nextRaf++; callbacks.set(id, fn); return id },
    cancelAnimationFrame: (id) => callbacks.delete(id),
  })
  module.exports.ScrollFilm({ enabled: true })
  const tick = () => { const batch = [...callbacks.values()]; callbacks.clear(); batch.forEach(fn => fn()) }
  const load = async () => {
    while (pending.length) {
      assert(pending.length <= 4, 'Decode/load concurrency stays bounded')
      const batch = pending.splice(0)
      await Promise.all(batch.map(image => image.onload()))
    }
    tick()
  }
  const scroll = (position) => {
    top = -position * 2400 / (mobile ? 149 : 179)
    listeners.get('scroll')()
    tick()
  }
  observer([{ isIntersecting: true }])
  tick()
  await load()
  assert.equal(surface.dataset.position, '0')
  scroll(10)
  await load()
  const samples = []
  for (const fraction of [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) {
    draws.length = 0
    scroll(10 + fraction)
    assert.equal(draws.length, 2, 'Slow scroll blends both images on every step')
    assert.equal(draws[0][0], 10)
    assert.equal(draws[1][0], 11)
    assert(Math.abs(draws[1][1] - fraction) < 1e-10)
    assert.equal(context.globalAlpha, 1, 'Alpha cannot leak into the next frame')
    samples.push(surface.dataset.position)
  }
  assert.equal(new Set(samples).size, 9, 'No held integer frames inside one interval')
  scroll(10.3)
  assert(Math.abs(+surface.dataset.position - 10.3) < 1e-10, 'Reverse scroll restores fractional camera position')
  scroll(mobile ? 149 : 179)
  await load()
  assert.equal(+surface.dataset.frame, mobile ? 149 : 179, 'Exact last frame remains reachable')
  const beforeHidden = draws.length
  document.hidden = true
  listeners.get('visibilitychange')()
  tick()
  assert.equal(draws.length, beforeHidden)
  document.hidden = false
  observer([{ isIntersecting: false }])
  scroll(20.5)
  assert.equal(draws.length, beforeHidden, 'Offscreen loading cannot repaint the canvas')
  cleanup()
  assert.equal(callbacks.size, 0)
  assert.equal(surface.dataset.ready, undefined)
  assert.equal(listeners.size, 0)
  console.log(`PASS ${mobile ? 'mobile' : 'desktop'}: continuous subframes, reversal, bounded loading, endpoints, hidden/offscreen and cleanup`)
}
