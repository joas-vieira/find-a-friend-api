import { verifyJwt } from '@/middlewares/verify-jwt.middleware';
import { FastifyInstance } from 'fastify';
import { createPetController } from './create-pet.controller';
import { getPetController } from './get-pet.controller';
import { searchPetsController } from './search-pets.controller';

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/pet', createPetController);
  app.get('/pet', searchPetsController);
  app.get('/pet/:id', getPetController);
}
