import { useState } from 'react'
import Button from '../../../shared/components/ui/Button.jsx'
import Card from '../../../shared/components/ui/Card.jsx'
import Section from '../../../shared/components/ui/Section.jsx'
import TextField from '../../../shared/components/ui/TextField.jsx'
import { useContactLinks } from '../hooks/useContactLinks.js'
import ContactLink from '../components/ContactLink.jsx'
import { useToast } from '../../../shared/context/useToast.js'

export default function ContactSection() {
  const { status, data, retry } = useContactLinks()
  const { showToast } = useToast()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kenjivargas.dev@gmail.com')
    showToast('Email address copied to clipboard (kenjivargas.dev@gmail.com)!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all fields.')
      return
    }

    // Compose direct mailto link
    const subject = encodeURIComponent(`Inquiry from ${form.name} via Portfolio`)
    const body = encodeURIComponent(`Hi Kenji,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:kenjivargas.dev@gmail.com?subject=${subject}&body=${body}`

    setSubmitted(true)
    showToast('Inquiry drafted in your email client!')
  }

  return (
    <Section id="contact" eyebrow="06 / LET'S CONNECT" title="Have a system to build?" className="contact-section">
      <div className="contact-grid-container">
        {/* Left Card: Direct Channels */}
        <Card className="contact-card">
          <div>
            <p className="contact-card__eyebrow">OPEN FOR OPPORTUNITIES</p>
            <h3>Let’s build reliable software together.</h3>
            <p>
              Whether you need full-stack system architecture, React frontends, robust Laravel APIs, or database engineering, let’s connect.
            </p>
          </div>

          <div className="contact-quick-actions">
            <button type="button" className="button button--primary copy-email-btn" onClick={handleCopyEmail}>
              <span>📋 Copy Email</span>
              <kbd>kenjivargas.dev@gmail.com</kbd>
            </button>
          </div>

          {status === 'loading' && <p className="state-note" role="status">Loading contact options…</p>}
          {status === 'error' && (
            <div role="alert">
              <p>Contact options could not be loaded.</p>
              <Button onClick={retry} variant="secondary">Try again</Button>
            </div>
          )}
          {status === 'success' && data.length > 0 && (
            <div className="contact-card__links" aria-label="Contact options">
              {data.map((link) => (
                <ContactLink key={link.link_id} link={link} />
              ))}
            </div>
          )}
        </Card>

        {/* Right Card: Interactive Quick Message */}
        <Card className="contact-message-card">
          <p className="contact-card__eyebrow">QUICK INQUIRY</p>
          <h4>Send a direct note</h4>
          <p className="contact-message-subtext">Directly initiates an inquiry to Kenji Vargas.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <TextField
              label="Your Name"
              placeholder="e.g. Alex Johnson"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <TextField
              label="Your Email"
              type="email"
              placeholder="alex@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <div className="text-field">
              <label htmlFor="contact-msg">Message</label>
              <textarea
                id="contact-msg"
                className="contact-textarea"
                rows={4}
                placeholder="Tell me about the system, role, or project…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="primary">
              {submitted ? 'Inquiry Sent ✓' : 'Send Message ↗'}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  )
}
