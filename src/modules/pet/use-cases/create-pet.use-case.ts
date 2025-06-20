import { Pet } from 'generated/prisma';
import { PetRepository } from '../repositories/_pet.repository';

interface Request {
  name: string;
  about: string;
  age: string;
  size: string;
  energyLevel: string;
  environment: string;
  ongId: string;
}

interface Response {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    ongId,
  }: Request): Promise<Response> {
    const pet = await this.petRepository.create({
      name,
      about,
      age,
      size,
      energyLevel,
      environment,
      ongId,
    });

    return { pet };
  }
}
