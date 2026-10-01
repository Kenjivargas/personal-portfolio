import Card from '../../../shared/components/ui/Card.jsx'
import { useToast } from '../../../shared/context/useToast.js'

function scrollToSection(id) {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function TechnologyGroup({ category }) {
  const { showToast } = useToast()

  const handleTechClick = (techName) => {
    scrollToSection('projects')
    showToast(`Jumped to projects. Filter for: ${techName}`)
  }

  return (
    <Card className="technology-group">
      <div className="technology-group__heading">
        <span className="technology-group__glyph" aria-hidden="true">✳</span>
        <h3>{category.name}</h3>
      </div>
      <div className="technology-group__list">
        {category.technologies.map((technology) => (
          <button
            key={technology.technology_id}
            type="button"
            className="badge badge--interactive"
            onClick={() => handleTechClick(technology.name)}
            title={`Jump to projects using ${technology.name}`}
          >
            {technology.name}
          </button>
        ))}
      </div>
    </Card>
  )
}
