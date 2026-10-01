import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import { educationEntries } from '../services/staticContent.js'

export default function EducationSection() {
  return (
    <Section id="education" eyebrow="05 / FOUNDATION" title="Education">
      {educationEntries.length ? (
        <div className="timeline">
          {educationEntries.map((entry) => (
            <Card key={entry.id} className="timeline__item">
              <p className="timeline__period">{entry.period}</p>
              <h3>{entry.program}</h3>
              <p>{entry.institution}</p>
              {entry.description && <p>{entry.description}</p>}
            </Card>
          ))}
        </div>
      ) : <Card className="empty-state empty-state--compact"><p>Education details will appear here once verified.</p></Card>}
    </Section>
  )
}
