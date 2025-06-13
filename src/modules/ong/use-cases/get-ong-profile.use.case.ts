import { Ong } from 'generated/prisma';
import { ResourceNotFoundError } from '../../../errors/resource-not-found.error';
import { OngRepository } from '../repositories/_ong.repository';

interface Request {
  ongId: string;
}

interface Response {
  ong: Ong;
}

export class GetOngProfileUseCase {
  constructor(private readonly ongRepository: OngRepository) {}

  async execute({ ongId }: Request): Promise<Response> {
    const ong = await this.ongRepository.findById(ongId);

    if (!ong) {
      throw new ResourceNotFoundError();
    }

    return { ong };
  }
}
