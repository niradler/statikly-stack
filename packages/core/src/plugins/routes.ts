import fp from 'fastify-plugin';
import { StatiklyPlugin, StatiklyApp, HTTPMethods } from '../utils/types';
import Router from '@statikly-stack/router';
import type { Options } from '../utils/config';

const methods = ['head', 'post', 'put', 'delete', 'options', 'patch', 'get'];

const routesPlugin: StatiklyPlugin = fp(async function (app: StatiklyApp, options): Promise<void> {
    const { routesDir, routeExt } = options as Options;
    const router = new Router({ path: routesDir });
    const routes = await router.scan();
    app.addHook('onSend', (req, res, payload, done) => {
        const err = null;
        if (typeof payload === 'string' && payload.includes('<!DOCTYPE html>')) {
            res.type('text/html');
        }

        done(err, payload);
    });
    for (const url in routes) {
        app.log.debug(`found url: ${url}`);
        const route = routes[url];
        const controller = require(route[routeExt].path);
        if (controller['route']) {
            app.log.debug(`found route: ${route[routeExt].path}`);
            await app.route({
                method: 'GET',
                url,
                ...controller.route,
            });
        }

        for (const method of methods) {
            const upperMethod = method.toUpperCase() as HTTPMethods;
            const routeHandler = controller[method] || controller[upperMethod];
            if (!routeHandler) continue;
            app.log.debug(`found method: ${upperMethod}, route: ${route[routeExt].path}`);
            if (typeof routeHandler === 'function') {
                await app.route({
                    method: upperMethod,
                    url,
                    handler: routeHandler,
                });
            } else {
                await app.route({
                    method: upperMethod,
                    url,
                    ...routeHandler,
                });
            }
        }
    }
});

export const autoConfig = { name: 'routes', dependencies: ['core', 'security', 'loader'] };

export default routesPlugin;
