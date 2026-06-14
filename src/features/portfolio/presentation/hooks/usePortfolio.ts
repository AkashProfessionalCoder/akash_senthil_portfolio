import { useQuery } from '@tanstack/react-query'
import { StaticPortfolioDataSource } from '../../data/datasources/StaticPortfolioDataSource'
import { PortfolioRepositoryImpl } from '../../data/repositories/PortfolioRepositoryImpl'
import { GetPortfolioDataUseCase } from '../../domain/usecases/GetPortfolioDataUseCase'

// Dependency Injection Setup
const dataSource = new StaticPortfolioDataSource()
const repository = new PortfolioRepositoryImpl(dataSource)
const getPortfolioDataUseCase = new GetPortfolioDataUseCase(repository)

export const usePortfolio = () => {
  return useQuery({
    queryKey: ['portfolioData'],
    queryFn: () => getPortfolioDataUseCase.execute(),
  })
}
