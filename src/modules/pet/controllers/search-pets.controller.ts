import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSearchPetsUseCase } from '../factories/make-search-pets-use-case.factory';

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    zipCode: z.string().min(8).max(8),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    environment: z.string().optional(),
  });

  const { zipCode, age, size, energyLevel, environment } = querySchema.parse(
    request.query,
  );

  const searchPetsUseCase = makeSearchPetsUseCase();

  const { pets } = await searchPetsUseCase.execute({
    zipCode,
    age,
    size,
    energyLevel,
    environment,
  });

  return reply.status(200).send({ pets });
}
