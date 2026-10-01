import { useState, useMemo } from 'react'
import Button from '../../../shared/components/ui/Button.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import TextField from '../../../shared/components/ui/TextField.jsx'
import { useProjects } from '../hooks/useProjects.js'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectCaseStudyModal from '../components/ProjectCaseStudyModal.jsx'

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'full-stack', label: 'Full-Stack' },
  { id: 'database', label: 'Database & Architecture' },
  { id: 'tools', label: 'Tools & AI' },
]

export default function ProjectsSection() {
  const { status, data, retry } = useProjects()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedTech, setSelectedTech] = useState(null)
  const [modalProject, setModalProject] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return (data ?? []).filter((project) => {
      // Tech filter
      if (selectedTech) {
        const hasTech = project.technologies?.some(
          (t) => t.name.toLowerCase() === selectedTech.toLowerCase()
        )
        if (!hasTech) return false
      }

      // Category filter
      if (activeCategory === 'full-stack') {
        const isFS = project.technologies?.some((t) =>
          ['react', 'laravel', 'php', 'rest apis'].some((k) => t.name.toLowerCase().includes(k))
        )
        if (!isFS) return false
      } else if (activeCategory === 'database') {
        const isDB = project.technologies?.some((t) =>
          ['postgresql', 'supabase', 'relational', 'architecture'].some((k) => t.name.toLowerCase().includes(k))
        )
        if (!isDB) return false
      } else if (activeCategory === 'tools') {
        const isTools = project.technologies?.some((t) =>
          ['git', 'ai', 'architecture', 'vite'].some((k) => t.name.toLowerCase().includes(k))
        )
        if (!isTools) return false
      }

      // Search query
      if (normalizedQuery) {
        const searchable = [
          project.title,
          project.summary,
          ...(project.technologies ?? []).map((t) => t.name),
        ].join(' ').toLowerCase()
        if (!searchable.includes(normalizedQuery)) return false
      }

      return true
    })
  }, [data, selectedTech, activeCategory, normalizedQuery])

  return (
    <Section
      id="projects"
      eyebrow="01 / VERIFIED WORK"
      title="Engineered Systems & Projects"
      description="Production systems, architectural decisions, and the technical implementations behind them."
    >
      {status === 'loading' && <p className="state-note" role="status">Loading projects…</p>}
      {status === 'error' && (
        <Card className="empty-state" role="alert">
          <p>Projects could not be loaded right now.</p>
          <Button onClick={retry} variant="secondary">Try again</Button>
        </Card>
      )}

      {status === 'success' && data.length === 0 && (
        <Card className="empty-state empty-state--projects">
          <span className="empty-state__symbol" aria-hidden="true">↗</span>
          <div>
            <h3>Projects are being prepared.</h3>
            <p>Verified case studies and project links will appear here.</p>
          </div>
        </Card>
      )}

      {status === 'success' && data.length > 0 && (
        <>
          {/* Controls Bar */}
          <div className="projects-controls">
            <div className="projects-categories" role="tablist" aria-label="Project categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`category-pill ${activeCategory === cat.id ? 'category-pill--active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id)
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="projects-search-wrapper">
              <TextField
                className="project-search"
                label="Filter projects"
                placeholder="Search by title or tech…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedTech || activeCategory !== 'all' || query) && (
            <div className="active-filters-bar">
              <span className="active-filters-label">Active filters:</span>
              {activeCategory !== 'all' && (
                <span className="filter-chip">
                  Category: {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                  <button type="button" onClick={() => setActiveCategory('all')} aria-label="Clear category filter">✕</button>
                </span>
              )}
              {selectedTech && (
                <span className="filter-chip">
                  Tech: {selectedTech}
                  <button type="button" onClick={() => setSelectedTech(null)} aria-label="Clear tech filter">✕</button>
                </span>
              )}
              {query && (
                <span className="filter-chip">
                  Query: &quot;{query}&quot;
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear search query">✕</button>
                </span>
              )}
              <button
                type="button"
                className="clear-all-filters"
                onClick={() => {
                  setSelectedTech(null)
                  setActiveCategory('all')
                  setQuery('')
                }}
              >
                Reset all
              </button>
            </div>
          )}

          {/* Project Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.project_id}
                  project={project}
                  index={index}
                  onOpenModal={(proj) => setModalProject(proj)}
                  onSelectTech={(tech) => setSelectedTech(tech)}
                />
              ))}
            </div>
          ) : (
            <Card className="empty-state">
              <p>No projects match your current filter criteria.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedTech(null)
                  setActiveCategory('all')
                  setQuery('')
                }}
              >
                Clear all filters
              </Button>
            </Card>
          )}

          {/* Case Study Modal */}
          <ProjectCaseStudyModal
            project={modalProject}
            isOpen={Boolean(modalProject)}
            onClose={() => setModalProject(null)}
          />
        </>
      )}
    </Section>
  )
}
