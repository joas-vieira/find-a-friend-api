import { prisma } from '@/libs/prisma';
import { Pet, Prisma } from 'generated/prisma';
import { FindManyParams, PetRepository } from './_pet.repository';

export class PrismaPetRepository implements PetRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } });

    return pet;
  }

  async findMany(params: FindManyParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        ong: {
          zipCode: params.zipCode,
        },
        age: params.age,
        size: params.size,
        energyLevel: params.energyLevel,
        environment: params.environment,
      },
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
}
