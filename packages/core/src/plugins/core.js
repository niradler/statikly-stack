const fp = require('fastify-plugin')

module.exports = fp(async function (app) {
    await app.register(require('@fastify/routes'));
    await app.register(require('@fastify/formbody'));
    await app.register(require('@fastify/sensible'));


}, {
    name: 'core',
    dependencies: []
})