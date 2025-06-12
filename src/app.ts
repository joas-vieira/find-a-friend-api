import fastify from 'fastify';
import { handleGlobalError } from './handlers/global-error.handler';
import { ongRoutes } from './modules/ong/controllers/_routes';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(ongRoutes);

app.setErrorHandler(handleGlobalError);
