import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';

describe('CreateOngController', () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => await app.close());

  it('should be able to create an ong', async () => {
    await request(app.server)
      .post('/ong')
      .send({
        name: 'ONG',
        email: 'ong@ong.com.br',
        zipCode: '12345678',
        address: 'Rua das ONGs, 123',
        latitude: -23.5505,
        longitude: -46.6333,
        phone: '11999999999',
        password: '123456',
      })
      .expect(201);
  });
});
