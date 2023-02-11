import URL from 'url';
import fp from 'fastify-plugin';
import { StatiklyPlugin, StatiklyApp, HTTPMethods } from '../utils/types';
import Router from '@statikly-stack/router';
import type { Options } from '../utils/config';

const methods = ['head', 'post', 'put', 'delete', 'options', 'patch', 'get'];

const routesPlugin: StatiklyPlugin = fp(async function (app: StatiklyApp, options): Promise<void> {
    const { routesDir, routeExt, routesGlob } = options as Options;

    const router = new Router({ path: routesDir, glob: routesGlob });
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
        if (!route[routeExt]) continue;
        let controller;
        if (routeExt === 'mjs') {
            controller = await import(URL.pathToFileURL(route[routeExt].path).href);
        } else {
            controller = require(route[routeExt].path);
        }

        if (controller['route']) {
            app.log.debug(`found route: ${route[routeExt].path}`);
            await app.route({
                method: 'GET',
                url,
                ...controller.route,
            });
        }

        const isController = typeof controller === 'function' || typeof controller?.default === 'function';
        if (isController) {
            const defaultController = controller?.default || controller;
            app.log.debug(`found controller: ${route[routeExt].path}`);
            await defaultController(app, url, options);
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
