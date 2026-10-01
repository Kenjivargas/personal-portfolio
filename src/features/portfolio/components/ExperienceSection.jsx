import Section from '../../../shared/components/ui/Section.jsx'
import Timeline from './Timeline.jsx'
import { experienceEntries, educationEntries } from '../services/staticContent.js'

export default function ExperienceSection() {
  return (
    <Section id="experience" index="04" eyebrow="Experience" title="Where I've been">
      <Timeline
        label="Work"
        emptyText="Experience details will appear here soon."
        entries={experienceEntries.map((entry) => ({
          id: entry.id,
          period: entry.period,
          title: entry.role,
          subtitle: entry.organization,
          description: entry.description,
        }))}
      />
      <Timeline
        label="Education"
        emptyText="Education details will appear here soon."
        entries={educationEntries.map((entry) => ({
          id: entry.id,
          period: entry.period,
          title: entry.program,
          subtitle: entry.institution,
          description: entry.description,
        }))}
      />
    </Section>
  )
}
