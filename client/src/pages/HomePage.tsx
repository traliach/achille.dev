import { lazy, Suspense } from 'react'
import { ApiStatusBadge } from '../components/site/ApiStatusBadge'
import { JsonLd } from '../components/site/JsonLd'
import { ProjectCaseStudyCard } from '../components/site/ProjectCaseStudyCard'
import { FeaturedCaseStudy } from '../components/work/FeaturedCaseStudy'
import {
  ButtonLink,
  CtaBand,
  Eyebrow,
  KpiStrip,
  PageIntro,
  SiteSection,
  SurfaceCard,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  finePrintClass,
  headingClasses,
} from '../components/site/styles'
import type {
  ApiHealth,
  ApiState,
  ProfileContent,
  ProjectSummary,
  Testimonial,
} from '../types/site'
import { createPersonJsonLd } from '../utils/seo'

const HeroOpsVisual = lazy(() => import('../components/home/HeroOpsVisual'))

interface HomePageProps {
  apiState: ApiState
  health: ApiHealth | null
  profile: ProfileContent
  projects: ProjectSummary[]
  testimonials: Testimonial[]
}

const TRUST_ITEMS = [
  'Terraform',
  'Kubernetes',
  'AWS',
  'Docker',
  'Jenkins',
  'ArgoCD',
  'Prometheus',
  'GitHub Actions',
  'React',
  'TypeScript',
  'Node.js',
  'MongoDB',
]

const FEATURED_PROJECT_TITLES = [
  'cloud_resume_infra — AWS Resume Platform',
  'k8s-platform-lab — Self-Hosted Kubernetes Platform',
  'devops_platform — Self-Hosted DevOps Platform',
]

const PROOF_ITEMS = [
  {
    label: 'Current role',
    value: 'Teledyne / CARIS',
    detail: 'EKS, Jenkins, Helm, Terraform, Prometheus across 4 clusters.',
  },
  {
    label: 'Certifications',
    value: 'AWS DevOps Pro',
    detail: 'AWS Certified DevOps Engineer – Professional + Cloud Practitioner.',
  },
  {
    label: 'Full-stack',
    value: 'MERN',
    detail: 'React 19 + TypeScript + Node/Express + MongoDB. This site is the proof.',
  },
  {
    label: 'Infrastructure',
    value: 'IaC + GitOps',
    detail: 'Terraform modules, ArgoCD App-of-Apps, Helm rollback workflows.',
  },
]

const CAPABILITIES = [
  {
    title: 'Platform engineering',
    summary: 'Design the internal delivery path so teams can deploy, observe, and recover with less guesswork.',
    tools: ['Kubernetes', 'GitOps', 'SLOs'],
  },
  {
    title: 'Full-stack delivery',
    summary: 'Ship React and Node applications with deployment, API, data, and operational paths considered together.',
    tools: ['React', 'Express', 'MongoDB'],
  },
  {
    title: 'CI/CD modernization',
    summary: 'Turn fragile manual release steps into reviewed, repeatable pipelines with useful quality gates.',
    tools: ['GitHub Actions', 'Jenkins', 'Audit gates'],
  },
  {
    title: 'Cloud infrastructure',
    summary: 'Build AWS foundations with clear network, compute, IAM, and environment boundaries.',
    tools: ['AWS', 'Terraform', 'IAM'],
  },
  {
    title: 'Kubernetes enablement',
    summary: 'Make container platforms easier to deploy, monitor, and hand off without hiding the operational details.',
    tools: ['EKS', 'k3s', 'Helm'],
  },
  {
    title: 'Cloud cost control',
    summary: 'Review resource shape, automation, and environment usage before cost problems become permanent habits.',
    tools: ['FinOps', 'Rightsizing', 'Cost review'],
  },
  {
    title: 'Observability',
    summary: 'Add the signals teams need for triage: metrics, logs, health checks, and deploy visibility.',
    tools: ['Prometheus', 'Grafana', 'CloudWatch'],
  },
]


