import Button from '../../../shared/components/ui/Button.jsx'
import Icon from '../../../shared/components/ui/Icon.jsx'
import HeroVisualConsole from './HeroVisualConsole.jsx'
import portraitSrc from '../../../assets/KenjiVargas.webp'

const headline = [['Building'], ['practical'], ['web', true], ['systems.', true]]

const facts = [
  ['Focus', 'Full-stack web systems'],
  ['Core stack', 'React, Laravel, PostgreSQL'],
  ['Currently', 'Building ISMERS'],
]

export default function HeroSection({ profile, profileStatus }) {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-section__grid">
        <div className="hero-section__copy">
          <div className="hero-section__identity">
            <img className="hero-section__avatar" src={portraitSrc} alt="" width="40" height="40" />
            <div>
              <p className="hero-section__name">Kenji Vargas</p>
              <p className="hero-section__role">Full-stack developer · Portfolio</p>
            </div>
          </div>

          <h1 id="hero-title" className="hero-section__title">
            <span className="sr-only">Building practical web systems.</span>
            <span aria-hidden="true">
              {headline.map(([word, accent], i) => (
                <span key={word} className={`hero-word ${accent ? 'hero-section__accent' : ''}`} style={{ '--w': i }}>
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-section__intro">
            {profile?.short_intro ??
              'Specializing in scalable web architectures, modern React frontends, robust backend systems, and AI-assisted workflows.'}
          </p>

          <div className="hero-section__actions">
            <Button href="#projects">
              View selected work <Icon name="arrowRight" size={16} />
            </Button>
            <Button href="#about" variant="ghost">About me</Button>
          </div>

          {profileStatus === 'error' && (
            <p className="subtle-note" role="status">Showing saved profile details.</p>
          )}
        </div>

        <div className="hero-section__console-wrapper">
          <HeroVisualConsole />
        </div>
      </div>

      <div className="container">
        <dl className="hero-facts">
          {facts.map(([term, value]) => (
            <div key={term} className="hero-facts__item">
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
