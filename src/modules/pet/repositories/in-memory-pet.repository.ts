import { Pet, Prisma } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { PetRepository } from './_pet.repository';

export class InMemoryPetRepository implements PetRepository {
  private items: Pet[] = [];

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    return pet ?? null;
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
