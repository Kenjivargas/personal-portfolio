import { useState } from 'react'
import Button from '../../../shared/components/ui/Button.jsx'
import Icon from '../../../shared/components/ui/Icon.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import { useContactLinks } from '../hooks/useContactLinks.js'
import ContactLink from '../components/ContactLink.jsx'
import { useToast } from '../../../shared/context/useToast.js'

const EMAIL = 'kenjivargas.dev@gmail.com'

export default function ContactSection() {
  const { status, data, retry } = useContactLinks()
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      showToast('Email copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Could not copy. Select the address instead.')
    }
  }

  const socialLinks = (data ?? []).filter((link) => link.link_type !== 'email')

  return (
    <Section id="contact" index="05" eyebrow="Contact" title="Say hello" className="contact-section">
      <div className="contact">
        <div className="contact__lead">
          <p className="contact__text">
            Questions about a project, feedback on the work, or just want to talk shop? Email is the best way to reach me.
          </p>
          <div className="contact__email-row">
            <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button
              type="button"
              className="icon-button"
              onClick={handleCopyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              title="Copy email"
            >
              <Icon name={copied ? 'check' : 'copy'} size={17} />
            </button>
          </div>
        </div>

        <div className="contact__links">
          {status === 'loading' && <p className="state-note" role="status">Loading links…</p>}
          {status === 'error' && (
            <div role="alert">
              <p className="state-note">Links could not be loaded.</p>
              <Button onClick={retry} variant="secondary" size="sm">Try again</Button>
            </div>
          )}
          {status === 'success' && socialLinks.length > 0 && (
            <ul aria-label="Profiles">
              {socialLinks.map((link) => (
                <li key={link.link_id}><ContactLink link={link} /></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  )
}
