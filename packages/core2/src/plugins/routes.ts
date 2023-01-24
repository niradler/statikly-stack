import { FastifyPluginCallback, FastifyInstance } from 'fastify';
import Router from '@statikly-stack/router';
import type { Options } from '../utils/config';

const security: FastifyPluginCallback = async function (app: FastifyInstance, options): Promise<void> {
    const { routesDir, routeExt } = options as Options;

    const router = new Router({ path: routesDir });
    const routes = await router.scan();
    for (const url in routes) {
        const route = routes[url];
        console.log(route, routeExt);
        // app.route({
        //     method: 'GET',
        //     url,
        // });
    }
};

export const autoConfig = { name: 'routes', dependencies: ['core', 'security', 'loader'] };

export default security;
