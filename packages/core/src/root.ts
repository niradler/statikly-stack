import { StatiklyPlugin, StatiklyApp } from './utils/types';
import AutoLoad from '@fastify/autoload';
import { toFilePath } from './utils/common';
import type { IOptions } from './utils/config';
import config from './utils/config';

declare module 'fastify' {
    export interface StatiklyApp {
        _config: IOptions;
    }
}

const root: StatiklyPlugin = async function (app: StatiklyApp, options): Promise<void> {
    const _config = config(options as IOptions);

    app.log.debug({ config: _config });
    app.decorate('_config', _config);
    await app.register(AutoLoad, {
        dir: toFilePath('plugins', __dirname),
        options: _config,
    });
};

export const autoConfig = { name: 'root', dependencies: [] };
export const options = {};

export default root;
