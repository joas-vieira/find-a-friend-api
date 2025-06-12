import { FastifyInstance } from 'fastify';
import { createOngController } from './create-ong.controller';

export async function ongRoutes(app: FastifyInstance) {
  app.post('/ong', createOngController);
}
