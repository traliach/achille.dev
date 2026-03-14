import { ProjectsSection } from '../components/home/ProjectsSection'
import { usePortfolioOutlet } from '../hooks/usePortfolioOutlet'

export function ProjectsPage() {
  const { projects } = usePortfolioOutlet()

  return <ProjectsSection projects={projects} />
}
