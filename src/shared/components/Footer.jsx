import Icon from './ui/Icon.jsx'
import { defaultProfileLinks } from '../data/defaultPortfolioData.js'

const sections = [
  { href: '#projects', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const EMAIL = 'kenjivargas.dev@gmail.com'
const year = new Date().getFullYear()

export default function Footer() {
  const profiles = defaultProfileLinks.filter((link) => link.link_type !== 'email')

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__intro">
            <p className="site-footer__label">Kenji Vargas</p>
            <p className="site-footer__statement">
              Full-stack developer building practical web systems with React, Laravel and PostgreSQL.
            </p>
            <a className="site-footer__email" href={`mailto:${EMAIL}`}>
              {EMAIL} <Icon name="arrowUpRight" size={16} />
            </a>
          </div>

          <div className="site-footer__cols">
            <nav className="site-footer__col" aria-label="Footer sections">
              <p className="site-footer__label">Sections</p>
              <ul>
                {sections.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
              </ul>
            </nav>

            <div className="site-footer__col">
              <p className="site-footer__label">Profiles</p>
              <ul>
                {profiles.map((link) => (
                  <li key={link.link_id}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <Icon name="arrowUpRight" size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SVG keeps the wordmark exactly edge-to-edge at every width. */}
        <svg className="site-footer__wordmark" viewBox="0 0 1000 158" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="wordmark-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <text x="0" y="122" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wordmark-fade)">
            Kenji Vargas
          </text>
        </svg>

        <div className="site-footer__bottom">
          <p>© {year} Kenji Vargas. All rights reserved.</p>
          <p className="site-footer__built">Designed &amp; built by Kenji, with React and Supabase.</p>
          <a href="#home" className="site-footer__top-link">
            Back to top
            <span className="site-footer__top-icon"><Icon name="arrowUp" size={14} /></span>
          </a>
        </div>
      </div>
    </footer>
  )
}
