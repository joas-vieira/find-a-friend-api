import { Pet } from 'generated/prisma';
import { PetRepository } from '../repositories/_pet.repository';

interface Request {
  zipCode: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  environment?: string;
}

interface Response {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({
    zipCode,
    age,
    size,
    energyLevel,
    environment,
  }: Request): Promise<Response> {
    const pets = await this.petRepository.findMany({
      zipCode,
      age,
      size,
      energyLevel,
      environment,
    });

    return { pets };
  }
}
