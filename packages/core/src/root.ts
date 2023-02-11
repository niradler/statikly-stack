import { StatiklyPlugin, StatiklyApp } from './utils/types';
import type { IOptions, Options } from './utils/config';
import config from './utils/config';
import type { FastifyPluginAsync, FastifyRegisterOptions } from 'fastify';
import { core, security, loader, routes } from './plugins';
import { RelativeRequire } from './utils/relativeRequire';

declare module 'fastify' {
    export interface StatiklyApp {
        _config: IOptions;
    }
}

const root: StatiklyPlugin = async function (app: StatiklyApp, options): Promise<void> {
    const _config = config(options as IOptions);

    app.log.debug({ config: _config });
    app.decorate('_config', _config);
    app.decorateRequest('_statiklyApp', () => app);

    const fromRoot = new RelativeRequire(_config.rootDir);
    global.fromRoot = fromRoot;

    await app.register(core as FastifyPluginAsync, _config as FastifyRegisterOptions<Options>);
    await app.register(security as FastifyPluginAsync, _config as FastifyRegisterOptions<Options>);
    await app.register(loader as FastifyPluginAsync, _config as FastifyRegisterOptions<Options>);
    await app.register(routes as FastifyPluginAsync, _config as FastifyRegisterOptions<Options>);
};

export const autoConfig = { name: 'root', dependencies: [] };
export const options = {};

export default root;
