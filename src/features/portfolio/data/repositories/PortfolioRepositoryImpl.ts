import type { PortfolioRepository } from '../../domain/repositories/PortfolioRepository'
import type { PortfolioDataSource } from '../datasources/PortfolioDataSource'
import type { PortfolioData } from '../../domain/entities/portfolioEntities'

export class PortfolioRepositoryImpl implements PortfolioRepository {
  private dataSource: PortfolioDataSource;

  constructor(dataSource: PortfolioDataSource) {
    this.dataSource = dataSource
  }

  async getPortfolioData(): Promise<PortfolioData> {
    return this.dataSource.getPortfolioData()
  }
}
