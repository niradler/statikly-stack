
const Path = require('path');
const fp = require('fastify-plugin')
const AutoLoad = require('@fastify/autoload')
const { toFilePath } = require('../utils/common');

module.exports = fp(async function (app, { config }) {
    const { modules, autoLoad, rootDir } = config;
    console.log('AutoLoad modules', toFilePath('../modules', __dirname))
    await app.register(AutoLoad, {
        dir: toFilePath('../modules', __dirname),
        options: { config },
        matchFilter: (path) => modules.includes(Path.parse(path).name)
    })

    for (const folder of autoLoad) {
        app._logger('loading local plugins', folder);
        await app.register(AutoLoad, {
            dir: toFilePath(folder, rootDir),
            options: { config }
        })
    }
}, {
    name: 'modules',
    dependencies: ["core", "security"]
})