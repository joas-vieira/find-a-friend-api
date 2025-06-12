import { env } from '@/env';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export async function handleGlobalError(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    //TODO: Here we should log to an external service
  }

  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Internal Server Error',
  });
}
