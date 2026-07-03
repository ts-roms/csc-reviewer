import { useState } from 'react'
import { Figure, OptionFigure, hasLongOptions } from './Figure.jsx'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export default function StudyView({ section }) {
  // Show all answer keys at once, or reveal per-question
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="study">
      <div className="study-toolbar">
        <button className="btn" onClick={() => setShowAll((v) => !v)}>
          {showAll ? '🙈 Hide all answers' : '👁️ Reveal all answers'}
        </button>
      </div>

      <ol className="question-list">
        {section.questions.map((q, i) => (
          <StudyQuestion key={q.id} q={q} number={i + 1} forceShow={showAll} />
        ))}
      </ol>
    </div>
  )
}

function StudyQuestion({ q, number, forceShow }) {
  const [revealed, setRevealed] = useState(false)
  const show = forceShow || revealed

  const wide = q.passage || q.figure || q.optionFigures
  const longOptions = !q.optionFigures && hasLongOptions(q.options)

  return (
    <li className={wide ? 'card card-wide' : 'card'}>
      {q.passage && <blockquote className="passage">{q.passage}</blockquote>}
      <p className="q-text">
        <span className="q-num">{number}</span> {q.text}
      </p>
      <Figure svg={q.figure} />

      <ul
        className={
          q.optionFigures
            ? 'options study-options options-figure'
            : longOptions
              ? 'options study-options options-list'
              : 'options study-options'
        }
      >
        {q.options.map((opt, idx) => {
          const correct = idx === q.answer
          return (
            <li
              key={idx}
              className={show && correct ? 'option correct' : 'option'}
            >
              <span className="opt-letter">{LETTERS[idx]}</span>
              {q.optionFigures ? (
                <OptionFigure svg={q.optionFigures[idx]} />
              ) : (
                <span>{opt}</span>
              )}
              {show && correct && <span className="badge">✓</span>}
            </li>
          )
        })}
      </ul>

      {!forceShow && (
        <button className="link-btn" onClick={() => setRevealed((v) => !v)}>
          {revealed ? 'Hide answer' : 'Show answer'}
        </button>
      )}

      {show && (
        <div className="explanation">
          <strong>Answer: {LETTERS[q.answer]}.</strong> {q.explanation}
        </div>
      )}
    </li>
  )
}
