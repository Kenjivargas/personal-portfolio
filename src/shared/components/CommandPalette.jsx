import { useEffect, useRef, useState, useTransition } from 'react'
import { useToast } from '../context/useToast.js'
import Icon from './ui/Icon.jsx'

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

  const go = (id) => () => { scrollToSection(id); handleClose() }
  const openExternal = (url) => () => {
    window.open(url, '_blank', 'noopener,noreferrer')
    handleClose()
  }

  const commands = [
    { id: 'proj', title: 'Selected work', category: 'Go to', action: go('projects') },
    { id: 'stack', title: 'Stack', category: 'Go to', action: go('stack') },
    { id: 'about', title: 'About', category: 'Go to', action: go('about') },
    { id: 'exp', title: 'Experience & education', category: 'Go to', action: go('experience') },
    { id: 'contact', title: 'Contact', category: 'Go to', action: go('contact') },
    { id: 'copy-email', title: 'Copy email address', category: 'Actions', action: () => {
      navigator.clipboard?.writeText('kenjivargas.dev@gmail.com')
      showToast('Email copied')
      handleClose()
    }},
    { id: 'toggle-theme', title: 'Toggle light / dark theme', category: 'Actions', action: () => {
      handleClose()
      onToggleTheme?.()
    }},
    { id: 'github', title: 'GitHub', category: 'Links', action: openExternal('https://github.com/kenjivargas') },
    { id: 'linkedin', title: 'LinkedIn', category: 'Links', action: openExternal('https://linkedin.com/in/kenjivargas') },
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
          <Icon name="search" size={18} className="command-dialog__search-icon" />
          <input
            ref={inputRef}
            type="search"
            className="command-dialog__input"
            placeholder="Search sections, actions and links…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="command-dialog__esc" onClick={handleClose}>Esc</kbd>
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
                <span className="command-item__title">{cmd.title}</span>
                <span className="command-item__category">{cmd.category}</span>
              </button>
            ))
          ) : (
            <p className="command-dialog__empty">No results.</p>
          )}
        </div>

        <div className="command-dialog__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>Enter</kbd> select</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </dialog>
  )
}
