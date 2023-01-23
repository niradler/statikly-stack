const fp = require('fastify-plugin')

module.exports = fp(async function (app, { config }) {
    const options = {
        expiresIn: config.expiresIn || 300, serverExpiresIn: config.serverExpiresIn || 300
    }
    await app.register(require('@fastify/caching'), options);
}, {
    name: 'cache',
    dependencies: []
})