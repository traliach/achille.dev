import type { SkillGroup } from '../../types/site'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="section" id="skills">
      <div className="surface">
        <span className="eyebrow">Skills</span>
        <h2>Grouped skill modules</h2>
        <p className="section-intro">
          These sections match the server API shape so the next step can swap static content for
          live data without rewriting the UI structure.
        </p>

        <div className="grid grid--cards">
          {skills.map((group) => (
            <article className="surface skill-card" key={group.title}>
              <span className="eyebrow">{group.eyebrow}</span>
              <h3>{group.title}</h3>
              <p className="section-intro">{group.description}</p>
              <ul className="stack-list">
                {group.items.map((item) => (
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
