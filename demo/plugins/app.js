const { common, plugin } = require('@statikly-stack/core')

module.exports = plugin(async function (app, options) {
    const { expiresIn = 300, serverExpiresIn = 300, sessionSecret = common.generateSecret() } = options
    await app.register(require('@fastify/caching'), {
        expiresIn: expiresIn, serverExpiresIn
    });

    await app.register(require('@fastify/cookie'), { secret: sessionSecret });
    await app.register(require('@fastify/session'), { secret: sessionSecret, cookie: { secure: 'auto' } });
    await app.register(require('@fastify/flash'));

    app.log.debug("app loaded successfully");
})

module.exports.autoConfig = { name: 'app', dependencies: [] };