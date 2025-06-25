import { PrismaPetRepository } from '../repositories/prisma-pet.repository';
import { GetPetUseCase } from '../use-cases/get-pet.use-case';

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetRepository();

  const useCase = new GetPetUseCase(petRepository);

  return useCase;
}
