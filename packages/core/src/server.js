const Fastify = require('fastify');
const AutoLoad = require('@fastify/autoload')
const { toFilePath, generateSecret, readJSON } = require('./utils/common');

const server = async (options = {}) => {
    const isProd = options.prod || process.env.NODE_ENV === 'production';
    const rootDir = toFilePath(process.env.STATIKLY_ROOT) || toFilePath(options.rootDir) || process.cwd();
    const logOptions = !isProd
        ? {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
        }
        : true;
    const app = options.app || Fastify({ logger: logOptions });
    const appLogger = options.verbose ? console.debug : () => false;
    app._logger = appLogger;
    app._config = {
        ...options,
        port: process.env.PORT || options.port || 3000,
        password: options.password || process.env.STATIKLY_PASSWORD,
        username: options.username || process.env.STATIKLY_USERNAME,
        isProd,
        sessionSecret: options.sessionSecret || process.env.STATIKLY_SESSION_SECRET || (isProd ? '' : generateSecret(32)),
        rootDir,
        publicDir: toFilePath(process.env.STATIKLY_PUBLIC_FOLDER, rootDir) || toFilePath(options.publicDir, rootDir) || toFilePath('./public', rootDir),
        templateEngine: process.env.STATIKLY_TEMPLATE || options.templateEngine || 'ejs',
        layout: options.layout || process.env.STATIKLY_LAYOUT, //relative to root
        viewsDir: toFilePath(process.env.STATIKLY_VIEWS, rootDir) || toFilePath(options.viewsDir, rootDir) || toFilePath('./views', rootDir),
        apiDir: toFilePath(options.apiDir, rootDir) || toFilePath('./api', rootDir),
        viewOptions: await readJSON(options.viewOptions, rootDir),
        modules: options.modules || ['cache', 'session', 'views', 'api', 'public'],
        corsOrigin: options.corsOrigin || ['localhost'],
        context: await readJSON(options.context, rootDir),
        host: options.host ? options.host : 'localhost',
        autoLoad: options.autoLoad || []
    };
    app._logger('app._config', app._config);

    app.register(AutoLoad, {
        dir: toFilePath("plugins", __dirname),
        options: { config: app._config }
    })

    return app;
};

module.exports = server;
