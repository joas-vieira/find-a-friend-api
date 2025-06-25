import { app } from '@/app';
import { createAndAuthenticateOngUtil } from '@/utils/create-and-authenticate-ong.util';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('SearchPetsController', () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => await app.close());

  it('should be able to search pets by zip code', async () => {
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

    const response = await request(app.server)
      .get('/pet')
      .set('Authorization', `Bearer ${token}`)
      .query({ zipCode: '12345678' })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        pets: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
