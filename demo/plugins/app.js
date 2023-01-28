const { common } = require('@statikly-stack/core')

module.exports = async function (app, options) {
    const { expiresIn = 300, serverExpiresIn = 300, sessionSecret = common.generateSecret(32) } = options

    await app.register(require('@fastify/caching'), {
        expiresIn: expiresIn, serverExpiresIn: serverExpiresIn
    });

    await app.register(require('@fastify/cookie'), { secret: sessionSecret });
    await app.register(require('@fastify/session'), { secret: sessionSecret, cookie: { secure: 'auto' } });
    await app.register(require('@fastify/flash'));

    console.log("app loaded successfully")
}

module.exports.autoConfig = { name: 'app', dependencies: [] };