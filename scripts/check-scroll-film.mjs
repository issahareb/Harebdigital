import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText

// Verify actual scene upload and rendering: geometry never changes, even as the
// camera moves, reverses, idles or resizes. No browser or network timing involved.
const sceneModule = { exports: {} }
vm.runInNewContext(compile('lib/hero-scene.ts'), { exports: sceneModule.exports, window: { devicePixelRatio: 3 } })
let uploads = 0, draws = 0, freed = 0
const cameras = []
const gl = new Proxy({
  createProgram: () => ({}), createShader: () => ({}), createBuffer: () => ({}),
  getShaderParameter: () => true, getProgramParameter: () => true,
  getAttribLocation: () => 0, getUniformLocation: (_, name) => name,
  bufferData: (_, vertices) => { uploads++; assert(vertices.length > 0); assert([...vertices].every(Number.isFinite)) },
  uniform3f: (_, ...values) => cameras.push(values),
  drawArrays: () => draws++, deleteBuffer: () => freed++, deleteProgram: () => freed++, deleteShader: () => freed++,
}, { get: (target, key) => key in target ? target[key] : /^[A-Z_]+$/.test(key) ? 1 : () => {} })
const canvas = { clientWidth: 390, clientHeight: 844, getContext: name => { assert.equal(name, 'webgl'); return gl } }
const scene = sceneModule.exports.createHeroScene(canvas)
for (const progress of [0, 0.1234, 0.8, 0.4, 1, 0]) scene.render(progress, 0)
assert.equal(uploads, 1, 'Static mesh is uploaded once')
assert.equal(draws, 6)
assert.deepEqual(cameras[0], cameras[5], 'Reverse scroll returns to identical world coordinates')
assert(cameras[2][2] < cameras[3][2], 'Reverse moves the camera back, not the geometry')
assert.equal(canvas.width, 780, 'Retina mobile canvas is not a 448px bitmap')
assert.equal(canvas.height, 1688)
canvas.clientWidth = 3840; canvas.clientHeight = 2160
scene.render(0, 10)
assert(canvas.width * canvas.height < 5010000, 'High-DPI fill rate has a fixed pixel budget')
assert.equal(uploads, 1, 'Resize does not rebuild meshes')
assert(Math.abs(cameras.at(-1)[0] - cameras[0][0]) < 0.04, 'Idle camera movement is bounded')
scene.dispose(); assert.equal(freed, 4)
assert.equal(sceneModule.exports.createHeroScene({ getContext: () => null }), null)
console.log('PASS: immutable geometry, retina sizing, pixel budget, camera reversal, bounded drift, disposal and unsupported WebGL')

let cleanup, observer, top = 0, nextRaf = 1, disposed = false
const callbacks = new Map(), listeners = new Map(), renders = []
const style = { setProperty() {}, removeProperty() {} }
const frame = { offsetHeight: 800 }
const stage = { style, dataset: {}, offsetHeight: 3200, getBoundingClientRect: () => ({ top }), querySelector: () => frame, querySelectorAll: () => [] }
const surface = { dataset: {}, closest: () => stage, addEventListener() {}, removeEventListener() {} }
const document = { hidden: false, querySelector: () => ({ style, dataset: {} }), addEventListener: (e, fn) => listeners.set(e, fn), removeEventListener: e => listeners.delete(e) }
const module = { exports: {} }
vm.runInNewContext(compile('components/scroll-film.tsx'), {
  exports: module.exports,
  require: name => name === 'react' ? { useRef: () => ({ current: surface }), useEffect: effect => { cleanup = effect() } }
    : name.includes('hero-scene') ? { createHeroScene: () => ({ render: (...args) => renders.push(args), dispose: () => { disposed = true } }) } : { jsx: () => null },
  document, window: { addEventListener: (e, fn) => listeners.set(e, fn), removeEventListener: e => listeners.delete(e) },
  IntersectionObserver: class { constructor(fn) { observer = fn } observe() {} disconnect() {} },
  requestAnimationFrame: fn => { const id = nextRaf++; callbacks.set(id, fn); return id }, cancelAnimationFrame: id => callbacks.delete(id),
})
module.exports.ScrollFilm({ enabled: true })
let time = 0
const tick = (n = 1) => { for (let i = 0; i < n; i++) { time += 1000 / 60; const batch = [...callbacks.values()]; callbacks.clear(); batch.forEach(fn => fn(time)) } }
observer([{ isIntersecting: true }]); tick()
assert.equal(surface.dataset.ready, 'true')
assert.equal(callbacks.size, 1, 'One animation loop')
top = -1200; listeners.get('scroll')(); tick(60)
assert.equal(+surface.dataset.position, 0.5)
top = -600; listeners.get('scroll')(); tick(60)
assert.equal(+surface.dataset.position, 0.25)
const beforeIdle = renders.length; tick(10)
assert.equal(renders.length, beforeIdle + 10, 'Idle camera continues at native refresh cadence')
assert.equal(callbacks.size, 1)
document.hidden = true; listeners.get('visibilitychange')(); tick()
assert.equal(callbacks.size, 0); assert.equal(stage.dataset.filmVisible, 'false')
const hiddenCount = renders.length; tick(5); assert.equal(renders.length, hiddenCount)
document.hidden = false; listeners.get('visibilitychange')(); tick()
assert.equal(callbacks.size, 1)
observer([{ isIntersecting: false }]); tick(); assert.equal(callbacks.size, 0)
cleanup(); assert(disposed); assert.equal(surface.dataset.ready, undefined); assert.equal(listeners.size, 0)
console.log('PASS: smooth forward/reverse scroll, idle motion, single loop, hidden/offscreen pause and cleanup')
