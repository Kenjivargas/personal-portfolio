import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import { experienceEntries } from '../services/staticContent.js'

export default function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="04 / JOURNEY" title="Experience">
      {experienceEntries.length ? (
        <div className="timeline">
          {experienceEntries.map((entry) => (
            <Card key={entry.id} className="timeline__item">
              <p className="timeline__period">{entry.period}</p>
              <h3>{entry.role}</h3>
              <p>{entry.organization}</p>
              {entry.description && <p>{entry.description}</p>}
            </Card>
          ))}
        </div>
      ) : <Card className="empty-state empty-state--compact"><p>Experience details will appear here once verified.</p></Card>}
    </Section>
  )
}
