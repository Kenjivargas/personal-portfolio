import Icon from '../../../shared/components/ui/Icon.jsx'

function safeHref(href) {
  return /^https:\/\/[^\s]+$/.test(href) || /^mailto:[^\s@]+@[^\s@]+$/.test(href)
}

function displayHref(href) {
  return href.replace(/^https:\/\/(www\.)?/, '').replace(/^mailto:/, '')
}

export default function ContactLink({ link }) {
  if (!safeHref(link.href)) return null
  const external = link.href.startsWith('https://')

  return (
    <a
      className="contact-link"
      href={link.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span className="contact-link__label">{link.label}</span>
      <span className="contact-link__href">{displayHref(link.href)}</span>
      <Icon name="arrowUpRight" size={18} className="contact-link__arrow" />
    </a>
  )
}
