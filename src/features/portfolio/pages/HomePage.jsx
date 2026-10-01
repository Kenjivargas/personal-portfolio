import { useState, useEffect } from 'react'
import Navigation from '../../../shared/components/Navigation.jsx'
import Footer from '../../../shared/components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import TechStackSection from '../components/TechStackSection.jsx'
import AboutSection from '../components/AboutSection.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'
import EducationSection from '../components/EducationSection.jsx'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import ProjectsSection from '../../projects/pages/ProjectsSection.jsx'
import ContactSection from '../../contact/pages/ContactSection.jsx'
import CommandPalette from '../../../shared/components/CommandPalette.jsx'
import AnimatedGridBackground from '../../../shared/components/AnimatedGridBackground.jsx'
import { ToastProvider } from '../../../shared/context/ToastContext.jsx'

export default function HomePage({ theme, onToggleTheme }) {
  const { profile, technologyStack } = usePortfolioData()
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <ToastProvider>
      <AnimatedGridBackground />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
      />
      <main id="main">
        <HeroSection
          profile={profile.data}
          profileStatus={profile.status}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
        />
        <div className="container main-sections">
          <ProjectsSection />
          <TechStackSection resource={technologyStack} />
          <AboutSection profile={profile.data} profileStatus={profile.status} retry={profile.retry} />
          <div className="background-grid">
            <ExperienceSection />
            <EducationSection />
          </div>
          <ContactSection />
        </div>
      </main>
      <Footer />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onToggleTheme={onToggleTheme}
      />
    </ToastProvider>
  )
}
