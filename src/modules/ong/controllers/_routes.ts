import { FastifyInstance } from 'fastify';
import { createOngController } from './create-ong.controller';
import { authenticateOngController } from './authenticate-ong.controller';

export async function ongRoutes(app: FastifyInstance) {
  app.post('/ong', createOngController);
  app.post('/ong/authenticate', authenticateOngController);
}
