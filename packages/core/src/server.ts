import Fastify, { FastifyRegisterOptions, FastifyServerOptions } from 'fastify';
import type { IOptions, Options } from './utils/config';
import rootPlugin from './root';
import { uuid } from './utils/common';

export const server = async (options: IOptions, fastifyOptions: FastifyServerOptions = {}) => {
    const loggerOptions = { level: options.logLevel ? options.logLevel : 'info' };
    if (!options.prod) {
        // @ts-expect-error
        loggerOptions.transport = {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        };
    }

    const app = Fastify({
        ...fastifyOptions,
        genReqId: function () {
            return uuid();
        },
        logger: loggerOptions,
    });

    await app.register(rootPlugin, options as FastifyRegisterOptions<Options>);

    return app;
};

export default server;
