import fp from 'fastify-plugin';
import { StatiklyPlugin, StatiklyApp } from '../utils/types';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import type { Options } from '../utils/config';

const security: StatiklyPlugin = fp(async function (app: StatiklyApp, options): Promise<void> {
    const { corsOrigin, globalHelmet } = options as Options;
    await app.register(cors, {
        origin: corsOrigin,
    });

    await app.register(helmet, { global: globalHelmet });
});

export const autoConfig = { name: 'security', dependencies: [] };

export default security;
