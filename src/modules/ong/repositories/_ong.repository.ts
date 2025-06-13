import { Ong, Prisma } from 'generated/prisma';

export interface OngRepository {
  findById(id: string): Promise<Ong | null>;
  findByEmail(email: string): Promise<Ong | null>;
  create(data: Prisma.OngCreateInput): Promise<Ong>;
}
