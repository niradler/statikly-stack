import { StatiklyPlugin, StatiklyApp } from '../utils/types';
import routes from '@fastify/routes';
import formbody from '@fastify/formbody';
import sensible from '@fastify/sensible';

const security: StatiklyPlugin = async function (app: StatiklyApp): Promise<void> {
    await app.register(routes);
    await app.register(formbody);
    await app.register(sensible);
};

export const autoConfig = { name: 'core', dependencies: [] };

export default security;
