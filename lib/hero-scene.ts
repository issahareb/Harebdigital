/** Fixed architectural geometry. Only the camera moves; no video interpolation,
 * morphing, texture downloads, or per-frame geometry allocations. */
type V3 = [number, number, number]

export function createHeroScene(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: true, depth: true, powerPreference: 'default' })
  if (!gl) return null
  const vertex = `
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec3 color;
    attribute float emission;
    uniform mat4 projection;
    uniform vec3 camera;
    varying vec3 vNormal;
    varying vec3 vColor;
    varying vec3 vPosition;
    varying float vEmission;
    varying float vDepth;
    void main() {
      vec3 p = position - camera;
      gl_Position = projection * vec4(p, 1.0);
      vDepth = -p.z;
      vNormal = normal;
      vColor = color;
      vPosition = position;
      vEmission = emission;
    }`
  const fragment = `
    precision highp float;
    varying vec3 vNormal;
    varying vec3 vColor;
    varying vec3 vPosition;
    varying float vEmission;
    varying float vDepth;
    void main() {
      vec3 n = normalize(vNormal);
      float sky = max(dot(n, normalize(vec3(-0.4, 1.0, 0.35))), 0.0);
      float fill = max(dot(n, normalize(vec3(0.9, 0.3, -0.6))), 0.0);
      vec3 lit = vColor * (0.30 + sky * 0.70 + fill * 0.18);
      float strip = exp(-abs(abs(vPosition.x) - 2.65) * 2.6)
        * exp(-abs(vPosition.y - 0.18) * 1.9);
      lit += vec3(0.30, 0.44, 0.05) * strip * 0.34;
      lit = mix(lit, vColor * 1.25, vEmission);
      float fog = 1.0 - exp(-max(vDepth, 0.0) * 0.016);
      lit = mix(lit, vec3(0.21, 0.23, 0.20), fog);
      gl_FragColor = vec4(lit, 1.0);
    }`
  const shaders: WebGLShader[] = []
  const program = gl.createProgram()
  if (!program) return null
  for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
    const shader = gl.createShader(type)
    if (!shader) { gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s)); return null }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    shaders.push(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return null
    }
    gl.attachShader(program, shader)
  }
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return null
  }
  const vertices: number[] = []
  function box(center: V3, size: V3, color: V3, emission = 0) {
    const [x, y, z] = center, [w, h, d] = size.map(n => n / 2)
    const faces: [V3, V3[]][] = [
      [[0, 0, 1], [[x-w,y-h,z+d],[x+w,y-h,z+d],[x+w,y+h,z+d],[x-w,y+h,z+d]]],
      [[0, 0, -1], [[x+w,y-h,z-d],[x-w,y-h,z-d],[x-w,y+h,z-d],[x+w,y+h,z-d]]],
      [[1, 0, 0], [[x+w,y-h,z+d],[x+w,y-h,z-d],[x+w,y+h,z-d],[x+w,y+h,z+d]]],
      [[-1, 0, 0], [[x-w,y-h,z-d],[x-w,y-h,z+d],[x-w,y+h,z+d],[x-w,y+h,z-d]]],
      [[0, 1, 0], [[x-w,y+h,z+d],[x+w,y+h,z+d],[x+w,y+h,z-d],[x-w,y+h,z-d]]],
      [[0, -1, 0], [[x-w,y-h,z-d],[x+w,y-h,z-d],[x+w,y-h,z+d],[x-w,y-h,z+d]]],
    ]
    for (const [normal, corners] of faces) {
      for (const i of [0, 1, 2, 0, 2, 3]) vertices.push(...corners[i], ...normal, ...color, emission)
    }
  }
  const cream: V3 = [0.78, 0.75, 0.66]
  const metal: V3 = [0.28, 0.30, 0.28]
  const edge: V3 = [0.47, 0.49, 0.43]
  const lime: V3 = [0.72, 0.96, 0.30]
  // Continuous walls, tiled floor and ceiling have physical dimensions.
  box([0, -0.18, -25], [7.5, 0.3, 76], [0.48, 0.48, 0.42])
  box([-3.3, 2.5, -25], [0.5, 5.4, 76], [0.13, 0.16, 0.15])
  box([3.3, 2.5, -25], [0.5, 5.4, 76], cream)
  box([0, 5.1, -25], [7.5, 0.3, 76], cream)
  box([0, 2.5, -62], [7, 5, 0.4], [0.23, 0.27, 0.23])
  for (let i = 0; i < 22; i++) {
    const z = 8 - i * 3.2
    // Brushed metal portal frames: every vertex stays fixed for the entire visit.
    for (const side of [-1, 1]) {
      box([side * 2.7, 2.45, z], [0.16, 4.9, 0.22], metal)
      box([side * 2.6, 2.45, z + 0.12], [0.025, 4.9, 0.025], edge)
      box([side * 2.64, 0.2, z - 1.5], [0.035, 0.045, 3.0], lime, 1)
      // Wall panel reveals, with consistent thickness rather than drawn lines.
      box([side * 3.02, 2.5, z], [0.025, 5.0, 0.035], metal)
    }
    box([0, 4.85, z], [5.55, 0.16, 0.22], metal)
    box([0, 4.75, z + 0.12], [5.25, 0.025, 0.025], edge)
    box([0, -0.018, z], [6.05, 0.012, 0.025], [0.25, 0.27, 0.24])
    // A shallow, static contact shadow anchors each portal to the floor.
    box([0.14, -0.012, z - 0.18], [5.65, 0.008, 0.26], [0.33, 0.35, 0.30])
    if (i % 3 === 0) box([0.9, 4.91, z - 1.5], [1.25, 0.025, 1.35], [0.89, 0.91, 0.78], 0.65)
  }
  // Floor joints recede towards the same vanishing point as the architecture.
  for (const x of [-1.8, 0, 1.8]) box([x, -0.017, -25], [0.015, 0.012, 76], [0.31, 0.33, 0.28])
  const buffer = gl.createBuffer()
  if (!buffer) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return null }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  gl.useProgram(program)
  for (const [name, size, offset] of [['position', 3, 0], ['normal', 3, 12], ['color', 3, 24], ['emission', 1, 36]] as const) {
    const location = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 40, offset)
  }
  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(0.21, 0.23, 0.20, 1)
  const projection = gl.getUniformLocation(program, 'projection')
  const camera = gl.getUniformLocation(program, 'camera')
  const matrix = new Float32Array(16)
  const count = vertices.length / 10
  let width = 0, height = 0
  return {
    render(progress: number, elapsed: number) {
      const cssWidth = canvas.clientWidth, cssHeight = canvas.clientHeight
      // Retina rendering, bounded by pixel area to protect mobile fill rate.
      const ratio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(5000000 / Math.max(1, cssWidth * cssHeight)))
      const w = Math.max(1, Math.round(cssWidth * ratio)), h = Math.max(1, Math.round(cssHeight * ratio))
      if (w !== width || h !== height) {
        width = canvas.width = w; height = canvas.height = h
        gl.viewport(0, 0, w, h)
        const f = 1 / Math.tan(48 * Math.PI / 360), near = 0.08, far = 100
        matrix[0] = f / (w / h); matrix[5] = f
        matrix[10] = (far + near) / (near - far); matrix[11] = -1
        matrix[14] = 2 * far * near / (near - far)
        gl.uniformMatrix4fv(projection, false, matrix)
      }
      // Small, bounded dolly drift at rest; the scene itself never deforms.
      gl.uniform3f(camera, 0.24 + Math.sin(elapsed * 0.20) * 0.018, 1.78 + Math.sin(elapsed * 0.15) * 0.006, 10 - progress * 32 + Math.sin(elapsed * 0.12) * 0.035)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, count)
    },
    dispose() {
      gl.deleteBuffer(buffer)
      shaders.forEach(shader => gl.deleteShader(shader))
      gl.deleteProgram(program)
    },
  }
}
