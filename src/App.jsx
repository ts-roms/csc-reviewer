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

  const isMock = activeId === 'mock'

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeId),
    [activeId],
  )

  return (
    <div className="app">
      <Sidebar
        sections={sections}
        activeId={activeId}
        onSelect={setActiveId}
        totalQuestions={totalQuestions}
      />

      <main className="content">
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
                  onClick={() => setMode('study')}
                >
                  📚 Study
                </button>
                <button
                  role="tab"
                  aria-selected={mode === 'quiz'}
                  className={mode === 'quiz' ? 'active' : ''}
                  onClick={() => setMode('quiz')}
                >
                  📝 Quiz
                </button>
              </div>
            </header>

            {mode === 'study' ? (
              <StudyView section={activeSection} />
            ) : (
              // key forces a fresh quiz (reset answers) when switching sections
              <QuizView key={activeSection.id} section={activeSection} />
            )}
          </>
        )}
      </main>

      <InstallButton />
    </div>
  )
}
