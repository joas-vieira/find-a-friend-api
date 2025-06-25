import { Pet, Prisma } from 'generated/prisma';

export interface PetRepository {
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
