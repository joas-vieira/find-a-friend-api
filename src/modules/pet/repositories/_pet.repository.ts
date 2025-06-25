import { Pet, Prisma } from 'generated/prisma';

export interface FindManyParams {
  zipCode: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  environment?: string;
}

export interface PetRepository {
  findById(id: string): Promise<Pet | null>;
  findMany(params: FindManyParams): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
