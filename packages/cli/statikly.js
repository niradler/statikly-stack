#!/usr/bin/env node

require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const degit = require('degit');
const { common, server } = require('@statikly-stack/core');
const { readJSON } = common;

module.exports = yargs(hideBin(process.argv))
    .command(
        'init',
        'initialize example project',
        (yargs) => {
            return yargs
                .option('path', {
                    describe: 'folder path',
                    default: process.cwd(),
                })
        },
        (options) => {
            if (options.verbose) console.info(options);
            const emitter = degit('niradler/statikly-demo', {
                force: true,
                verbose: options.verbose,
            });
            emitter.clone(options.path).then(() => {
                console.log('All set, start by running: npm run serve');
                process.exit(0);
            });
        }
    )
    .command(
        'serve',
        'start the server',
        (yargs) => {
            return yargs
                .option('port', {
                    alias: 'p',
                    describe: 'port to bind on',
                    default: 3000,
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
        },
        async (options) => {
            try {
                if (options.optionsFile) {
                    const optionsFromFile = await readJSON(options.optionsFile, options.rootDir);
                    options = { ...options, ...optionsFromFile };
                }

                if (options.verbose) {
                    console.info('argv', options);
                }

                const app = await server(options);
                await app.ready();
                await app.listen({ port: app._config.port, host: app._config.host });
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        }
    )
    .demandCommand(1, '')
    .recommendCommands()
    .completion()
    .strict()
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging',
    })
    .parse();
