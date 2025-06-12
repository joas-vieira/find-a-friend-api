import { OngAlreadyExistsError } from '@/modules/ong/errors/ong-already-exists.error';
import bcrypt from 'bcryptjs';
import { Ong } from 'generated/prisma';
import { OngRepository } from '../repositories/_ong.repository';

interface Request {
  name: string;
  email: string;
  zipCode: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  password: string;
}

interface Response {
  ong: Ong;
}

export class CreateOngUseCase {
  constructor(private readonly ongRepository: OngRepository) {}

  async execute({
    name,
    email,
    zipCode,
    address,
    latitude,
    longitude,
    phone,
    password,
  }: Request): Promise<Response> {
    const ongEmailAlreadyExists = await this.ongRepository.findByEmail(email);

    if (ongEmailAlreadyExists) {
      throw new OngAlreadyExistsError();
    }

    const passwordHash = await bcrypt.hash(password, 6);

    const ong = await this.ongRepository.create({
      name,
      email,
      zipCode,
      address,
      latitude,
      longitude,
      phone,
      password: passwordHash,
    });

    return { ong };
  }
}
