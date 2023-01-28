import fp from 'fastify-plugin';
import { StatiklyPlugin, StatiklyApp } from '../utils/types';
import type { Options } from '../utils/config';
import routes from '@fastify/routes';
import formbody from '@fastify/formbody';
import sensible from '@fastify/sensible';
import staticPlugin from '@fastify/static';
import multipart from '@fastify/multipart';

const core: StatiklyPlugin = fp(async function (app: StatiklyApp, options): Promise<void> {
    const { publicDir, publicPrefix, prod } = options as Options;
    await app.register(formbody);
    await app.register(routes);
    await app.register(multipart);
    await app.register(sensible);
    await app.register(staticPlugin, {
        root: publicDir,
        prefix: publicPrefix || `/public/`,
        list: !prod,
        index: 'index.html',
    });
});

export const autoConfig = { name: 'core', dependencies: [] };

export default core;
