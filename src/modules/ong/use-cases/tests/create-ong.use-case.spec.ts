import { beforeEach, describe, expect, it } from 'vitest';
import { OngRepository } from '../../repositories/_ong.repository';
import { InMemoryOngRepository } from '../../repositories/in-memory-ong.repository';
import { CreateOngUseCase } from '../create-ong.use-case';
import { OngAlreadyExistsError } from '../../errors/ong-already-exists.error';
import { compare } from 'bcryptjs';

describe('CreateOngUseCase', () => {
  let ongRepository: OngRepository;
  let sut: CreateOngUseCase;

  beforeEach(() => {
    ongRepository = new InMemoryOngRepository();
    sut = new CreateOngUseCase(ongRepository);
  });

  it('should be able to create an ong', async () => {
    const { ong } = await sut.execute({
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
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

  it('should not be able to create an ong when ong already exists', async () => {
    await sut.execute({
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'ONG',
        email: 'ong@ong.com.br',
        zipCode: '12345678',
        address: 'Rua das ONGs, 123',
        latitude: -23.5505,
        longitude: -46.6333,
        phone: '11999999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OngAlreadyExistsError);
  });

  it('should hash the password when creating an ong', async () => {
    const { ong } = await sut.execute({
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
      password: '123456',
    });

    const isPasswordCorrect = await compare('123456', ong.password);

    expect(isPasswordCorrect).toBeTruthy();
  });
});
