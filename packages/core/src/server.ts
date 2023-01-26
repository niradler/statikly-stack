import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import type { IOptions } from './utils/config';
import config from './utils/config';
import { toFilePath } from './utils/common';

declare module 'fastify' {
    export interface FastifyInstance {
        _config: IOptions;
    }
}

export const server = async (options: IOptions) => {
    const _config = config(options);

    const app = Fastify({
        logger: {
            level: _config.logLevel,
        },
    });

    app.log.debug({ config: _config });
    app.decorate('_config', _config);

    await app.register(AutoLoad, {
        dir: toFilePath('plugins', __dirname),
        options: _config,
    });

    return app;
};

export default server;
