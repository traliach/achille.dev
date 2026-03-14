import { useOutletContext } from 'react-router-dom'
import type { usePortfolioData } from './usePortfolioData'

export type PortfolioOutletContext = ReturnType<typeof usePortfolioData>

export function usePortfolioOutlet() {
  return useOutletContext<PortfolioOutletContext>()
}
