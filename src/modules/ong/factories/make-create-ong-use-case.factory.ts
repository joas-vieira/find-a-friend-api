import { PrismaOngRepository } from '../repositories/prisma-ong.repository';
import { CreateOngUseCase } from '../use-cases/create-ong.use-case';

export function makeCreateOngUseCase() {
  const ongRepository = new PrismaOngRepository();

  const useCase = new CreateOngUseCase(ongRepository);

  return useCase;
}
