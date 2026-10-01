import { useEffect, useState } from 'react'

const PREFIX = '#work/'

function slugFromHash() {
  return window.location.hash.startsWith(PREFIX) ? decodeURIComponent(window.location.hash.slice(PREFIX.length)) : null
}

// Keeps the open case study in the URL so it can be linked to, and so the
// browser back button closes it.
export function useCaseStudyRoute() {
  const [slug, setSlug] = useState(slugFromHash)

  useEffect(() => {
    const sync = () => setSlug(slugFromHash())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = (nextSlug) => {
    const url = `${PREFIX}${encodeURIComponent(nextSlug)}`
    if (slug) {
      window.history.replaceState(window.history.state, '', url)
    } else {
      window.history.pushState({ caseStudy: true }, '', url)
    }
    setSlug(nextSlug)
  }

  const close = () => {
    if (window.history.state?.caseStudy) {
      window.history.back()
    } else {
      window.history.replaceState(null, '', '#projects')
    }
    setSlug(null)
  }

  return { slug, open, close }
}
