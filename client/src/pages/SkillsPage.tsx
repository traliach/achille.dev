import { SkillsSection } from '../components/home/SkillsSection'
import { usePortfolioOutlet } from '../hooks/usePortfolioOutlet'

export function SkillsPage() {
  const { skills } = usePortfolioOutlet()

  return <SkillsSection skills={skills} />
}
