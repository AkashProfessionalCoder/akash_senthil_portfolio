import type { PortfolioData } from '../../domain/entities/portfolioEntities'

export interface PortfolioDataSource {
  getPortfolioData(): Promise<PortfolioData>;
}
