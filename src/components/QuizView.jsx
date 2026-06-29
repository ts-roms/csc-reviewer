import { useCallback, useState } from 'react'

const LETTERS = ['A', 'B', 'C', 'D', 'E']
const BATCH_SIZE = 25 // items per questionnaire

// Fisher–Yates shuffle (returns a new array)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizView({ section }) {
  // Draw a randomized batch of up to 25 questions from this section.
  const sample = useCallback(
    () => shuffle(section.questions).slice(0, Math.min(BATCH_SIZE, section.questions.length)),
    [section],
  )

  // Lazy initializer → shuffled batch on first render
  const [quiz, setQuiz] = useState(sample)
  // answers: { [questionId]: selectedOptionIndex }
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const total = quiz.length
  const answeredCount = Object.keys(answers).length

  const score = quiz.reduce(
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

  // Start a fresh, re-randomized questionnaire
  function newSet() {
    setQuiz(sample())
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pct = total ? Math.round((score / total) * 100) : 0
  const passed = pct >= 80 // CSC passing rating is 80%

  return (
    <div className="quiz">
      {!submitted && (
        <p className="quiz-intro">
          📝 This questionnaire has <strong>{total}</strong> randomly selected
          {section.questions.length > total
            ? ` questions (from ${section.questions.length} in this section). `
            : ' questions. '}
          Answer all items, then submit to see your score and the answer key.
        </p>
      )}

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
                : 'Below the 80% passing rating — review the answer key below.'}
            </span>
          </div>
          <button className="btn" onClick={newSet}>
            🔀 New random set
          </button>
        </div>
      )}

      <ol className="question-list">
        {quiz.map((q, i) => {
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

              {/* Answer key + explanation — only after the quiz is submitted */}
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
            Submit &amp; show answers
          </button>
        </div>
      )}
    </div>
  )
}
