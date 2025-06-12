import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { makeAuthenticateOngUseCase } from '../factories/make-authenticate-ong-use-case.factory';

export async function authenticateOngController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  const authenticateOngUseCase = makeAuthenticateOngUseCase();

  try {
    const { ong } = await authenticateOngUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      { sign: { sub: ong.id, expiresIn: '7d' } },
    );

    reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: error.message,
      });
    }

    throw error;
  }
}
