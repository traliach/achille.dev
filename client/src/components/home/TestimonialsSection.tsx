import type { ChangeEvent, FormEvent } from 'react'
import type {
  SubmitState,
  Testimonial,
  TestimonialSubmissionInput,
} from '../../types/site'

interface TestimonialsSectionProps {
  testimonialForm: TestimonialSubmissionInput
  testimonials: Testimonial[]
  submitState: SubmitState
  submitMessage: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TestimonialsSection({
  testimonialForm,
  testimonials,
  submitState,
  submitMessage,
  onChange,
  onSubmit,
}: TestimonialsSectionProps) {
  return (
    <section className="section" id="testimonials">
      <div className="surface">
        <span className="eyebrow">Testimonials</span>
        <h2>Peer feedback tied to delivery impact</h2>
        <p className="section-intro">
          Approved testimonials appear here publicly. New testimonials can be
          submitted below and move into the admin review queue before publication.
        </p>

        <div className="testimonials-layout">
          <div className="grid grid--cards">
            {testimonials.map((testimonial) => (
              <article className="surface testimonial-card" key={testimonial.quote}>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-meta">
                  {testimonial.role} · {testimonial.company}
                </p>
              </article>
            ))}
          </div>

          <aside className="surface testimonial-submit-card">
            <span className="eyebrow">Submit Testimonial</span>
            <h3>Share feedback for review</h3>
            <p className="section-intro">
              This goes to the admin moderation queue first. It will only appear
              publicly after approval.
            </p>

            <form className="contact-form testimonial-form" onSubmit={onSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>Name</span>
                  <input
                    name="author"
                    value={testimonialForm.author}
                    onChange={onChange}
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={testimonialForm.email}
                    onChange={onChange}
                  />
                </label>
                <label className="field">
                  <span>Role</span>
                  <input
                    name="role"
                    value={testimonialForm.role}
                    onChange={onChange}
                  />
                </label>
                <label className="field">
                  <span>Company</span>
                  <input
                    name="company"
                    value={testimonialForm.company}
                    onChange={onChange}
                  />
                </label>
              </div>

              <label className="field">
                <span>Testimonial</span>
                <textarea
                  name="quote"
                  rows={5}
                  value={testimonialForm.quote}
                  onChange={onChange}
                />
              </label>

              <div className="form-actions">
                <button
                  className="button button--primary"
                  disabled={submitState === 'submitting'}
                  type="submit"
                >
                  {submitState === 'submitting' ? 'Submitting...' : 'Submit for review'}
                </button>
                {submitMessage ? (
                  <p
                    className={[
                      'form-status',
                      submitState === 'success'
                        ? 'form-status--success'
                        : submitState === 'error'
                          ? 'form-status--error'
                          : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {submitMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </aside>
        </div>
      </div>
    </section>
  )
}
