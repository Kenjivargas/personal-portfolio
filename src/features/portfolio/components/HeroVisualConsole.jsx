import { useState, useRef } from 'react'

export default function HeroVisualConsole() {
  const [activeTab, setActiveTab] = useState('terminal')
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'kenji.init()', output: 'System initialized. Full-stack profile loaded.' },
    { cmd: 'kenji.status', output: 'Ready for full-stack engineering & system development.' },
  ])
  const cardRef = useRef(null)

  const runCommand = (cmdName, outputText) => {
    setTerminalHistory((prev) => [...prev, { cmd: cmdName, output: outputText }].slice(-6))
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      className="hero-console"
      onMouseMove={handleMouseMove}
      aria-label="Interactive Developer Console and System Architecture"
    >
      <div className="hero-console__glow" aria-hidden="true" />

      {/* Top Header */}
      <div className="hero-console__top">
        <div className="hero-console__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-console__title">
          <span>SYSTEM_CONSOLE //</span> <strong>KENJI.VARGAS</strong>
        </div>
        <div className="hero-console__status">
          <span className="hero-console__pulse" aria-hidden="true" />
          <span>OPEN TO WORK</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="hero-console__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'terminal'}
          className={`hero-console__tab ${activeTab === 'terminal' ? 'hero-console__tab--active' : ''}`}
          onClick={() => setActiveTab('terminal')}
        >
          <span className="tab-icon">❯_</span> Terminal
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'architecture'}
          className={`hero-console__tab ${activeTab === 'architecture' ? 'hero-console__tab--active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <span className="tab-icon">⛯</span> Architecture
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'workflow'}
          className={`hero-console__tab ${activeTab === 'workflow' ? 'hero-console__tab--active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          <span className="tab-icon">✦</span> Workflow
        </button>
      </div>

      {/* Content Area */}
      <div className="hero-console__body">
        {activeTab === 'terminal' && (
          <div className="hero-console__terminal">
            <div className="terminal-logs">
              {terminalHistory.map((item, i) => (
                <div key={i} className="terminal-log-entry">
                  <p className="terminal-cmd">
                    <span className="prompt-symbol">kv@sys:~$</span> {item.cmd}
                  </p>
                  <p className="terminal-out">{item.output}</p>
                </div>
              ))}
            </div>

            <div className="terminal-input-row" aria-hidden="true">
              <span className="prompt-symbol">kv@sys:~$</span>
              <span className="terminal-cursor">_</span>
            </div>

            <div className="terminal-actions">
              <span className="terminal-actions__label">Quick commands:</span>
              <div className="terminal-actions__buttons">
                <button
                  type="button"
                  onClick={() => runCommand('kenji.stack', 'React 19 • Laravel • PostgreSQL • Supabase • REST APIs • RBAC')}
                >
                  kenji.stack
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('kenji.featured', 'Flagship: ISMERS (Enterprise School & Resource System)')}
                >
                  kenji.featured
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('kenji.focus', 'Building robust full-stack systems with reliable database models')}
                >
                  kenji.focus
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="hero-console__architecture">
            <div className="arch-layer">
              <div className="arch-layer__badge">PRESENTATION LAYER</div>
              <div className="arch-layer__content">
                <strong>React 19 & Vite</strong>
                <span>Monochrome Tokens • Accessible Primitives • Mobile-First</span>
              </div>
            </div>
            <div className="arch-flow-arrow" aria-hidden="true">↓ REST APIs & JSON</div>
            <div className="arch-layer">
              <div className="arch-layer__badge">BUSINESS & SERVICE LAYER</div>
              <div className="arch-layer__content">
                <strong>Laravel / Headless API Services</strong>
                <span>Role-Based Access Control • Workflow Engines • Verification Loops</span>
              </div>
            </div>
            <div className="arch-flow-arrow" aria-hidden="true">↓ RLS & SQL Transactions</div>
            <div className="arch-layer">
              <div className="arch-layer__badge">DATA & STORAGE LAYER</div>
              <div className="arch-layer__content">
                <strong>PostgreSQL & Supabase</strong>
                <span>Normalized Schemas (3NF) • Row Level Security • Referential Integrity</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="hero-console__workflow">
            <div className="workflow-step">
              <span className="workflow-step__num">01</span>
              <div>
                <strong>Understand & Model</strong>
                <p>Map functional requirements, data entities, normalization, and security boundaries first.</p>
              </div>
            </div>
            <div className="workflow-step">
              <span className="workflow-step__num">02</span>
              <div>
                <strong>Build with Discipline</strong>
                <p>Clean feature slices, reusable UI tokens, robust server-side RBAC, and predictable state.</p>
              </div>
            </div>
            <div className="workflow-step">
              <span className="workflow-step__num">03</span>
              <div>
                <strong>Verify & Optimize</strong>
                <p>Strict linting, automated edge-case validation, responsive testing, and performance profiling.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="hero-console__foot">
        <span>Engineered with React 19 & PostgreSQL</span>
        <a href="#projects" className="hero-console__cta">Explore Work ↗</a>
      </div>
    </div>
  )
}
