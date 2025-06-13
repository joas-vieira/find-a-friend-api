import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify().catch(() => {
    reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
    });
  });
}
