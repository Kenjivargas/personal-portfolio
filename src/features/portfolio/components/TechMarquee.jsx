import { defaultTechnologyStack } from '../../../shared/data/defaultPortfolioData.js'

const names = defaultTechnologyStack.flatMap((category) => category.technologies.map((t) => t.name))

export default function TechMarquee() {
  return (
    <div className="marquee" aria-label="Technologies I use">
      <div className="marquee__track">
        {/* Second copy makes the loop seamless; it's hidden from assistive tech. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee__list" aria-hidden={copy === 1}>
            {names.map((name) => <li key={name}>{name}</li>)}
          </ul>
        ))}
      </div>
    </div>
  )
}
