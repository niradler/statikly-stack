#!/usr/bin/env node

require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const degit = require('degit');
const { common, server } = require('@statikly-stack/core');
const configArgs = require('./configArgs');
const start = require('./start');
const { readJSON } = common;

module.exports = yargs(hideBin(process.argv))
    .command(
        'init',
        'initialize example project',
        (yargs) => {
            return yargs.option('path', {
                describe: 'folder path',
                default: process.cwd(),
            });
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
        'start',
        'start the server',
        (yargs) => configArgs(yargs),
        async (options) => {
            const { optionsFile, rootDir, verbose, watch } = options;
            try {
                if (optionsFile) {
                    const optionsFromFile = await readJSON(optionsFile, rootDir);
                    options = { ...options, ...optionsFromFile };
                }

                if (verbose) {
                    console.info('options:', options);
                }

                await start(options);
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        }
    )
    .command(
        'routes',
        'print server routes',
        (yargs) => configArgs(yargs),
        async (options) => {
            try {
                if (options.optionsFile) {
                    const optionsFromFile = await readJSON(options.optionsFile, options.rootDir);
                    options = { ...options, ...optionsFromFile };
                }

                if (options.verbose) {
                    console.info('options:', options);
                }

                const app = await server(options);
                await app.ready();
                console.log(await app.printRoutes());
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
