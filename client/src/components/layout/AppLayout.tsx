import { Outlet } from 'react-router-dom'
import { PortfolioHeader } from '../home/PortfolioHeader'
import { usePortfolioData } from '../../hooks/usePortfolioData'

export function AppLayout() {
  const portfolioData = usePortfolioData()

  return (
    <div className="app-shell">
      <PortfolioHeader
        name={portfolioData.profile.name}
        title={portfolioData.profile.title}
      />
      <Outlet context={portfolioData} />
      <footer className="footer">
        <p>Routed client shell ready. Next step: deepen page-level content and admin workflows.</p>
      </footer>
    </div>
  )
}
