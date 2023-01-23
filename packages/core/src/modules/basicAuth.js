const fp = require('fastify-plugin')

module.exports = fp(async function (app, { config }) {
    const { password, username } = config;
    if (username && password) {
        const authenticate = { realm: 'statikly' };
        // eslint-disable-next-line no-inner-declarations
        async function validate(usernameInput, passwordInput) {
            if (username !== usernameInput || password !== passwordInput) {
                return new Error('Unauthorized');
            }
        }
        await app.register(require('@fastify/basic-auth'), { validate, authenticate });
        app.addHook('onRequest', app.basicAuth);
    } else {
        throw new Error('username and password must be provided');
    }
}, {
    name: 'basicAuth',
    dependencies: []
})