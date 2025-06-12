import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('AuthenticateOngController', () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => await app.close());

  it('should be able to authenticate an ong', async () => {
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

    const response = await request(app.server)
      .post('/ong/authenticate')
      .send({
        email: 'ong@ong.com.br',
        password: '123456',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });
});
