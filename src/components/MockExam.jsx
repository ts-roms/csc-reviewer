import { useEffect, useMemo, useRef, useState } from 'react'
import { allQuestions } from '../data/questions.js'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

// Fisher–Yates shuffle (returns a new array)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Roughly 1 minute per question
const PRESETS = [
  { count: 25, label: '25 questions', minutes: 25 },
  { count: 50, label: '50 questions', minutes: 50 },
  { count: allQuestions.length, label: `All ${allQuestions.length} questions`, minutes: allQuestions.length },
]

export default function MockExam() {
  // 'setup' | 'running' | 'done'
  const [phase, setPhase] = useState('setup')
  const [preset, setPreset] = useState(PRESETS[0])
  const [quiz, setQuiz] = useState([])
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef(null)

  function start() {
    const picked = shuffle(allQuestions).slice(0, preset.count)
    setQuiz(picked)
    setAnswers({})
    setTimeLeft(preset.minutes * 60)
    setPhase('running')
  }

  // Countdown
  useEffect(() => {
    if (phase !== 'running') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setPhase('done')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  function finish() {
    clearInterval(timerRef.current)
    setPhase('done')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const score = useMemo(
    () => quiz.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0),
    [quiz, answers],
  )
  const answeredCount = Object.keys(answers).length

  // ---- Setup screen ----
  if (phase === 'setup') {
    return (
      <div className="mock-setup">
        <div className="mock-hero">
          <h2>📝 Mock Examination</h2>
          <p>
            A randomized, timed test drawn from <strong>all sections</strong>{' '}
            (Verbal, Numerical, Analytical, Clerical, and General Information),
            mimicking the real CSC exam experience. Passing rating is{' '}
            <strong>80%</strong>.
          </p>
        </div>

        <div className="mock-options">
          <p className="mock-label">Choose your exam length:</p>
          <div className="preset-grid">
            {PRESETS.map((p) => (
              <button
                key={p.count}
                className={preset.count === p.count ? 'preset active' : 'preset'}
                onClick={() => setPreset(p)}
              >
                <span className="preset-count">{p.count}</span>
                <span className="preset-sub">questions</span>
                <span className="preset-time">⏱ {p.minutes} min</span>
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary btn-lg" onClick={start}>
          🚀 Start Mock Exam
        </button>
      </div>
    )
  }

  const pct = quiz.length ? Math.round((score / quiz.length) * 100) : 0
  const passed = pct >= 80
  const lowTime = timeLeft <= 60

  return (
    <div className="mock-run">
      {phase === 'running' && (
        <div className="exam-bar">
          <span className="progress-text">
            {answeredCount} / {quiz.length} answered
          </span>
          <span className={lowTime ? 'timer low' : 'timer'}>
            ⏱ {formatTime(timeLeft)}
          </span>
          <button className="btn btn-primary" onClick={finish}>
            Submit
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div className={passed ? 'result-banner pass' : 'result-banner fail'}>
          <div className="result-score">
            {score} / {quiz.length}
          </div>
          <div className="result-meta">
            <strong>{pct}%</strong>
            <span>
              {timeLeft === 0 && "⏰ Time's up! "}
              {passed
                ? '🎉 Passing rating (80%+). Great work!'
                : 'Below the 80% passing rating — review the explanations below.'}
            </span>
          </div>
          <button className="btn" onClick={() => setPhase('setup')}>
            🔄 New exam
          </button>
        </div>
      )}

      <ol className="question-list">
        {quiz.map((q, i) => {
          const chosen = answers[q.id]
          const done = phase === 'done'
          return (
            <li key={q.id} className="card">
              <div className="q-head">
                <span className="q-tag">{q.sectionTitle}</span>
              </div>
              {q.passage && <blockquote className="passage">{q.passage}</blockquote>}
              <p className="q-text">
                <span className="q-num">{i + 1}.</span> {q.text}
              </p>

              <ul className="options">
                {q.options.map((opt, idx) => {
                  const isChosen = chosen === idx
                  const isCorrect = idx === q.answer
                  let cls = 'option clickable'
                  if (done) {
                    if (isCorrect) cls = 'option correct'
                    else if (isChosen) cls = 'option wrong'
                  } else if (isChosen) {
                    cls = 'option selected'
                  }
                  return (
                    <li key={idx}>
                      <button
                        className={cls}
                        disabled={done}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: idx }))
                        }
                      >
                        <span className="opt-letter">{LETTERS[idx]}</span>
                        <span>{opt}</span>
                        {done && isCorrect && <span className="badge">✓</span>}
                        {done && isChosen && !isCorrect && (
                          <span className="badge badge-x">✗</span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {done && (
                <div className="explanation">
                  <strong>Answer: {LETTERS[q.answer]}.</strong> {q.explanation}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {phase === 'running' && (
        <div className="quiz-footer">
          <span className="progress-text">
            {answeredCount} of {quiz.length} answered
          </span>
          <button className="btn btn-primary" onClick={finish}>
            Submit &amp; see score
          </button>
        </div>
      )}
    </div>
  )
}
