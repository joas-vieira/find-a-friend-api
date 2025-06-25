import { ResourceNotFoundError } from '@/errors/resource-not-found.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetPetUseCase } from '../factories/make-get-pet-use-case.factory';

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const getPetUseCase = makeGetPetUseCase();

  const { pet } = await getPetUseCase.execute({ id }).catch((error) => {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: error.message,
      });
    }

    throw error;
  });

  return reply.status(200).send({ pet });
}
