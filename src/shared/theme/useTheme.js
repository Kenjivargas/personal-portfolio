import { useEffect, useState } from 'react'

const storageKey = 'portfolio-theme'

function savedTheme() {
  try {
    const saved = window.localStorage.getItem(storageKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [preference, setPreference] = useState(savedTheme)
  const [system, setSystem] = useState(systemTheme)
  const theme = preference ?? system

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101010' : '#f5f5f5')
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setSystem(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setPreference(next)
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#101010' : '#f5f5f5')
    try {
      window.localStorage.setItem(storageKey, next)
    } catch {
      // Theme remains usable when storage is unavailable.
    }
  }

  return { theme, toggleTheme }
}
