import { FastifyPluginCallback, FastifyInstance } from 'fastify';
import routes from '@fastify/routes';
import formbody from '@fastify/formbody';
import sensible from '@fastify/sensible';

const security: FastifyPluginCallback = async function (app: FastifyInstance): Promise<void> {
    await app.register(routes);
    await app.register(formbody);
    await app.register(sensible);
};

export const autoConfig = { name: 'core', dependencies: [] };

export default security;
