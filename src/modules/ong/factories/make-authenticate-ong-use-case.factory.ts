import { PrismaOngRepository } from '../repositories/prisma-ong.repository';
import { AuthenticateOngUseCase } from '../use-cases/authenticate-ong-use.case';

export function makeAuthenticateOngUseCase() {
  const ongRepository = new PrismaOngRepository();

  const useCase = new AuthenticateOngUseCase(ongRepository);

  return useCase;
}
