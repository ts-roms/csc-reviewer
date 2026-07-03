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
