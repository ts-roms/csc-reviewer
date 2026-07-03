// Inline-SVG figures for the Logical Reasoning section.
//
// Every graphic here is authored in-repo as a static SVG string (no external
// image files, no network) so the app stays fully self-contained and works
// offline. These strings are rendered via dangerouslySetInnerHTML in <Figure>;
// that is safe precisely because the content is trusted, repo-authored markup —
// never user input.

const NAVY = '#134074'
const AXIS = '#6b7785'
const INK = '#1b2430'
const BAR = '#1d6fb8'
const GOLD = '#f2b705'
const GREEN = '#2a9d4a'
const RED = '#c1121f'

const svg = (viewBox, inner, w) =>
  `<svg viewBox="${viewBox}" width="${w}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`

// ---- Data-interpretation charts -------------------------------------------

// Monthly sales: Jan 40, Feb 25, Mar 55, Apr 30 (values labelled on the bars).
export const salesBarChart = svg(
  '0 0 300 175',
  `
  <line x1="34" y1="140" x2="286" y2="140" stroke="${AXIS}" stroke-width="1.5"/>
  <line x1="34" y1="18" x2="34" y2="140" stroke="${AXIS}" stroke-width="1.5"/>
  <rect x="48" y="60" width="36" height="80" fill="${BAR}"/>
  <rect x="108" y="90" width="36" height="50" fill="${BAR}"/>
  <rect x="168" y="30" width="36" height="110" fill="${BAR}"/>
  <rect x="228" y="80" width="36" height="60" fill="${BAR}"/>
  <text x="66" y="53" font-size="11" text-anchor="middle" fill="${AXIS}">40</text>
  <text x="126" y="83" font-size="11" text-anchor="middle" fill="${AXIS}">25</text>
  <text x="186" y="23" font-size="11" text-anchor="middle" fill="${AXIS}">55</text>
  <text x="246" y="73" font-size="11" text-anchor="middle" fill="${AXIS}">30</text>
  <text x="66" y="156" font-size="12" text-anchor="middle" fill="${INK}">Jan</text>
  <text x="126" y="156" font-size="12" text-anchor="middle" fill="${INK}">Feb</text>
  <text x="186" y="156" font-size="12" text-anchor="middle" fill="${INK}">Mar</text>
  <text x="246" y="156" font-size="12" text-anchor="middle" fill="${INK}">Apr</text>
  <text x="160" y="171" font-size="11" text-anchor="middle" fill="${AXIS}">Monthly Sales (units)</text>`,
  320,
)

// Budget pie: Food 50%, Rent 25%, Savings 15%, Others 10%.
export const budgetPie = svg(
  '0 0 260 170',
  `
  <path d="M80 85 L80 25 A60 60 0 0 1 80 145 Z" fill="${BAR}"/>
  <path d="M80 85 L80 145 A60 60 0 0 1 20 85 Z" fill="${GOLD}"/>
  <path d="M80 85 L20 85 A60 60 0 0 1 44.7 36.5 Z" fill="${GREEN}"/>
  <path d="M80 85 L44.7 36.5 A60 60 0 0 1 80 25 Z" fill="${RED}"/>
  <rect x="160" y="40" width="12" height="12" fill="${BAR}"/><text x="178" y="50" font-size="12" fill="${INK}">Food 50%</text>
  <rect x="160" y="62" width="12" height="12" fill="${GOLD}"/><text x="178" y="72" font-size="12" fill="${INK}">Rent 25%</text>
  <rect x="160" y="84" width="12" height="12" fill="${GREEN}"/><text x="178" y="94" font-size="12" fill="${INK}">Savings 15%</text>
  <rect x="160" y="106" width="12" height="12" fill="${RED}"/><text x="178" y="116" font-size="12" fill="${INK}">Others 10%</text>`,
  300,
)

// Line graph of daily temperature: Mon 20, Tue 24, Wed 30, Thu 26, Fri 22.
export const tempLineGraph = svg(
  '0 0 300 175',
  `
  <line x1="34" y1="140" x2="286" y2="140" stroke="${AXIS}" stroke-width="1.5"/>
  <line x1="34" y1="18" x2="34" y2="140" stroke="${AXIS}" stroke-width="1.5"/>
  <polyline points="55,90 110,78 165,60 220,72 275,84" fill="none" stroke="${BAR}" stroke-width="2.5"/>
  <circle cx="55" cy="90" r="4" fill="${NAVY}"/><circle cx="110" cy="78" r="4" fill="${NAVY}"/>
  <circle cx="165" cy="60" r="4" fill="${NAVY}"/><circle cx="220" cy="72" r="4" fill="${NAVY}"/>
  <circle cx="275" cy="84" r="4" fill="${NAVY}"/>
  <text x="55" y="82" font-size="10" text-anchor="middle" fill="${AXIS}">20</text>
  <text x="110" y="70" font-size="10" text-anchor="middle" fill="${AXIS}">24</text>
  <text x="165" y="52" font-size="10" text-anchor="middle" fill="${AXIS}">30</text>
  <text x="220" y="64" font-size="10" text-anchor="middle" fill="${AXIS}">26</text>
  <text x="275" y="76" font-size="10" text-anchor="middle" fill="${AXIS}">22</text>
  <text x="55" y="156" font-size="11" text-anchor="middle" fill="${INK}">Mon</text>
  <text x="110" y="156" font-size="11" text-anchor="middle" fill="${INK}">Tue</text>
  <text x="165" y="156" font-size="11" text-anchor="middle" fill="${INK}">Wed</text>
  <text x="220" y="156" font-size="11" text-anchor="middle" fill="${INK}">Thu</text>
  <text x="275" y="156" font-size="11" text-anchor="middle" fill="${INK}">Fri</text>
  <text x="160" y="171" font-size="11" text-anchor="middle" fill="${AXIS}">Temperature (°C)</text>`,
  320,
)

