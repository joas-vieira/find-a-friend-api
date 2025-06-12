import { Ong, Prisma } from 'generated/prisma';

export interface OngRepository {
  findByEmail(email: string): Promise<Ong | null>;
  create(data: Prisma.OngCreateInput): Promise<Ong>;
}
