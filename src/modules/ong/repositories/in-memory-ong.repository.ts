import { Ong, Prisma } from 'generated/prisma';
import { OngRepository } from './_ong.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryOngRepository implements OngRepository {
  private items: Ong[] = [];

  async findByEmail(email: string): Promise<Ong | null> {
    const ong = this.items.find((item) => item.email === email);

    return ong ?? null;
  }

  async create(data: Prisma.OngCreateInput): Promise<Ong> {
    const ong: Ong = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      zipCode: data.zipCode,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(ong);

    return ong;
  }
}
