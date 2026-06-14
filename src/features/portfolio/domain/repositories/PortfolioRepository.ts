import type { PortfolioData } from '../entities/portfolioEntities'

export interface PortfolioRepository {
  getPortfolioData(): Promise<PortfolioData>;
}
