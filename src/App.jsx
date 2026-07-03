import { useMemo, useState } from 'react'
import { sections, totalQuestions } from './data/questions.js'
import Sidebar from './components/Sidebar.jsx'
import StudyView from './components/StudyView.jsx'
import QuizView from './components/QuizView.jsx'
import MockExam from './components/MockExam.jsx'
import InstallButton from './components/InstallButton.jsx'

export default function App() {
  // activeId is a section id, or 'mock' for the mock exam
  const [activeId, setActiveId] = useState(sections[0].id)
  // 'study' = see questions + answer key; 'quiz' = answer then get scored
  const [mode, setMode] = useState('study')
  // Sidebar visibility (used on narrow screens; always shown on desktop via CSS)
  const [navOpen, setNavOpen] = useState(false)
  // True while a quiz is being answered (started, not yet submitted).
  // While active, the section and mode cannot be changed.
  const [quizActive, setQuizActive] = useState(false)

  const isMock = activeId === 'mock'

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeId),
    [activeId],
  )

  function selectSection(id) {
    if (quizActive) return // locked mid-quiz
    setActiveId(id)
    setQuizActive(false)
    setNavOpen(false) // collapse the menu after choosing a topic
  }

  function changeMode(m) {
    if (quizActive) return // locked mid-quiz
    setMode(m)
  }

  return (
    <div className={navOpen ? 'app nav-open' : 'app'}>
      {navOpen && (
        <div className="nav-backdrop" onClick={() => setNavOpen(false)} />
      )}

      <Sidebar
        sections={sections}
        activeId={activeId}
        onSelect={selectSection}
        totalQuestions={totalQuestions}
        locked={quizActive}
        onClose={() => setNavOpen(false)}
      />

      <main className="content">
        <div className="content-topbar">
          <button
            className="nav-toggle"
            onClick={() => setNavOpen(true)}
            disabled={quizActive}
            title={
              quizActive
                ? 'Finish and submit your quiz to switch sections'
                : 'Browse sections'
            }
          >
            ☰ Sections
          </button>
          {quizActive && <span className="lock-badge">🔒 Quiz in progress</span>}
        </div>

        {isMock ? (
          <MockExam />
        ) : (
          <>
            <header className="content-header">
              <div>
                <h1>
                  {activeSection.icon} {activeSection.title}
                </h1>
                <p className="section-desc">{activeSection.description}</p>
              </div>

              <div className="mode-toggle" role="tablist" aria-label="Mode">
                <button
                  role="tab"
                  aria-selected={mode === 'study'}
                  className={mode === 'study' ? 'active' : ''}
                  onClick={() => changeMode('study')}
                  disabled={quizActive}
                  title={
                    quizActive ? 'Finish your quiz to switch modes' : undefined
                  }
                >
                  📚 Study
                </button>
                <button
                  role="tab"
                  aria-selected={mode === 'quiz'}
                  className={mode === 'quiz' ? 'active' : ''}
                  onClick={() => changeMode('quiz')}
                  disabled={quizActive}
                  title={
                    quizActive ? 'Finish your quiz to switch modes' : undefined
                  }
                >
                  📝 Quiz
                </button>
              </div>
            </header>

            {mode === 'study' ? (
              <StudyView section={activeSection} />
            ) : (
              // key forces a fresh quiz (reset answers) when switching sections
              <QuizView
                key={activeSection.id}
                section={activeSection}
                onActiveChange={setQuizActive}
              />
            )}
          </>
        )}
      </main>

      <InstallButton />
    </div>
  )
}
