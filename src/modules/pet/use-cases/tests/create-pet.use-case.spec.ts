import { beforeEach, describe, expect, it } from 'vitest';
import { PetRepository } from '../../repositories/_pet.repository';
import { InMemoryPetRepository } from '../../repositories/in-memory-pet.repository';
import { CreatePetUseCase } from '../create-pet.use-case';
import { InMemoryOngRepository } from '@/modules/ong/repositories/in-memory-ong.repository';

describe('CreatePetUseCase', () => {
  let ongRepository: InMemoryOngRepository;
  let petRepository: PetRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    ongRepository = new InMemoryOngRepository();
    petRepository = new InMemoryPetRepository(ongRepository);
    sut = new CreatePetUseCase(petRepository);
  });

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Buddy',
      about: 'Pet description',
      age: 'Adult',
      size: 'Medium',
      energyLevel: 'High',
      environment: 'House',
      ongId: 'ong-id',
    });

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
});
