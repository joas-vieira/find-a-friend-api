import { app } from '@/app';
import { prisma } from '@/libs/prisma';
import { createAndAuthenticateOngUtil } from '@/utils/create-and-authenticate-ong.util';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('GetPetController', () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => await app.close());

  it('should be able to get a pet by id', async () => {
    const { token } = await createAndAuthenticateOngUtil(app);

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        about: 'Pet description',
        age: 'Adult',
        size: 'Medium',
        energyLevel: 'High',
        environment: 'House',
      })
      .expect(201);

    const { id } = await prisma.pet.findFirstOrThrow();

    const response = await request(app.server)
      .get(`/pet/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      }),
    );
  });
});
