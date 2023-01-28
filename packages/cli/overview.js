const Fastify = require('fastify')
const { root } = require('@statikly-stack/core');

const overview = async (options) => {
    const { port, host } = options;
    const app = Fastify({
        logger: {
            level: options.logLevel ? options.logLevel : 'info',
        },
    });
    await app.register(require('fastify-overview'))
    await app.register(root, options);
    await app.register(require('fastify-overview-ui'))
    await app.ready();

    await app.listen({ port, host }).catch(async e => {
        await app.close()
        throw e;
    });
}

module.exports = overview