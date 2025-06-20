import { beforeEach, describe, expect, it } from 'vitest';
import { PetRepository } from '../../repositories/_pet.repository';
import { InMemoryPetRepository } from '../../repositories/in-memory-pet.repository';
import { CreatePetUseCase } from '../create-pet.use-case';

describe('CreatePetUseCase', () => {
  let petRepository: PetRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
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
