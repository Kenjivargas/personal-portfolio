import Button from '../../../shared/components/ui/Button.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import TechnologyGroup from './TechnologyGroup.jsx'

export default function TechStackSection({ resource }) {
  const { status, data, retry } = resource

  return (
    <Section
      id="stack"
      index="02"
      eyebrow="Stack"
      title="Tools I work with"
      description="Grouped by where they sit in a system. Everything here has been used in a real project."
    >
      {status === 'loading' && (
        <div className="technology-grid" aria-busy="true">
          {[0, 1, 2, 3].map((n) => <div key={n} className="skeleton skeleton--tile" />)}
        </div>
      )}
      {status === 'error' && (
        <Card className="empty-state" role="alert">
          <p>Technologies could not be loaded right now.</p>
          <Button onClick={retry} variant="secondary">Try again</Button>
        </Card>
      )}
      {status === 'success' && data.length === 0 && (
        <Card className="empty-state"><p>Technologies will appear here once they're published.</p></Card>
      )}
      {status === 'success' && data.length > 0 && (
        <div className="technology-grid">
          {data.map((category, i) => <TechnologyGroup key={category.category_id} category={category} index={i} />)}
        </div>
      )}
    </Section>
  )
}
