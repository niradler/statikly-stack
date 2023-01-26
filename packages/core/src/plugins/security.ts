import { StatiklyPlugin, StatiklyApp } from '../utils/types';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import type { Options } from '../utils/config';

const security: StatiklyPlugin = async function (app: StatiklyApp, options): Promise<void> {
    const { corsOrigin } = options as Options;
    await app.register(cors, {
        origin: corsOrigin,
    });
    await app.register(helmet);
};

export const autoConfig = { name: 'security', dependencies: [] };

export default security;
