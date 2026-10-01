import Button from '../../../shared/components/ui/Button.jsx'
import HeroVisualConsole from './HeroVisualConsole.jsx'

export default function HeroSection({ profile, profileStatus, onOpenCommandPalette }) {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-section__grid">
        <div className="hero-section__copy">
          <div className="hero-badge-row">
            <p className="eyebrow"><span className="eyebrow__line" /> KENJI VARGAS / FULL-STACK</p>
            <span className="live-status-pill">
              <span className="live-status-dot" aria-hidden="true" /> Available for projects
            </span>
          </div>

          <h1 id="hero-title">
            Building practical <em>web systems.</em>
          </h1>

          <p className="hero-section__lead">
            {profile?.headline ?? 'Full-Stack Developer building practical web systems.'}
          </p>

          <p className="hero-section__intro">
            {profile?.short_intro ??
              'Specializing in scalable web architectures, modern React frontends, robust backend systems, and AI-assisted workflows.'}
          </p>

          <div className="hero-section__actions">
            <Button href="#projects">View Projects <span aria-hidden="true">↗</span></Button>
            <Button href="#contact" variant="secondary">Contact Me <span aria-hidden="true">→</span></Button>
            <button
              type="button"
              className="button button--secondary hero-cmd-btn"
              onClick={onOpenCommandPalette}
              title="Open Command Palette (Ctrl+K)"
            >
              <span aria-hidden="true">⌨</span> Quick Command <kbd>Ctrl+K</kbd>
            </button>
          </div>

          <div className="hero-skills-row" aria-label="Core focus technologies">
            <span className="hero-skills-label">Core Stack:</span>
            <div className="hero-skills-badges">
              <span className="hero-tech-tag">React 19</span>
              <span className="hero-tech-tag">Laravel</span>
              <span className="hero-tech-tag">PostgreSQL</span>
              <span className="hero-tech-tag">REST APIs</span>
              <span className="hero-tech-tag">RBAC</span>
            </div>
          </div>

          {profileStatus === 'error' && (
            <p className="subtle-note" role="status">Profile details running on verified offline mode.</p>
          )}
        </div>

        <div className="hero-section__console-wrapper">
          <HeroVisualConsole />
        </div>
      </div>
    </section>
  )
}
