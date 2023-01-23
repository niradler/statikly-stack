const fp = require('fastify-plugin')

module.exports = fp(async function (app, { config }) {
    const { corsOrigin } = config;
    await app.register(require('@fastify/cors'), {
        origin: corsOrigin,
    });
    await app.register(require('@fastify/helmet'));


}, {
    name: 'security',
    dependencies: []
})