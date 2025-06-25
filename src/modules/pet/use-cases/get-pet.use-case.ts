import { Pet } from 'generated/prisma';
import { PetRepository } from '../repositories/_pet.repository';
import { ResourceNotFoundError } from '@/errors/resource-not-found.error';

interface Request {
  id: string;
}

interface Response {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({ id }: Request): Promise<Response> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
