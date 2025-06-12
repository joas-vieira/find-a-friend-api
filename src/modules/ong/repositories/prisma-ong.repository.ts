import { prisma } from '@/libs/prisma';
import { Ong, Prisma } from 'generated/prisma';
import { OngRepository } from './_ong.repository';

export class PrismaOngRepository implements OngRepository {
  async findByEmail(email: string): Promise<Ong | null> {
    const ong = await prisma.ong.findUnique({ where: { email } });

    return ong;
  }

  async create(data: Prisma.OngCreateInput): Promise<Ong> {
    const ong = await prisma.ong.create({ data });

    return ong;
  }
}
