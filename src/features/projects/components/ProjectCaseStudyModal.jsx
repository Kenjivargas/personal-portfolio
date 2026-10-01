import { useEffect, useRef } from 'react'
import Badge from '../../../shared/components/ui/Badge.jsx'
import Button from '../../../shared/components/ui/Button.jsx'
import Icon from '../../../shared/components/ui/Icon.jsx'

const SWIPE_CLOSE_DISTANCE = 110

export default function ProjectCaseStudyModal({ project, isOpen, onClose, position, onPrev, onNext }) {
  const dialogRef = useRef(null)
  const scrollRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && project) {
      if (!dialog.open) dialog.showModal()
      scrollRef.current?.scrollTo({ top: 0 })
    } else if (dialog.open) {
      dialog.close()
    }
  }, [isOpen, project])

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  const canStep = position && position.total > 1

  const handleKeyDown = (e) => {
    if (!canStep || e.target.closest('input, textarea')) return
    if (e.key === 'ArrowRight') { e.preventDefault(); onNext?.() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev?.() }
  }

  // Bottom sheet on phones: drag the top bar down to dismiss.
  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' || e.target.closest('button')) return
    if (!window.matchMedia('(max-width: 639px)').matches) return
    dragRef.current = { startY: e.clientY, dy: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
    dialogRef.current.style.transition = 'none'
  }

  const handlePointerMove = (e) => {
    if (!dragRef.current) return
    const dy = Math.max(0, e.clientY - dragRef.current.startY)
    dragRef.current.dy = dy
    dialogRef.current.style.transform = `translateY(${dy}px)`
  }

  const handlePointerUp = () => {
    if (!dragRef.current) return
    const { dy } = dragRef.current
    const dialog = dialogRef.current
    dragRef.current = null
    dialog.style.transition = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'
    if (dy > SWIPE_CLOSE_DISTANCE) {
      dialog.style.transform = 'translateY(100%)'
      setTimeout(() => {
        onClose()
        dialog.style.transform = ''
        dialog.style.transition = ''
      }, 260)
    } else {
      dialog.style.transform = ''
    }
  }

  if (!project) return null

  const blocks = [
    ['Context', 'The problem', project.problem_text],
    ['Approach', 'What was built', project.solution_text],
    ['My contribution', 'What I owned', project.contribution_text],
  ].filter(([, , text]) => Boolean(text?.trim()))

  const links = (project.links ?? []).filter((link) => /^https:\/\/[^\s]+$/.test(link.url))
  const isShipped = project.status === 'completed'

  return (
    <dialog
      ref={dialogRef}
      className="case-study-dialog"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      aria-labelledby="case-study-title"
    >
      {/* Fixed bar: stays in place while the content scrolls */}
      <div
        className="case-study-dialog__bar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="case-study-dialog__tags">
          <span className="case-study-dialog__kicker">Case study</span>
          <Badge tone={isShipped ? 'success' : 'progress'}>{isShipped ? 'Shipped' : 'In progress'}</Badge>
          {canStep && (
            <span className="case-study-dialog__counter" aria-live="polite">
              {position.index + 1} / {position.total}
            </span>
          )}
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close case study">
          <Icon name="close" size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="case-study-dialog__scroll" key={project.slug}>
        <header className="case-study-dialog__intro">
          <h2 id="case-study-title" className="case-study-dialog__title">{project.title}</h2>
          <p className="case-study-dialog__summary">{project.summary}</p>

          <dl className="case-study-dialog__facts">
            <div>
              <dt>Status</dt>
              <dd>{isShipped ? 'Shipped' : 'In progress'}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.technologies?.length ?? 0} technologies</dd>
            </div>
            {project.technologies?.[0] && (
              <div>
                <dt>Built with</dt>
                <dd>{project.technologies[0].name}</dd>
              </div>
            )}
          </dl>
        </header>

        <div className="case-study-dialog__body">
          {blocks.map(([label, kicker, text], i) => (
            <section key={label} className="case-study-block">
              <div className="case-study-block__head">
                <span className="case-study-block__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="case-study-block__kicker">{kicker}</span>
              </div>
              <h3>{label}</h3>
              <p>{text}</p>
            </section>
          ))}
        </div>

        {project.technologies?.length > 0 && (
          <div className="case-study-dialog__stack">
            <p className="case-study-dialog__label">Technologies</p>
            <ul className="case-study-dialog__technologies" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <li key={tech.technology_id || tech.name} className="tag">{tech.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="case-study-dialog__footer">
        {links.map((link) => (
          <Button
            key={link.link_id || link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant={link.link_type === 'live' || link.link_type === 'case_study' ? 'primary' : 'secondary'}
          >
            {link.label} <Icon name="arrowUpRight" size={15} />
          </Button>
        ))}
        {canStep && (
          <div className="case-study-dialog__pager">
            <button type="button" className="icon-button" onClick={onPrev} aria-label="Previous project" title="Previous (←)">
              <Icon name="arrowRight" size={16} className="icon--flip" />
            </button>
            <button type="button" className="case-study-dialog__next" onClick={onNext} title="Next (→)">
              <span className="case-study-dialog__next-label">Next project</span>
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
