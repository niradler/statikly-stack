import Fastify, { FastifyRegisterOptions } from 'fastify';
import type { IOptions } from './utils/config';
import rootPlugin from './root';

export const server = async (options: IOptions) => {
    const app = Fastify({
        logger: {
            level: options.logLevel ? options.logLevel : 'info',
        },
    });

    await app.register(rootPlugin, options as FastifyRegisterOptions<IOptions>);

    return app;
};

export default server;
