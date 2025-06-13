import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateOngUtil(app: FastifyInstance) {
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

  const authResponse = await request(app.server)
    .post('/ong/authenticate')
    .send({
      email: 'ong@ong.com.br',
      password: '123456',
    })
    .expect(200);

  const { token } = authResponse.body;

  return { token };
}
