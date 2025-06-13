import { FastifyInstance } from 'fastify';
import { createOngController } from './create-ong.controller';
import { authenticateOngController } from './authenticate-ong.controller';
import { getOngProfileController } from './get-ong-profile.controller';
import { verifyJwt } from '@/middlewares/verify-jwt.middleware';

export async function ongRoutes(app: FastifyInstance) {
  app.post('/ong', createOngController);
  app.post('/ong/authenticate', authenticateOngController);

  app.get('/ong/me', { preHandler: [verifyJwt] }, getOngProfileController);
}
