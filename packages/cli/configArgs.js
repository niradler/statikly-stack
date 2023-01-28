module.exports = (yargs) => {
    return yargs
        .option('port', {
            alias: 'p',
            describe: 'port to bind on',
            default: 3000,
        })
        .option('debug', {
            alias: 'd',
            type: 'boolean',
            describe: 'debug, inspect mode',
            default: false,
        })
        .option('debugPort', {
            alias: 'dp',
            describe: 'debug port',
            default: 9320,
        })
        .option('debugHost', {
            alias: 'dh',
            describe: 'debug host',
        })
        .option('rootDir', {
            alias: 'r',
            describe: 'root directory',
            default: process.cwd(),
        })
        .option('publicDir', {
            alias: 'pd',
            describe: 'public directory, for static assets',
            default: './public',
        })
        .option('prod', {
            describe: 'production mode',
            type: 'boolean',
            default: false,
        })
        .option('corsOrigin', {
            alias: 'co',
            describe: 'cors origin, support multiple origins',
            type: 'array',
            default: ['localhost'],
        })
        .option('autoLoad', {
            describe: 'pass folder names to load plugins',
            alias: 'a',
            type: 'array',
            default: [],
        })
        .option('optionsFile', {
            alias: 'opt',
            description: 'provide options file (json) instead of passing them as arguments',
        })
        .option('host', {
            describe: 'listener host',
            default: 'localhost',
        }).option('logLevel', {
            alias: 'level',
            describe: 'log level',
            default: 'info',
        });
}