import { FastifyPluginCallback, FastifyInstance, HTTPMethods } from 'fastify';
import Router from '@statikly-stack/router';
import type { Options } from '../utils/config';

const methods = ['head', 'post', 'put', 'delete', 'options', 'patch', 'get'];

const routesPlugin: FastifyPluginCallback = async function (app: FastifyInstance, options): Promise<void> {
    const { routesDir, routeExt } = options as Options;
    const router = new Router({ path: routesDir });
    const routes = await router.scan();

    for (const url in routes) {
        const route = routes[url];
        const controller = require(route[routeExt].path);
        if (controller['route']) {
            app.log.debug(`route: ${route[routeExt].path}`);
            app.route({
                method: 'GET',
                url,
                ...controller.route,
            });
        }

        for (const method of methods) {
            const upperMethod = method.toUpperCase() as HTTPMethods;
            const routeHandler = controller[method] || controller[upperMethod];
            if (!routeHandler) continue;
            app.log.debug(`method: ${upperMethod}, route: ${route[routeExt].path}`);
            if (typeof routeHandler === 'function') {
                app.route({
                    method: upperMethod,
                    url,
                    handler: routeHandler,
                });
            } else {
                app.route({
                    method: upperMethod,
                    url,
                    ...routeHandler,
                });
            }
        }
    }
};

export const autoConfig = { name: 'routes', dependencies: ['core', 'security', 'loader'] };

export default routesPlugin;
