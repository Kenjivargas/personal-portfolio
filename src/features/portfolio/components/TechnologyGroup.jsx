import Card from '../../../shared/components/ui/Card.jsx'

export default function TechnologyGroup({ category, index }) {
  return (
    <Card className="technology-group" style={{ '--i': index }}>
      <div className="technology-group__heading">
        <h3>{category.name}</h3>
        <span className="technology-group__count">{String(category.technologies.length).padStart(2, '0')}</span>
      </div>
      <ul className="technology-group__list">
        {category.technologies.map((technology) => (
          <li key={technology.technology_id}>{technology.name}</li>
        ))}
      </ul>
    </Card>
  )
}
