import { FastifyPluginCallback, FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { toFilePath } from './utils/common';
import type { IOptions } from './utils/config';
import config from './utils/config';

declare module 'fastify' {
    export interface FastifyInstance {
        _config: IOptions;
    }
}

const root: FastifyPluginCallback = async function (app: FastifyInstance, options): Promise<void> {
    (options as IOptions).rootDir = './tests';
    const _config = config(options as IOptions);

    app.log.debug({ config: _config });
    app.decorate('_config', _config);
    await app.register(AutoLoad, {
        dir: toFilePath('plugins', __dirname),
        options: _config,
    });
};

export const autoConfig = { name: 'root', dependencies: [] };
export const options = { rootDir: './tests' };

export default root;
