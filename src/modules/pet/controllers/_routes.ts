import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/middlewares/verify-jwt.middleware';
import { createPetController } from './create-pet.controller';

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/pet', createPetController);
}
