// Renders a trusted, repo-authored inline SVG string from the question data.
// The markup is static and defined in src/data/figures.js (never user input),
// so dangerouslySetInnerHTML is safe here.

export function Figure({ svg }) {
  if (!svg) return null
  return <div className="figure" dangerouslySetInnerHTML={{ __html: svg }} />
}

export function OptionFigure({ svg }) {
  if (!svg) return null
  return (
    <span className="option-figure" dangerouslySetInnerHTML={{ __html: svg }} />
  )
}

// Sentence-length options read better as a single-column list; short labels
// (words, numbers, short phrases) look better as a 2-column tile grid.
const LONG_OPTION_CHARS = 30
export function hasLongOptions(options) {
  return options.some((o) => typeof o === 'string' && o.length > LONG_OPTION_CHARS)
}
