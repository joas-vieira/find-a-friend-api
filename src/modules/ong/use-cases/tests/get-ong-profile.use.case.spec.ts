import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { OngRepository } from '../../repositories/_ong.repository';
import { InMemoryOngRepository } from '../../repositories/in-memory-ong.repository';
import { GetOngProfileUseCase } from '../get-ong-profile.use.case';
import { ResourceNotFoundError } from '@/errors/resource-not-found.error';

describe('GetOngProfileUseCase', () => {
  let ongRepository: OngRepository;
  let sut: GetOngProfileUseCase;

  beforeEach(() => {
    ongRepository = new InMemoryOngRepository();
    sut = new GetOngProfileUseCase(ongRepository);
  });

  it('should be able to get an ong profile', async () => {
    const ongCreated = await ongRepository.create({
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
      password: await hash('123456', 6),
    });

    const { ong } = await sut.execute({ ongId: ongCreated.id });

    expect(ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should not be able to get an ong profile when ong does not exist', async () => {
    await expect(() =>
      sut.execute({ ongId: 'non-existing-ong-id' }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
