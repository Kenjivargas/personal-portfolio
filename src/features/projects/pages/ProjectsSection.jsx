import { useState, useMemo } from 'react'
import Button from '../../../shared/components/ui/Button.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import Icon from '../../../shared/components/ui/Icon.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import { useProjects } from '../hooks/useProjects.js'
import { useCaseStudyRoute } from '../hooks/useCaseStudyRoute.js'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectCaseStudyModal from '../components/ProjectCaseStudyModal.jsx'

const CATEGORIES = [
  { id: 'all', label: 'All', keywords: null },
  { id: 'full-stack', label: 'Full-stack', keywords: ['react', 'laravel', 'php', 'rest apis'] },
  { id: 'database', label: 'Data & architecture', keywords: ['postgresql', 'supabase', 'relational', 'architecture'] },
  { id: 'tools', label: 'Tooling & AI', keywords: ['git', 'ai', 'architecture', 'vite'] },
]

function matchesCategory(project, categoryId) {
  const keywords = CATEGORIES.find((c) => c.id === categoryId)?.keywords
  if (!keywords) return true
  return project.technologies?.some((t) => keywords.some((k) => t.name.toLowerCase().includes(k)))
}

export default function ProjectsSection() {
  const { status, data, retry } = useProjects()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedTech, setSelectedTech] = useState(null)
  const caseStudy = useCaseStudyRoute()

  const filteredProjects = useMemo(() => {
    return (data ?? []).filter((project) => {
      if (selectedTech && !project.technologies?.some((t) => t.name.toLowerCase() === selectedTech.toLowerCase())) {
        return false
      }
      return matchesCategory(project, activeCategory)
    })
  }, [data, selectedTech, activeCategory])

  const isFiltered = activeCategory !== 'all' || selectedTech
  const resetFilters = () => {
    setSelectedTech(null)
    setActiveCategory('all')
  }

  const featured = !isFiltered ? filteredProjects.find((p) => p.is_featured) : null
  const rest = filteredProjects.filter((p) => p !== featured)

  // Case study order follows what's on screen: featured first, then the rest.
  const ordered = featured ? [featured, ...rest] : rest
  const sequence = ordered.length ? ordered : (data ?? [])
  const modalIndex = sequence.findIndex((p) => p.slug === caseStudy.slug)
  const modalProject = modalIndex >= 0 ? sequence[modalIndex] : (data ?? []).find((p) => p.slug === caseStudy.slug) ?? null
  const step = (delta) => {
    if (modalIndex < 0 || sequence.length < 2) return
    caseStudy.open(sequence[(modalIndex + delta + sequence.length) % sequence.length].slug)
  }
  const openProject = (project) => caseStudy.open(project.slug)

  return (
    <Section
      id="projects"
      index="01"
      eyebrow="Selected work"
      title="Projects I've built"
      description="Systems I've designed and shipped, from database schema to interface. Open any project for the full case study."
    >
      {status === 'loading' && (
        <div className="project-grid" aria-busy="true">
          <div className="skeleton skeleton--card" />
          <div className="skeleton skeleton--card" />
        </div>
      )}

      {status === 'error' && (
        <Card className="empty-state" role="alert">
          <p>Projects could not be loaded right now.</p>
          <Button onClick={retry} variant="secondary">Try again</Button>
        </Card>
      )}

      {status === 'success' && data.length === 0 && (
        <Card className="empty-state">
          <h3>Projects are on the way.</h3>
          <p>Case studies and project links will appear here soon.</p>
        </Card>
      )}

      {status === 'success' && data.length > 0 && (
        <>
          <div className="projects-toolbar">
            <div className="segmented" role="group" aria-label="Filter projects by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={activeCategory === cat.id}
                  className="segmented__item"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="projects-toolbar__status">
              {selectedTech && (
                <span className="filter-chip">
                  {selectedTech}
                  <button type="button" onClick={() => setSelectedTech(null)} aria-label={`Remove ${selectedTech} filter`}>
                    <Icon name="close" size={12} />
                  </button>
                </span>
              )}
              <span className="projects-toolbar__count" aria-live="polite">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="project-grid">
              {featured && (
                <ProjectCard
                  key={featured.project_id}
                  project={featured}
                  index={data.indexOf(featured)}
                  featured
                  onOpenModal={openProject}
                  onSelectTech={setSelectedTech}
                />
              )}
              {rest.map((project) => (
                <ProjectCard
                  key={project.project_id}
                  project={project}
                  index={data.indexOf(project)}
                  onOpenModal={openProject}
                  onSelectTech={setSelectedTech}
                />
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>No projects match this filter.</p>
              <Button variant="secondary" onClick={resetFilters}>Show all projects</Button>
            </Card>
          )}

          <ProjectCaseStudyModal
            project={modalProject}
            isOpen={Boolean(modalProject)}
            onClose={caseStudy.close}
            position={modalIndex >= 0 ? { index: modalIndex, total: sequence.length } : null}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        </>
      )}
    </Section>
  )
}
