import { useState, useRef } from 'react'
import Badge from '../../../shared/components/ui/Badge.jsx'
import Icon from '../../../shared/components/ui/Icon.jsx'
import { useReveal } from '../../../shared/hooks/useReveal.js'

function safeCoverPath(path) {
  return typeof path === 'string' && path.startsWith('/') && !path.startsWith('//') && !path.includes('..')
}

function shortTitle(title) {
  const [lead] = title.split(' — ')
  return lead.length <= 24 ? lead : lead.split(' ').slice(0, 2).join(' ')
}

// Abstract product frame used until a real screenshot is published.
function CoverPlaceholder({ project, index }) {
  return (
    <div className="project-cover" aria-hidden="true">
      <div className="project-cover__meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.technologies?.[0]?.name ?? 'System'}</span>
      </div>
      <div className="project-cover__frame">
        <div className="project-cover__bar"><i /><i /><i /></div>
        <div className="project-cover__screen">
          <div className="project-cover__side"><b /><b /><b /><b /></div>
          <div className="project-cover__main">
            <b className="project-cover__line project-cover__line--title" />
            <div className="project-cover__tiles"><b /><b /><b /></div>
            <b className="project-cover__line" />
            <b className="project-cover__line project-cover__line--short" />
          </div>
        </div>
      </div>
      <p className="project-cover__name">{shortTitle(project.title)}</p>
    </div>
  )
}

export default function ProjectCard({ project, index, featured = false, onOpenModal, onSelectTech }) {
  const [failedPath, setFailedPath] = useState(null)
  const revealRef = useReveal()
  const cardRef = useRef(null)
  const hasCover = safeCoverPath(project.cover_asset_path) && failedPath !== project.cover_asset_path

  const handlePointerMove = (e) => {
    const card = cardRef.current
    if (!card || e.pointerType !== 'mouse') return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const links = (project.links ?? []).filter((link) => /^https:\/\/[^\s]+$/.test(link.url))

  return (
    <article
      ref={(el) => {
        revealRef.current = el
        cardRef.current = el
      }}
      className={`card project-card ${featured ? 'project-card--featured' : ''}`}
      style={{ '--i': index }}
      onPointerMove={handlePointerMove}
    >
      <button
        type="button"
        className="project-card__visual"
        onClick={() => onOpenModal?.(project)}
        aria-label={`Open case study: ${project.title}`}
      >
        {hasCover ? (
          <img
            src={project.cover_asset_path}
            alt={project.cover_alt_text || ''}
            loading="lazy"
            onError={() => setFailedPath(project.cover_asset_path)}
          />
        ) : (
          <CoverPlaceholder project={project} index={index} />
        )}
        <span className="project-card__hint" aria-hidden="true">
          <span className="project-card__hint-text">View case study</span>
          <Icon name="arrowUpRight" size={15} />
        </span>
      </button>

      <div className="project-card__body">
        <div className="project-card__meta">
          {featured && <Badge tone="solid">Featured</Badge>}
          <Badge tone={project.status === 'completed' ? 'success' : 'progress'}>
            {project.status === 'completed' ? 'Shipped' : 'In progress'}
          </Badge>
        </div>

        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>

        {featured && project.contribution_text && (
          <div className="project-card__role">
            <p className="project-card__label">My role</p>
            <p>{project.contribution_text}</p>
          </div>
        )}

        {project.technologies.length > 0 && (
          <ul className="project-card__technologies" aria-label="Technologies used">
            {project.technologies.map((technology) => (
              <li key={technology.technology_id || technology.name}>
                <button
                  type="button"
                  className="tag tag--interactive"
                  title={`Show projects using ${technology.name}`}
                  onClick={() => onSelectTech?.(technology.name)}
                >
                  {technology.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="project-card__actions">
          <button type="button" className="text-link" onClick={() => onOpenModal?.(project)}>
            Read case study <Icon name="arrowRight" size={15} />
          </button>
          {links.map((link) => (
            <a
              className="text-link text-link--muted"
              href={link.url}
              key={link.link_id || link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} <Icon name="arrowUpRight" size={14} />
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
