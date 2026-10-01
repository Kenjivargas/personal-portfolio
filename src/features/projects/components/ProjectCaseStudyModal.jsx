import { useEffect, useRef } from 'react'
import Badge from '../../../shared/components/ui/Badge.jsx'
import Button from '../../../shared/components/ui/Button.jsx'

export default function ProjectCaseStudyModal({ project, isOpen, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && project) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isOpen, project])

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  if (!project) return null

  return (
    <dialog
      ref={dialogRef}
      className="case-study-dialog"
      onClick={handleBackdropClick}
      onCancel={onClose}
      aria-labelledby="case-study-title"
    >
      <div className="case-study-dialog__content">
        {/* Header */}
        <div className="case-study-dialog__header">
          <div className="case-study-dialog__tags">
            {project.is_featured && <Badge tone="accent">Featured Project</Badge>}
            <Badge tone={project.status === 'completed' ? 'success' : 'neutral'}>
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </Badge>
          </div>
          <button
            type="button"
            className="case-study-dialog__close"
            onClick={onClose}
            aria-label="Close case study"
          >
            ✕
          </button>
        </div>

        {/* Title & Summary */}
        <h2 id="case-study-title" className="case-study-dialog__title">
          {project.title}
        </h2>
        <p className="case-study-dialog__summary">{project.summary}</p>

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="case-study-dialog__technologies" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <Badge key={tech.technology_id || tech.name}>{tech.name}</Badge>
            ))}
          </div>
        )}

        <hr className="case-study-dialog__divider" />

        {/* Detailed Sections */}
        <div className="case-study-dialog__body">
          {project.problem_text && (
            <div className="case-study-block">
              <h3>The Challenge & Context</h3>
              <p>{project.problem_text}</p>
            </div>
          )}

          {project.solution_text && (
            <div className="case-study-block">
              <h3>Architecture & Solution</h3>
              <p>{project.solution_text}</p>
            </div>
          )}

          {project.contribution_text && (
            <div className="case-study-block">
              <h3>Key Responsibilities & Contribution</h3>
              <p>{project.contribution_text}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="case-study-dialog__footer">
          {project.links?.map((link) => (
            <Button
              key={link.link_id || link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant={link.link_type === 'live' || link.link_type === 'case_study' ? 'primary' : 'secondary'}
            >
              {link.label} ↗
            </Button>
          ))}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </dialog>
  )
}
