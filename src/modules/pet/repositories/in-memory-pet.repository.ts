import { InMemoryOngRepository } from '@/modules/ong/repositories/in-memory-ong.repository';
import { Pet, Prisma } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { FindManyParams, PetRepository } from './_pet.repository';

export class InMemoryPetRepository implements PetRepository {
  constructor(private readonly ongRepository: InMemoryOngRepository) {}

  items: Pet[] = [];

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    return pet ?? null;
  }

  async findMany(params: FindManyParams): Promise<Pet[]> {
    const ongsByZipCode = this.ongRepository.items.filter(
      (ong) => ong.zipCode === params.zipCode,
    );

    const pets = this.items
      .filter((item) => ongsByZipCode.some((ong) => ong.id === item.ongId))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energyLevel ? item.energyLevel === params.energyLevel : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      );

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      environment: data.environment,
      ongId: data.ongId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
