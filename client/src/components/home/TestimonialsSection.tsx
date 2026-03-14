import type { Testimonial } from '../../types/site'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="section" id="testimonials">
      <div className="surface">
        <span className="eyebrow">Testimonials</span>
        <h2>Peer feedback tied to delivery impact</h2>
        <p className="section-intro">
          This section is now API-ready as well, so peer quotes can move into a
          managed content module instead of staying hardcoded in the client.
        </p>

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
      </div>
    </section>
  )
}
