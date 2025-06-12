import bcrypt from 'bcryptjs';
import { Ong } from 'generated/prisma';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { OngRepository } from '../repositories/_ong.repository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  ong: Ong;
}

export class AuthenticateOngUseCase {
  constructor(private readonly ongRepository: OngRepository) {}

  async execute({ email, password }: Request): Promise<Response> {
    const ong = await this.ongRepository.findByEmail(email);

    if (!ong) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(password, ong.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return { ong };
  }
}
