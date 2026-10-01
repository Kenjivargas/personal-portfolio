import { useReveal } from '../../hooks/useReveal.js'

export default function Section({ id, eyebrow, title, description, children, className = '' }) {
  const revealRef = useReveal()

  return (
    <section ref={revealRef} id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="section__heading">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={`${id}-title`}>{title}</h2>
        {description && <p className="section__description">{description}</p>}
      </div>
      {children}
    </section>
  )
}
