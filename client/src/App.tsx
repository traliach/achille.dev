import { ErrorBoundary } from './components/ErrorBoundary'
import { AdminPage } from './pages/AdminPage'
import { PublicSite } from './pages/PublicSite'
import { ResumePage } from './pages/ResumePage'

function App() {
  const path = window.location.pathname
  const isAdminPath = path.startsWith('/admin')
  const isResumePath = path === '/resume'

  return (
    <ErrorBoundary>
      {isAdminPath ? <AdminPage /> : isResumePath ? <ResumePage /> : <PublicSite />}
    </ErrorBoundary>
  )
}

export default App
