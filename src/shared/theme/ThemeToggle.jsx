import Icon from '../components/ui/Icon.jsx'

export default function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      data-theme-state={theme}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          <Icon name="sun" size={13} className="theme-toggle__sun" />
          <Icon name="moon" size={13} className="theme-toggle__moon" />
        </span>
      </span>
    </button>
  )
}
