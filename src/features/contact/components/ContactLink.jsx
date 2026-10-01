function safeHref(href) {
  return /^https:\/\/[^\s]+$/.test(href) || /^mailto:[^\s@]+@[^\s@]+$/.test(href)
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
      <span>{link.label}</span><span aria-hidden="true">↗</span>
    </a>
  )
}
