#!/usr/bin/env node

require('dotenv').config();
const { addPath } = require('app-module-path')
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const degit = require('degit');
const { common, server } = require('@statikly-stack/core');
const configArgs = require('./configArgs');
const start = require('./start');
const overview = require('./overview');
const { readJSON } = common;

const optToConfig = async (options) => {
    const { optionsFile, rootDir, verbose } = options;

    addPath(rootDir);

    if (optionsFile) {
        const optionsFromFile = await readJSON(optionsFile, rootDir);
        options = { ...options, ...optionsFromFile };
    }

    if (verbose) {
        console.info('options:', options);
    }

    return options;
}

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
            const emitter = degit('niradler/statikly-stack/demo', {
                force: true,
                verbose: options.verbose,
            });
            emitter.clone(options.path).then(() => {
                console.log('All set, start by running: npm run start');
                process.exit(0);
            });
        }
    )
    .command(
        'start',
        'start the server',
        (yargs) => configArgs(yargs),
        async (options) => {
            try {
                const config = await optToConfig(options)
                await start(config);
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
                const config = await optToConfig(options)
                const app = await server(config);
                await app.ready();
                console.log(await app.printRoutes());
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        }
    )
    .command(
        'overview',
        'load overview ui',
        (yargs) => configArgs(yargs),
        async (options) => {
            try {
                const config = await optToConfig(options)

                await overview(config);
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
