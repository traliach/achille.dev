import type { ProjectSummary } from '../../types/site'

interface ProjectsSectionProps {
  projects: ProjectSummary[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section" id="projects">
      <div className="surface">
        <span className="eyebrow">Projects</span>
        <h2>API-ready project cards</h2>
        <p className="section-intro">
          The project structure is already typed so it can later move out of hardcoded content
          and into Mongo-backed data.
        </p>

        <div className="grid grid--cards">
          {projects.map((project) => (
            <article className="surface project-card" key={project.title}>
              <span className="eyebrow">{project.title}</span>
              <p className="project-meta">{project.timeframe}</p>
              <p>{project.summary}</p>
              <ul className="stack-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul>
                {project.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
