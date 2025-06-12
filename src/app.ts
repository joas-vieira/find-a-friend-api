import fastify from 'fastify';
import { handleGlobalError } from './handlers/global-error.handler';
import { ongRoutes } from './modules/ong/controllers/_routes';

export const app = fastify();

app.register(ongRoutes);

app.setErrorHandler(handleGlobalError);
