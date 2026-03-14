import type {
  ContactItem,
  ContactSubmissionInput,
  ContactTopic,
  SubmitState,
} from '../../types/site'

interface ContactSectionProps {
  contactForm: ContactSubmissionInput
  contactItems: ContactItem[]
  contactTopics: ContactTopic[]
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  submitMessage: string
  submitState: SubmitState
}

export function ContactSection({
  contactForm,
  contactItems,
  contactTopics,
  onChange,
  onSubmit,
  submitMessage,
  submitState,
}: ContactSectionProps) {
  return (
    <section className="section" id="contact">
      <div className="surface contact-layout">
        <div>
          <span className="eyebrow">Contact</span>
          <h2>Connected contact flow</h2>
          <p className="section-intro">
            The client now posts to the API. Right now submissions are validated and stored
            in-memory on the server, which is enough to prove the flow before MongoDB is added.
          </p>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="field-grid">
              <label className="field">
                <span>Name</span>
                <input
                  name="name"
                  type="text"
                  value={contactForm.name}
                  onChange={onChange}
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <label className="field">
              <span>Inquiry</span>
              <select
                name="inquiryType"
                value={contactForm.inquiryType}
                onChange={onChange}
              >
                {contactTopics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={onChange}
                placeholder="Share the role, project, or delivery problem you want to discuss."
                rows={5}
                required
              />
            </label>

            <div className="form-actions">
              <button
                className="button button--primary"
                type="submit"
                disabled={submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'Sending...' : 'Send message'}
              </button>

              {submitMessage ? (
                <p className={`form-status form-status--${submitState}`}>{submitMessage}</p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="contact-links">
          {contactItems.map((item) => (
            <article className="surface contact-card" key={item.label}>
              <span className="eyebrow">{item.label}</span>
              {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
