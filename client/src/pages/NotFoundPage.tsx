import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="section">
      <div className="surface">
        <span className="eyebrow">404</span>
        <h2>Page not found</h2>
        <p className="section-intro">
          This route does not exist in the portfolio client yet.
        </p>
        <Link className="button button--primary" to="/">
          Back to overview
        </Link>
      </div>
    </section>
  )
}
