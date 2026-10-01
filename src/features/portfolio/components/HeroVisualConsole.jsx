import { useState } from 'react'

const tabs = [
  { id: 'terminal', label: 'Terminal' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'workflow', label: 'Workflow' },
]

const quickCommands = [
  ['kenji.stack', 'React 19 · Laravel · PostgreSQL · Supabase · REST APIs · RBAC'],
  ['kenji.featured', 'ISMERS: integrated school management & resource system'],
  ['kenji.focus', 'Full-stack systems with dependable data models'],
]

const layers = [
  { badge: 'Presentation', title: 'React 19 & Vite', detail: 'Design tokens, accessible primitives, mobile-first layouts', flow: 'REST & JSON' },
  { badge: 'Services', title: 'Laravel API', detail: 'Role-based access control, workflow logic, validation', flow: 'SQL & row-level security' },
  { badge: 'Data', title: 'PostgreSQL & Supabase', detail: 'Normalized schemas, RLS policies, referential integrity' },
]

const steps = [
  ['01', 'Understand & model', 'Map requirements, data entities and security boundaries before writing code.'],
  ['02', 'Build in slices', 'Feature-based modules, reusable UI tokens, server-side RBAC and predictable state.'],
  ['03', 'Verify', 'Linting, edge-case checks, responsive testing and performance profiling.'],
]

export default function HeroVisualConsole() {
  const [activeTab, setActiveTab] = useState('terminal')
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'kenji.init()', output: 'Profile loaded. 3 projects, 1 featured.' },
  ])

  const runCommand = (cmd, output) => {
    setTerminalHistory((prev) => [...prev, { cmd, output }].slice(-4))
  }

  return (
    <div className="hero-console" aria-label="Interactive developer console">
      <div className="hero-console__top">
        <div className="hero-console__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="hero-console__title">kenji — ~/portfolio</p>
      </div>

      <div className="hero-console__tabs" role="tablist" aria-label="Console views">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className="hero-console__tab"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="hero-console__body" key={activeTab}>
        {activeTab === 'terminal' && (
          <div className="hero-console__terminal">
            <div className="terminal-logs" aria-live="polite">
              {terminalHistory.map((item, i) => (
                <div key={i} className="terminal-log-entry">
                  <p className="terminal-cmd"><span className="prompt-symbol">$</span> {item.cmd}</p>
                  <p className="terminal-out">{item.output}</p>
                </div>
              ))}
              <p className="terminal-cmd" aria-hidden="true">
                <span className="prompt-symbol">$</span> <span className="terminal-cursor" />
              </p>
            </div>

            <div className="terminal-actions">
              {quickCommands.map(([cmd, output]) => (
                <button key={cmd} type="button" onClick={() => runCommand(cmd, output)}>{cmd}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="hero-console__architecture">
            {layers.map((layer) => (
              <div key={layer.badge} className="arch-step">
                <div className="arch-layer">
                  <span className="arch-layer__badge">{layer.badge}</span>
                  <strong>{layer.title}</strong>
                  <span className="arch-layer__detail">{layer.detail}</span>
                </div>
                {layer.flow && <p className="arch-flow" aria-hidden="true">{layer.flow}</p>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'workflow' && (
          <ol className="hero-console__workflow">
            {steps.map(([num, title, text]) => (
              <li key={num} className="workflow-step">
                <span className="workflow-step__num">{num}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
