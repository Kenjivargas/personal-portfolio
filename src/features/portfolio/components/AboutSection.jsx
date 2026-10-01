import Button from '../../../shared/components/ui/Button.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'

export default function AboutSection({ profile, profileStatus, retry }) {
  return (
    <Section id="about" eyebrow="03 / THE PERSON" title="More than a list of tools." className="about-section">
      <div className="about-grid">
        <div className="about-copy">
          {profile?.about_text ? (
            <p>{profile.about_text}</p>
          ) : profileStatus === 'loading' ? (
            <p className="state-note" role="status">Loading background…</p>
          ) : profileStatus === 'error' ? (
            <div role="alert"><p>Background details are temporarily unavailable.</p><Button onClick={retry} variant="secondary">Try again</Button></div>
          ) : (
            <p>Verified background details will be added here.</p>
          )}
        </div>
        <Card className="process-card">
          <p className="eyebrow">HOW PROJECTS ARE APPROACHED</p>
          <ol>
            <li><span>01</span> Understand the problem</li>
            <li><span>02</span> Plan the system</li>
            <li><span>03</span> Build and test</li>
            <li><span>04</span> Verify the result</li>
          </ol>
        </Card>
      </div>
    </Section>
  )
}
