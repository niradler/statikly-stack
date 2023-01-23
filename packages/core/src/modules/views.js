const fp = require('fastify-plugin')
const { toFilePath } = require('../utils/common');
const { Router } = require('@statikly-stack/router')

const registerViewRoute = async (app, { url, layout, viewPath, extend = {}, hasErrorPage }) => {

    const { actions, viewOption, loader, preHandler } = extend;
    const sessionInstalled = app._config.modules.includes('session');
    const viewRoue = {
        method: 'GET',
        url,
        preHandler: preHandler ? preHandler : undefined,
        handler: async (req, reply) => {
            const data = loader ? await loader(req, reply) : {};
            const viewData = {
                query: req.query,
                params: req.params,
                data,
            };
            if (sessionInstalled) {
                viewData.csrf = await reply.generateCsrf();
            }

            return reply.render(viewPath, viewData, viewOption || { layout });
        },
    };

    if (hasErrorPage) {
        viewRoue.errorHandler = (error, req, reply) => {
            app.log.error(error);
            return reply.render('views/error', {
                query: req.query,
                params: req.params,
                data: {
                    message: app._config.isProd ? 'Something went wrong, please try again' : error.message,
                },
            });
        };
    }

    app.route(viewRoue);

    if (actions) {
        app.route({
            method: ['DELETE', 'PATCH', 'POST', 'PUT'],
            preHandler: sessionInstalled ? app.csrfProtection : undefined,
            url,
            handler: actions,
        });
    }
};




module.exports = fp(async function (app, { config }) {
    const { rootDir, templateEngine, layout, viewsDir, viewOptions, context } = config;
    await app.register(require('@fastify/view'), {
        engine: {
            [templateEngine]: require(templateEngine),
        },
        root: rootDir,
        propertyName: "render",
        defaultContext: {
            context,
            env: process.env,
            fromRoot: (path) => toFilePath(path, rootDir),
        },
        options: viewOptions,
    });

    const router = new Router({ path: viewsDir });
    const routes = await router.scan();
    app._logger('has views ', routes);
    const hasErrorPage = routes['/error']
    for (const url in routes) {
        const route = routes[url];
        if (route[templateEngine]) {
            await registerViewRoute(app, {
                templateEngine,
                url,
                layout,
                viewPath: `views/${route.ejs.dir}/${route.ejs.base}`,
                extend: route.js ? require(route.js.path) : {},
                hasErrorPage,
            });
        }
    }

    app._logger('app views registers complete');
}, {
    name: 'views',
    dependencies: []
})