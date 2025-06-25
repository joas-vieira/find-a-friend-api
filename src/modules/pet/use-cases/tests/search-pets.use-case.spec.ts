import { InMemoryOngRepository } from '@/modules/ong/repositories/in-memory-ong.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetRepository } from '../../repositories/_pet.repository';
import { InMemoryPetRepository } from '../../repositories/in-memory-pet.repository';
import { SearchPetsUseCase } from '../search-pets.use-case';

describe('SearchPetsUseCase', () => {
  let ongRepository: InMemoryOngRepository;
  let petRepository: PetRepository;
  let sut: SearchPetsUseCase;

  beforeEach(() => {
    ongRepository = new InMemoryOngRepository();
    petRepository = new InMemoryPetRepository(ongRepository);
    sut = new SearchPetsUseCase(petRepository);
  });

  it('should be able to search pets by zip code', async () => {
    await ongRepository.create({
      id: 'ong-id',
      name: 'ONG',
      email: 'ong@ong.com.br',
      zipCode: '12345678',
      address: 'Rua das ONGs, 123',
      latitude: -23.5505,
      longitude: -46.6333,
      phone: '11999999999',
      password: '123456',
    });

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

    const { pets } = await sut.execute({
      zipCode: '12345678',
    });

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    );
  });
});
