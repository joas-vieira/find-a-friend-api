import { prisma } from '@/libs/prisma';
import { Pet, Prisma } from 'generated/prisma';
import { PetRepository } from './_pet.repository';

export class PrismaPetRepository implements PetRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } });

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
}
