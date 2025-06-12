import { beforeEach, describe, expect, it } from 'vitest';
import { OngRepository } from '../../repositories/_ong.repository';
import { InMemoryOngRepository } from '../../repositories/in-memory-ong.repository';
import { AuthenticateOngUseCase } from '../authenticate-ong-use.case';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '../../errors/invalid-credentials.error';

describe('AuthenticateOngUseCase', () => {
  let ongRepository: OngRepository;
  let sut: AuthenticateOngUseCase;

  beforeEach(() => {
    ongRepository = new InMemoryOngRepository();
    sut = new AuthenticateOngUseCase(ongRepository);
  });

  it('should be able to authenticate an ong', async () => {
    await ongRepository.create({
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
      password: await hash('123456', 6),
    });

    const { ong } = await sut.execute({
      email: 'ong@ong.com.br',
      password: '123456',
    });

    expect(ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should not be able to authenticate an ong when ong does not exist', async () => {
    await expect(() =>
      sut.execute({
        email: 'ong@ong.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an ong when password is incorrect', async () => {
    await ongRepository.create({
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
      password: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'ong@ong.com.br',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
