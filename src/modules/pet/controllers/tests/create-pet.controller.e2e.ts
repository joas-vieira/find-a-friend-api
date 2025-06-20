import { app } from '@/app';
import { createAndAuthenticateOngUtil } from '@/utils/create-and-authenticate-ong.util';
import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';

describe('CreatePetController', () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => await app.close());

  it('should be able to create a pet', async () => {
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
  });
});
