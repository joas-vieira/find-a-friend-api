import { ResourceNotFoundError } from '@/errors/resource-not-found.error';
import { InMemoryOngRepository } from '@/modules/ong/repositories/in-memory-ong.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetRepository } from '../../repositories/_pet.repository';
import { InMemoryPetRepository } from '../../repositories/in-memory-pet.repository';
import { GetPetUseCase } from '../get-pet.use-case';

describe('GetPetUseCase', () => {
  let ongRepository: InMemoryOngRepository;
  let petRepository: PetRepository;
  let sut: GetPetUseCase;

  beforeEach(() => {
    ongRepository = new InMemoryOngRepository();
    petRepository = new InMemoryPetRepository(ongRepository);
    sut = new GetPetUseCase(petRepository);
  });

  it('should be able to get a pet by id', async () => {
    await petRepository.create({
      id: 'pet-id',
      ongId: 'ong-id',
      name: 'Buddy',
      about: 'Pet description',
      age: 'Adult',
      size: 'Medium',
      energyLevel: 'High',
      environment: 'House',
    });

    const { pet } = await sut.execute({
      id: 'pet-id',
    });

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should not be able to get a pet when pet does not exist', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-pet-id' }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
