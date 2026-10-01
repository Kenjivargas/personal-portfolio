import { useState, useRef } from 'react'
import Badge from '../../../shared/components/ui/Badge.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import { useReveal } from '../../../shared/hooks/useReveal.js'

function safeCoverPath(path) {
  return typeof path === 'string' && path.startsWith('/') && !path.startsWith('//') && !path.includes('..')
}

export default function ProjectCard({ project, index, onOpenModal, onSelectTech }) {
  const [failedPath, setFailedPath] = useState(null)
  const revealRef = useReveal()
  const cardRef = useRef(null)
  const hasCover = safeCoverPath(project.cover_asset_path) && failedPath !== project.cover_asset_path

  const notes = [
    ['Problem', project.problem_text],
    ['Solution', project.solution_text],
    ['My contribution', project.contribution_text],
  ].filter(([, value]) => Boolean(value?.trim()))

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  return (
    <Card
      ref={(el) => {
        revealRef.current = el
        cardRef.current = el
      }}
      as="article"
      className={`project-card ${project.is_featured ? 'project-card--featured' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__glow" aria-hidden="true" />
      <div className="project-card__visual">
        {hasCover ? (
          <img
            src={project.cover_asset_path}
            alt={project.cover_alt_text || ''}
            loading="lazy"
            onError={() => setFailedPath(project.cover_asset_path)}
          />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true">
            <div className="project-card__placeholder-top">
              <span>PROJECT / {String(index + 1).padStart(2, '0')}</span>
              <span className="project-card__pulse-dot" />
            </div>
            <strong>{project.title.slice(0, 2).toUpperCase()}</strong>
            <div className="project-card__placeholder-bottom">
              <span>ARCH // {project.technologies?.[0]?.name ?? 'SYSTEM'}</span>
              <span>INSPECT ↗</span>
            </div>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          {project.is_featured && <Badge tone="accent">Featured Project</Badge>}
          <Badge tone={project.status === 'completed' ? 'success' : 'neutral'}>
            {project.status === 'completed' ? 'Completed' : 'In progress'}
          </Badge>
        </div>

        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>

        {project.technologies.length > 0 && (
          <div className="project-card__technologies" aria-label="Technologies used">
            {project.technologies.map((technology) => (
              <button
                key={technology.technology_id || technology.name}
                type="button"
                className="badge badge--interactive"
                title={`Filter by ${technology.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectTech?.(technology.name)
                }}
              >
                {technology.name}
              </button>
            ))}
          </div>
        )}

        {notes.length > 0 && (
          <details className="project-notes">
            <summary>Key Project Insights</summary>
            <div className="project-notes__content">
              {notes.map(([label, value]) => (
                <div key={label}>
                  <h4>{label}</h4>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        <div className="project-card__actions-row">
          <button
            type="button"
            className="button button--secondary button--sm"
            onClick={() => onOpenModal?.(project)}
          >
            Case Study Deep Dive ↗
          </button>

          {project.links?.length > 0 && (
            <div className="project-card__links">
              {project.links
                .filter((link) => /^https:\/\/[^\s]+$/.test(link.url))
                .map((link) => (
                  <a href={link.url} key={link.link_id || link.url} target="_blank" rel="noopener noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
