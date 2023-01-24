import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import type { IOptions } from './utils/config';
import config from './utils/config';
import { toFilePath } from './utils/common';

export const server = async (options: IOptions) => {
    const _config = config(options);

    const app = Fastify({ logger: true });

    // @ts-expect-error adding config
    app._config = _config;

    app.register(AutoLoad, {
        dir: toFilePath('plugins', __dirname),
        options: _config,
    });

    return app;
};

export default server;
