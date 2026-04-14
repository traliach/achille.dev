import type { ProjectSummary } from '../../types/site'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
  metricBadgeClass,
} from './styles'
import { Eyebrow, SurfaceCard, Tag } from './ui'

interface ProjectCaseStudyCardProps {
  project: ProjectSummary
  layout?: 'full' | 'stacked'
}

const DEVOPS_TITLES = new Set([
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
  'devops_platform — Self-Hosted DevOps Platform',
  'Global PACS — Hybrid Cloud Medical Imaging',
  'Mercedes-Benz DMS — Pipeline Modernization',
])

function getCategory(title: string): string {
  return DEVOPS_TITLES.has(title) ? 'DevOps / Cloud / IaC' : 'Full-Stack Application'
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3.5 1H1v10h10V8.5M11 1H6.5M11 1v4.5M11 1L5.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectLinks({ repoUrl, liveUrl }: { repoUrl?: string; liveUrl?: string }) {
  if (!repoUrl && !liveUrl) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold text-muted transition duration-200 hover:border-accent/25 hover:text-accent-deep"
        >
          <ExternalLinkIcon />
          View repo
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold text-muted transition duration-200 hover:border-accent/25 hover:text-accent-deep"
        >
          <ExternalLinkIcon />
          View live
        </a>
      )}
    </div>
  )
}

export function ProjectCaseStudyCard({
  project,
  layout = 'stacked',
}: ProjectCaseStudyCardProps) {
  const isFeaturedLayout = layout === 'full'
  const visibleOutcomes = isFeaturedLayout ? project.outcomes : project.outcomes.slice(0, 2)

  return (
    <SurfaceCard
      padding={isFeaturedLayout ? 'roomy' : 'default'}
      tone={isFeaturedLayout ? 'accent' : 'default'}
      className={cx(
        'group h-full transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
        !isFeaturedLayout && 'hover:border-accent/15',
      )}
    >
      {isFeaturedLayout ? (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(290px,0.75fr)]">
          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-4">
                <Eyebrow>{getCategory(project.title)}</Eyebrow>
                <div className="space-y-3">
                  <h2 className={headingClasses.section}>{project.title}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className={metaClass}>{project.role}</p>
                    <span className="h-1 w-1 rounded-full bg-stone-300" />
                    <p className={metaClass}>{project.timeframe}</p>
                  </div>
                </div>
              </div>
              <Tag className="border-accent/15 bg-accent-soft/60 text-accent-deep">
                {project.timeframe}
              </Tag>
            </div>

            <p className="max-w-3xl text-[1.05rem] leading-8 text-muted sm:text-lg">
              {project.summary}
            </p>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-line/60 bg-white/80 p-5 sm:p-6">
                <p className={finePrintClass}>Delivery need</p>
                <p className={cx(bodyClass, 'mt-3')}>{project.challenge}</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-white/80 p-5 sm:p-6">
                <p className={finePrintClass}>Execution</p>
                <p className={cx(bodyClass, 'mt-3')}>{project.solution}</p>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-5 rounded-2xl border border-line/60 bg-white/80 p-5 sm:p-6">
            <div className="space-y-3">
              <p className={finePrintClass}>Delivery profile</p>
              <div className="grid gap-3">
                {project.metrics.map((metric) => (
                  <div className={metricBadgeClass} key={metric.label}>
                    <p className={finePrintClass}>{metric.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className={finePrintClass}>Operational result</p>
              <ul className="grid gap-3">
                {visibleOutcomes.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className={bodyClass}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className={finePrintClass}>Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>

            <ProjectLinks repoUrl={project.repoUrl} liveUrl={project.liveUrl} />
          </aside>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <Eyebrow>{getCategory(project.title)}</Eyebrow>
                <div className="space-y-2">
                  <h2 className={headingClasses.card}>{project.title}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className={metaClass}>{project.role}</p>
                    <span className="h-1 w-1 rounded-full bg-stone-300" />
                    <p className={metaClass}>{project.timeframe}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.metrics.slice(0, 2).map((metric) => (
                  <Tag className="bg-surface-tinted text-muted" key={metric.label}>
                    {metric.value}
                  </Tag>
                ))}
              </div>
            </div>

            <p className="text-base leading-8 text-muted">{project.summary}</p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-line/60 bg-surface-tinted p-5">
              <p className={finePrintClass}>Delivery need</p>
              <p className={cx(bodyClass, 'mt-3')}>{project.challenge}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.88fr)]">
              <div className="rounded-2xl border border-line/60 bg-surface-tinted p-5">
                <p className={finePrintClass}>Execution</p>
                <p className={cx(bodyClass, 'mt-3')}>{project.solution}</p>
              </div>

              <div className="rounded-2xl border border-line/60 bg-white p-5">
                <p className={finePrintClass}>Operational result</p>
                <ul className="mt-3 grid gap-3">
                  {visibleOutcomes.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className={bodyClass}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-3 border-t border-line/60 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <ProjectLinks repoUrl={project.repoUrl} liveUrl={project.liveUrl} />
          </div>
        </div>
      )}
    </SurfaceCard>
  )
}
