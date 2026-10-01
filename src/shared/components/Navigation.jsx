import { useEffect, useRef, useState } from 'react'
import ThemeToggle from '../theme/ThemeToggle.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import Icon from './ui/Icon.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { defaultProfileLinks } from '../data/defaultPortfolioData.js'

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function Brand({ onClick }) {
  return (
    <a className="brand" href="#home" aria-label="Kenji Vargas, back to top" onClick={onClick}>
      <span className="brand__mark" aria-hidden="true">KV</span>
      <span className="brand__name">Kenji Vargas</span>
    </a>
  )
}

export default function Navigation({ theme, onToggleTheme, onOpenCommandPalette }) {
  const activeSection = useActiveSection()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const toggle = toggleRef.current
    const onKeyDown = (e) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    const desktop = window.matchMedia('(min-width: 900px)')
    const onResize = () => { if (desktop.matches) setIsMenuOpen(false) }

    document.documentElement.classList.add('is-menu-open')
    closeRef.current?.focus({ preventScroll: true })
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.documentElement.classList.remove('is-menu-open')
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
      toggle?.focus({ preventScroll: true })
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const setTheme = (next) => (event) => {
    if (theme !== next) onToggleTheme(event)
  }

  return (
    <>
      <header className="site-header" data-scrolled={isScrolled}>
        <ScrollProgress />
        <div className="site-header__inner">
          <Brand />

          <nav className="site-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-header__controls">
            <button
              type="button"
              className="nav-search"
              onClick={onOpenCommandPalette}
              title="Search (Ctrl+K)"
              aria-label="Open search"
            >
              <Icon name="search" size={16} />
              <span className="nav-search__text">Search</span>
              <kbd className="nav-search__kbd">Ctrl K</kbd>
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="menu-toggle__bar" />
              <span className="menu-toggle__bar" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={isMenuOpen}
        inert={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="mobile-menu__top">
          <Brand onClick={closeMenu} />
          <button ref={closeRef} type="button" className="mobile-menu__close" onClick={closeMenu}>
            Close <Icon name="close" size={16} />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ '--i': i }}
              aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
              onClick={closeMenu}
            >
              <span className="mobile-menu__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="mobile-menu__label">{link.label}</span>
              <Icon name="arrowRight" size={20} className="mobile-menu__arrow" />
            </a>
          ))}
        </nav>

        <div className="mobile-menu__bottom">
          <div className="mobile-menu__row">
            <span className="mobile-menu__caption">Appearance</span>
            <div className="mobile-menu__theme" role="group" aria-label="Color theme">
              {['light', 'dark'].map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={theme === option}
                  onClick={setTheme(option)}
                >
                  <Icon name={option === 'light' ? 'sun' : 'moon'} size={14} />
                  {option === 'light' ? 'Light' : 'Dark'}
                </button>
              ))}
            </div>
          </div>

          <div className="mobile-menu__socials">
            {defaultProfileLinks.map((link) => (
              <a
                key={link.link_id}
                href={link.href}
                target={link.href.startsWith('https://') ? '_blank' : undefined}
                rel={link.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
              >
                {link.label} <Icon name="arrowUpRight" size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
