import { PrismaOngRepository } from '../repositories/prisma-ong.repository';
import { GetOngProfileUseCase } from '../use-cases/get-ong-profile.use.case';

export function makeGetOngProfileUseCase() {
  const ongRepository = new PrismaOngRepository();

  const useCase = new GetOngProfileUseCase(ongRepository);

  return useCase;
}
