import { PrismaPetRepository } from '../repositories/prisma-pet.repository';
import { SearchPetsUseCase } from '../use-cases/search-pets.use-case';

export function makeSearchPetsUseCase() {
  const petRepository = new PrismaPetRepository();

  const useCase = new SearchPetsUseCase(petRepository);

  return useCase;
}
