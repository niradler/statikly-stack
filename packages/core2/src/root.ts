import { FastifyPluginCallback, FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { toFilePath } from './utils/common';
import type { IOptions } from './utils/config';
import config from './utils/config';

const root: FastifyPluginCallback = async function (app: FastifyInstance, options): Promise<void> {
    const _config = config(options as IOptions);
    // @ts-expect-error adding config
    app._config = _config;

    app.register(AutoLoad, {
        dir: toFilePath('plugins', __dirname),
        options: _config,
    });
};

export const autoConfig = { name: 'root', dependencies: [] };
export const options = {};

export default root;
