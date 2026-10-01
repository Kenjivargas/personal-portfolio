import Button from '../../../shared/components/ui/Button.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import TechnologyGroup from './TechnologyGroup.jsx'

export default function TechStackSection({ resource }) {
  const { status, data, retry } = resource

  return (
    <Section
      id="stack"
      eyebrow="02 / THE TOOLKIT"
      title="Technologies in practice."
      description="A focused view of technologies used across projects, grouped by discipline."
    >
      {status === 'loading' && <p className="state-note" role="status">Loading technologies…</p>}
      {status === 'error' && (
        <Card className="empty-state" role="alert">
          <p>Technologies could not be loaded right now.</p>
          <Button onClick={retry} variant="secondary">Try again</Button>
        </Card>
      )}
      {status === 'success' && data.length === 0 && (
        <Card className="empty-state"><p>Verified technologies will appear here as they are published.</p></Card>
      )}
      {status === 'success' && data.length > 0 && (
        <div className="technology-grid">
          {data.map((category) => <TechnologyGroup key={category.category_id} category={category} />)}
        </div>
      )}
    </Section>
  )
}
