import { PrismaPetRepository } from '../repositories/prisma-pet.repository';
import { CreatePetUseCase } from '../use-cases/create-pet.use-case';

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetRepository();

  const useCase = new CreatePetUseCase(petRepository);

  return useCase;
}
