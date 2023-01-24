import { FastifyPluginCallback, FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import type { Options } from '../utils/config';

const security: FastifyPluginCallback = async function (app: FastifyInstance, options): Promise<void> {
    const { corsOrigin } = options as Options;
    await app.register(cors, {
        origin: corsOrigin,
    });
    await app.register(helmet);
};

export const autoConfig = { name: 'security', dependencies: [] };

export default security;
