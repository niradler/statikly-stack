const fastifyStatic = require('@fastify/static')
const fp = require('fastify-plugin')

module.exports = fp(async function (app, { config }) {

    await app.register(fastifyStatic, {
        root: config.publicDir,
        prefix: config.publicPrefix || `/public/`,
        list: !config.isProd,
        index: "index.html"
    });
}, {
    name: 'public',
    dependencies: []
})