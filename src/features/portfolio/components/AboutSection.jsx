import Button from '../../../shared/components/ui/Button.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import Portrait from './Portrait.jsx'

const process = [
  ['Understand', 'Start with the people and the problem, not the stack.'],
  ['Plan', 'Model the data and the boundaries before writing UI.'],
  ['Build', 'Ship in small, testable feature slices.'],
  ['Verify', 'Check edge cases, accessibility and performance.'],
]

export default function AboutSection({ profile, profileStatus, retry }) {
  return (
    <Section id="about" index="03" eyebrow="About" title="A bit about me" className="about-section">
      <div className="about-grid">
        <Portrait />

        <div className="about-content">
          <div className="about-copy">
            {profile?.about_text ? (
              <p>{profile.about_text}</p>
            ) : profileStatus === 'loading' ? (
              <p className="state-note" role="status">Loading…</p>
            ) : profileStatus === 'error' ? (
              <div role="alert">
                <p>Background details are temporarily unavailable.</p>
                <Button onClick={retry} variant="secondary">Try again</Button>
              </div>
            ) : null}
          </div>

          <div className="process">
            <p className="process__label">How I work</p>
            <ol className="process__list">
              {process.map(([title, text], i) => (
                <li key={title}>
                  <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
