import type { Highlight } from '../../types/site'

interface HighlightsSectionProps {
  items: Highlight[]
}

export function HighlightsSection({ items }: HighlightsSectionProps) {
  return (
    <section className="section">
      <div className="surface">
        <span className="eyebrow">Foundation</span>
        <h2>Week 1 progress, inside the new client.</h2>
        <p className="section-intro">
          This shell replaces the Vite starter page and reads from the future API shape already.
          When the server is running, the status pill turns online and the client can read
          profile, project, and skill data from `/api`.
        </p>

        <div className="grid grid--metrics">
          {items.map((item) => (
            <article className="surface metric-card" key={item.label}>
              <span className="eyebrow">{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
