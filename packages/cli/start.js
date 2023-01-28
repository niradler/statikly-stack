const { server } = require('@statikly-stack/core');

const start = async (options) => {
    const { port, host, debug, debugPort, debugHost } = options;
    if (debug) {
        require('inspector').open(
            debugPort,
            debugHost || undefined
        )
    }
    const app = await server(options);
    await app.ready();
    await app.listen({ port, host }).catch(async e => {
        await app.close()
        throw e;
    });
}

module.exports = start