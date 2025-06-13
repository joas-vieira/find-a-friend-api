import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetOngProfileUseCase } from '../factories/make-get-ong-profile-use-case.factory';

export async function getOngProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOngProfileUseCase = makeGetOngProfileUseCase();

  const { ong } = await getOngProfileUseCase.execute({
    ongId: request.user.sub,
  });

  return reply.status(200).send({
    ong: {
      ...ong,
      password: undefined,
    },
  });
}
