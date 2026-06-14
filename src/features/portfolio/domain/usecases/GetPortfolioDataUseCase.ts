import type { PortfolioRepository } from '../repositories/PortfolioRepository'
import type { PortfolioData } from '../entities/portfolioEntities'

export class GetPortfolioDataUseCase {
  private repository: PortfolioRepository;

  constructor(repository: PortfolioRepository) {
    this.repository = repository
  }

  async execute(): Promise<PortfolioData> {
    return this.repository.getPortfolioData()
  }
}
