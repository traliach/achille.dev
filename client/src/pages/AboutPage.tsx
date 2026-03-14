import { AboutSection } from '../components/home/AboutSection'
import { usePortfolioOutlet } from '../hooks/usePortfolioOutlet'

export function AboutPage() {
  const { profile } = usePortfolioOutlet()

  return <AboutSection profile={profile} />
}