function getFeaturedProjects(projects: ProjectSummary[]) {
  return FEATURED_PROJECT_TITLES
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is ProjectSummary => project !== undefined)
}

export function HomePage({
  apiState,
  health,
  profile,
  projects,
}: HomePageProps) {
  const featuredProjects = getFeaturedProjects(projects)
  const primaryFeaturedProject = featuredProjects[0]
  const supportingFeaturedProjects = featuredProjects.slice(1)

  return (
    <>
      <JsonLd data={createPersonJsonLd(profile)} />

      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)] lg:items-center">
          <div className="min-w-0 space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{profile.location}</Eyebrow>
              <span className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted">
                {profile.currentEmployer ?? 'Teledyne Technologies Inc'}
              </span>
              <ApiStatusBadge health={health} state={apiState} />
            </div>

            <div className="space-y-5">
              <h1 className={headingClasses.display}>
                DevOps Engineer. Full-Stack Builder. AWS Certified.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                5+ years shipping CI/CD pipelines, Kubernetes platforms, and
                cloud infrastructure on AWS — plus production MERN applications
                end to end. Currently at Teledyne Technologies. Open to senior
                DevOps, SRE, and platform engineering roles.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/work">
                View work
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink
                className="w-full sm:w-auto"
                href={profile.links.resume}
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                Resume
              </ButtonLink>
            </div>

            <TrustChips items={TRUST_ITEMS} />
          </div>

          <Suspense
            fallback={
              <SurfaceCard className="min-h-[420px] animate-pulse" tone="accent">
                <p className={finePrintClass}>Loading release visual</p>
              </SurfaceCard>
            }
          >
            <HeroOpsVisual />
          </Suspense>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <KpiStrip className="reveal" items={PROOF_ITEMS} />
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-8">
          <PageIntro
            description="From Kubernetes platforms and CI/CD pipelines to production MERN applications — these are the areas where I have shipped real work and can contribute from day one."
            eyebrow="Capabilities"
            size="section"
            title="What I bring to a senior DevOps or platform engineering role."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <SurfaceCard
                className="flex h-full flex-col gap-5 transition duration-200 hover:border-accent/40 hover:shadow-card-hover"
                key={capability.title}
                padding="compact"
              >
                <div className="space-y-3">
                  <p className={finePrintClass}>Capability</p>
                  <h2 className={headingClasses.card}>{capability.title}</h2>
                  <p className={bodyClass}>{capability.summary}</p>
                </div>
                <TrustChips className="mt-auto" items={capability.tools} />
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection>
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <PageIntro
            description="Selected projects show the implementation shape behind the positioning: IaC, CI/CD, Kubernetes, observability, and application delivery."
            eyebrow="Selected work"
            size="section"
            title="Project proof with real delivery systems."
          />

          <SurfaceCard className="flex flex-col gap-3" padding="compact" tone="subdued">
            <p className={finePrintClass}>Proof standard</p>
            <p className={bodyClass}>
              Claims are tied to live projects, repositories, architecture choices,
              or documented operational checks.
            </p>
          </SurfaceCard>
        </div>

        {primaryFeaturedProject ? (
          <div className="reveal stagger-2 mt-8 grid gap-6">
            <FeaturedCaseStudy project={primaryFeaturedProject} />

            {supportingFeaturedProjects.length ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {supportingFeaturedProjects.map((project) => (
                  <ProjectCaseStudyCard key={project.title} project={project} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </SiteSection>

      <SiteSection>
        <CtaBand
          actions={
            <>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink
                href={profile.links.resume}
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                Download resume
              </ButtonLink>
            </>
          }
          description="AWS Certified DevOps Engineer with production EKS, Terraform, and full-stack delivery experience. Based in Newark, NJ. Available onsite or hybrid."
          title="Open to senior DevOps, SRE, and platform engineering roles."
        />
      </SiteSection>
    </>
  )
}