// ---- Abstract-reasoning helpers -------------------------------------------

const DOT_GRID = {
  1: [[20, 20]],
  2: [[13, 13], [27, 27]],
  3: [[13, 13], [20, 20], [27, 27]],
  4: [[13, 13], [27, 13], [13, 27], [27, 27]],
  5: [[13, 13], [27, 13], [20, 20], [13, 27], [27, 27]],
  6: [[13, 13], [27, 13], [13, 20], [27, 20], [13, 27], [27, 27]],
}

const dotSquareInner = () =>
  `<rect x="2" y="2" width="36" height="36" rx="5" fill="none" stroke="${AXIS}" stroke-width="1.5"/>`

const dots = (n) =>
  DOT_GRID[n].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${NAVY}"/>`).join('')

// One square tile with n dots (used as an answer option).
export const dotTile = (n) => svg('0 0 40 40', `${dotSquareInner()}${dots(n)}`, 48)

// Prompt row: squares with 1, 2, 3 dots followed by a dashed "?" tile.
export const dotSeriesPrompt = (() => {
  const gap = 52
  let inner = ''
  ;[1, 2, 3].forEach((n, i) => {
    inner += `<g transform="translate(${i * gap},0)">${dotSquareInner()}${dots(n)}</g>`
  })
  const qx = 3 * gap
  inner += `<g transform="translate(${qx},0)"><rect x="2" y="2" width="36" height="36" rx="5" fill="none" stroke="${RED}" stroke-width="1.5" stroke-dasharray="4 3"/><text x="20" y="27" font-size="20" text-anchor="middle" fill="${RED}">?</text></g>`
  return svg(`0 0 ${qx + 40} 40`, inner, 250)
})()

// Arrow pointing in a direction (deg: 0 up, 90 right, 180 down, 270 left).
const arrowInner = (deg) =>
  `<g transform="rotate(${deg} 20 20)"><line x1="20" y1="33" x2="20" y2="10" stroke="${NAVY}" stroke-width="3"/><polygon points="20,4 13,15 27,15" fill="${NAVY}"/></g>`

export const arrowTile = (deg) => svg('0 0 40 40', arrowInner(deg), 48)

// Prompt row: arrows up, right, down, then a dashed "?" tile.
export const arrowSeriesPrompt = (() => {
  const gap = 52
  const dirs = [0, 90, 180]
  let inner = ''
  dirs.forEach((d, i) => {
    inner += `<g transform="translate(${i * gap},0)">${arrowInner(d)}</g>`
  })
  const qx = 3 * gap
  inner += `<g transform="translate(${qx},0)"><rect x="4" y="4" width="32" height="32" rx="5" fill="none" stroke="${RED}" stroke-width="1.5" stroke-dasharray="4 3"/><text x="20" y="27" font-size="18" text-anchor="middle" fill="${RED}">?</text></g>`
  return svg(`0 0 ${qx + 40} 40`, inner, 250)
})()

// A single triangle split by a cevian from the apex to the base midpoint
// (contains 3 triangles: left, right, and the whole).
export const triangleCount = svg(
  '0 0 150 110',
  `
  <polygon points="70,12 18,96 122,96" fill="#eef3fa" stroke="${NAVY}" stroke-width="2"/>
  <line x1="70" y1="12" x2="70" y2="96" stroke="${NAVY}" stroke-width="2"/>`,
  180,
)

// Shape tiles for the "odd one out" item (three 4-sided shapes + one triangle).
export const shapeSquare = svg(
  '0 0 44 44',
  `<rect x="8" y="8" width="28" height="28" fill="none" stroke="${NAVY}" stroke-width="2.5"/>`,
  50,
)
export const shapeDiamond = svg(
  '0 0 44 44',
  `<polygon points="22,6 38,22 22,38 6,22" fill="none" stroke="${NAVY}" stroke-width="2.5"/>`,
  50,
)
export const shapeRectangle = svg(
  '0 0 44 44',
  `<rect x="5" y="13" width="34" height="18" fill="none" stroke="${NAVY}" stroke-width="2.5"/>`,
  50,
)
export const shapeTriangle = svg(
  '0 0 44 44',
  `<polygon points="22,7 38,37 6,37" fill="none" stroke="${NAVY}" stroke-width="2.5"/>`,
  50,
)
