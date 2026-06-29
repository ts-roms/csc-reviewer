import { useState } from 'react'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export default function QuizView({ section }) {
  // answers: { [questionId]: selectedOptionIndex }
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const total = section.questions.length
  const answeredCount = Object.keys(answers).length

  const score = section.questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0),
    0,
  )

  function select(qId, optIdx) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }))
  }

  function handleSubmit() {
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
  }

  const pct = Math.round((score / total) * 100)
  const passed = pct >= 80 // CSC passing rating is 80%

  return (
    <div className="quiz">
      {submitted && (
        <div className={passed ? 'result-banner pass' : 'result-banner fail'}>
          <div className="result-score">
            {score} / {total}
          </div>
          <div className="result-meta">
            <strong>{pct}%</strong>
            <span>
              {passed
                ? '🎉 Passing rating (80%+). Great work!'
                : 'Below the 80% passing rating — review the explanations below.'}
            </span>
          </div>
          <button className="btn" onClick={handleReset}>
            🔄 Retake
          </button>
        </div>
      )}

      <ol className="question-list">
        {section.questions.map((q, i) => {
          const chosen = answers[q.id]
          return (
            <li key={q.id} className="card">
              {q.passage && <blockquote className="passage">{q.passage}</blockquote>}
              <p className="q-text">
                <span className="q-num">{i + 1}.</span> {q.text}
              </p>

              <ul className="options">
                {q.options.map((opt, idx) => {
                  const isChosen = chosen === idx
                  const isCorrect = idx === q.answer

                  let cls = 'option clickable'
                  if (submitted) {
                    if (isCorrect) cls = 'option correct'
                    else if (isChosen) cls = 'option wrong'
                  } else if (isChosen) {
                    cls = 'option selected'
                  }

                  return (
                    <li key={idx}>
                      <button
                        className={cls}
                        onClick={() => select(q.id, idx)}
                        disabled={submitted}
                      >
                        <span className="opt-letter">{LETTERS[idx]}</span>
                        <span>{opt}</span>
                        {submitted && isCorrect && (
                          <span className="badge">✓</span>
                        )}
                        {submitted && isChosen && !isCorrect && (
                          <span className="badge badge-x">✗</span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {submitted && (
                <div className="explanation">
                  <strong>Answer: {LETTERS[q.answer]}.</strong> {q.explanation}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {!submitted && (
        <div className="quiz-footer">
          <span className="progress-text">
            {answeredCount} of {total} answered
          </span>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={answeredCount === 0}
          >
            Submit &amp; see score
          </button>
        </div>
      )}
    </div>
  )
}
