import { useReveal } from '../../hooks/useReveal.js'

export default function Section({ id, index, eyebrow, title, description, children, className = '' }) {
  const revealRef = useReveal()

  return (
    <section ref={revealRef} id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="section__heading">
        <div className="section__titles">
          {eyebrow && (
            <p className="eyebrow">
              {index && <span className="eyebrow__index">{index}</span>}
              {eyebrow}
            </p>
          )}
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        {description && <p className="section__description">{description}</p>}
      </div>
      {children}
    </section>
  )
}
