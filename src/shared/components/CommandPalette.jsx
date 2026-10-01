import { useEffect, useRef, useState, useTransition } from 'react'
import { useToast } from '../context/useToast.js'

function scrollToSection(id) {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function CommandPalette({ isOpen, onClose, onToggleTheme }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleClose = () => {
    onClose()
    startTransition(() => {
      setQuery('')
      setSelectedIndex(0)
    })
  }

  const commands = [
    { id: 'proj', title: 'Jump to Projects', category: 'Navigation', icon: '↗', action: () => { scrollToSection('projects'); handleClose() } },
    { id: 'stack', title: 'Jump to Tech Stack', category: 'Navigation', icon: '⚡', action: () => { scrollToSection('stack'); handleClose() } },
    { id: 'about', title: 'Jump to About Me', category: 'Navigation', icon: '✦', action: () => { scrollToSection('about'); handleClose() } },
    { id: 'exp', title: 'Jump to Experience & Journey', category: 'Navigation', icon: '⏱', action: () => { scrollToSection('experience'); handleClose() } },
    { id: 'contact', title: 'Jump to Contact', category: 'Navigation', icon: '✉', action: () => { scrollToSection('contact'); handleClose() } },
    { id: 'copy-email', title: 'Copy Email Address (kenjivargas.dev@gmail.com)', category: 'Quick Action', icon: '📋', action: () => {
      navigator.clipboard.writeText('kenjivargas.dev@gmail.com')
      showToast('Email address copied to clipboard!')
      handleClose()
    }},
    { id: 'toggle-theme', title: 'Toggle Theme (Light / Dark)', category: 'Preferences', icon: '◑', action: () => {
      onToggleTheme?.()
      showToast('Theme updated!')
      handleClose()
    }},
    { id: 'github', title: 'View GitHub Profile (@kenjivargas)', category: 'External', icon: '↗', action: () => {
      window.open('https://github.com/kenjivargas', '_blank', 'noopener,noreferrer')
      handleClose()
    }},
    { id: 'linkedin', title: 'Connect on LinkedIn', category: 'External', icon: '↗', action: () => {
      window.open('https://linkedin.com/in/kenjivargas', '_blank', 'noopener,noreferrer')
      handleClose()
    }},
  ]

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.trim().toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.trim().toLowerCase())
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
        inputRef.current?.focus()
      }
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  // Keyboard navigation inside command palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + (filteredCommands.length || 1)) % (filteredCommands.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action()
      }
    }
  }

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      handleClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="command-dialog"
      onClick={handleBackdropClick}
      onCancel={handleClose}
      aria-label="Quick Command Palette"
    >
      <div className="command-dialog__inner">
        <div className="command-dialog__header">
          <span className="command-dialog__search-icon" aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            type="search"
            className="command-dialog__input"
            placeholder="Type a command or search sections, actions, links…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="command-dialog__esc" onClick={handleClose}>ESC</kbd>
        </div>

        <div className="command-dialog__list" role="listbox">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <button
                type="button"
                key={cmd.id}
                role="option"
                aria-selected={idx === selectedIndex}
                className={`command-item ${idx === selectedIndex ? 'command-item--active' : ''}`}
                onClick={cmd.action}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="command-item__icon" aria-hidden="true">{cmd.icon}</span>
                <span className="command-item__title">{cmd.title}</span>
                <span className="command-item__category">{cmd.category}</span>
              </button>
            ))
          ) : (
            <p className="command-dialog__empty">No matching commands found.</p>
          )}
        </div>

        <div className="command-dialog__footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </dialog>
  )
}
