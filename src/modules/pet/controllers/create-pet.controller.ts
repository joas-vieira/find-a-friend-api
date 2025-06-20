import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreatePetUseCase } from '../factories/make-create-pet-use-case.factory';

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  });

  const { name, about, age, size, energyLevel, environment } = bodySchema.parse(
    request.body,
  );

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    ongId: request.user.sub,
  });

  return reply.status(201).send();
}
