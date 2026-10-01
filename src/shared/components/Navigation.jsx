import ThemeToggle from '../theme/ThemeToggle.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation({ theme, onToggleTheme, onOpenCommandPalette }) {
  const activeSection = useActiveSection()

  return (
    <header className="site-header">
      <ScrollProgress />
      <div className="site-header__inner container">
        <a className="brand" href="#home" aria-label="Kenji Vargas, back to top">
          <span className="brand__mark" aria-hidden="true">KV<span>.</span></span>
          <span className="brand__name">Kenji Vargas</span>
        </a>

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
            className="nav-cmd-button"
            onClick={onOpenCommandPalette}
            title="Search & Quick Actions (Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <span aria-hidden="true">⌕</span>
            <span className="nav-cmd-text">Quick Search</span>
            <kbd className="nav-cmd-kbd">Ctrl K</kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}
