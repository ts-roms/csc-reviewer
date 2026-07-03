export default function Sidebar({
  sections,
  activeId,
  onSelect,
  totalQuestions,
  locked = false,
  onClose,
}) {
  // While a quiz is in progress, section switching is disabled.
  function pick(id) {
    if (locked) return
    onSelect(id)
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-flag">🇵🇭</span>
        <div>
          <h2>CSC Exam Review</h2>
          <small>Civil Service Commission · Philippines</small>
        </div>
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sections menu"
        >
          ✕
        </button>
      </div>

      {locked && (
        <p className="nav-lock">🔒 Finish and submit your quiz to switch sections.</p>
      )}

      <nav>
        <p className="nav-label">Sections</p>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                className={s.id === activeId ? 'nav-item active' : 'nav-item'}
                onClick={() => pick(s.id)}
                disabled={locked && s.id !== activeId}
              >
                <span className="nav-icon">{s.icon}</span>
                <span className="nav-text">
                  {s.title}
                  <small>{s.questions.length} questions</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <p className="nav-label" style={{ marginTop: 18 }}>Exam</p>
      <button
        className={activeId === 'mock' ? 'nav-item mock active' : 'nav-item mock'}
        onClick={() => pick('mock')}
        disabled={locked && activeId !== 'mock'}
      >
        <span className="nav-icon">⏱️</span>
        <span className="nav-text">
          Mock Exam
          <small>Randomized &amp; timed</small>
        </span>
      </button>

      <div className="sidebar-footer">
        <strong>{totalQuestions}</strong> total practice questions
        <p>
          Covers the Career Service Professional &amp; Sub-Professional exam
          coverage. For review purposes only.
        </p>
      </div>
    </aside>
  )
}
