import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OngAlreadyExistsError } from '../errors/ong-already-exists.error';
import { makeCreateOngUseCase } from '../factories/make-create-ong-use-case.factory';

export async function createOngController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    zipCode: z.string().min(8).max(8),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    phone: z.string().min(11).max(11),
    password: z.string().min(6),
  });

  const {
    name,
    email,
    zipCode,
    address,
    latitude,
    longitude,
    phone,
    password,
  } = bodySchema.parse(request.body);

  const createOngUseCase = makeCreateOngUseCase();

  await createOngUseCase
    .execute({
      name,
      email,
      zipCode,
      address,
      latitude,
      longitude,
      phone,
      password,
    })
    .then(() => reply.status(201).send())
    .catch((error) => {
      if (error instanceof OngAlreadyExistsError) {
        return reply.status(409).send({
          statusCode: 409,
          error: 'Conflict',
          message: error.message,
        });
      }

      throw error;
    });
}
