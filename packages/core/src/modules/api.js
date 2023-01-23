const fp = require('fastify-plugin')
const { fileExists } = require('../utils/common');
const { Router } = require('@statikly-stack/router')

module.exports = fp(async function (app, { config }) {
    const { apiDir } = config;
    const hasApi = await fileExists(apiDir);
    app._logger('has api routes', hasApi);
    if (hasApi) {
        const router = new Router({ path: apiDir, glob: `**/*.js` })
        const routes = await router.scan();
        for (const url in routes) {
            const route = routes[url];
            const controller = require(route.js.path);
            const methods = ['head', 'post', 'put', 'delete', 'options', 'patch', 'get'];

            await app.register(
                function (app, _, done) {
                    methods.forEach((method) => {
                        if (controller[method]) {
                            app._logger('api register', method.toUpperCase(), url);
                            app.route({
                                method: method.toUpperCase(),
                                url: url,
                                handler: controller[method].handler,
                                preHandler: controller[method].preHandler,
                                onRequest: controller[method].onRequest,
                                schema: controller[method].schema,
                                onError: controller[method].onError,
                                errorHandler: controller[method].errorHandler,
                                constraints: controller[method].constraints,
                                preValidation: controller[method].preValidation,
                            });
                        }
                    });
                    done();
                },
                { prefix: '/api' }
            );
        }
    }
    app._logger('app apis registers complete');
}, {
    name: 'api',
    dependencies: []
})