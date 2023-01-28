import { StatiklyPlugin, StatiklyApp } from '../utils/types';
import AutoLoad from '@fastify/autoload';
import type { Options } from '../utils/config';
import { toFilePath } from '../utils/common';

const loader: StatiklyPlugin = async function (app: StatiklyApp, options): Promise<void> {
    const { autoLoad, rootDir } = options as Options;
    if (Array.isArray(autoLoad)) {
        for (const folder of autoLoad) {
            await app.register(AutoLoad, {
                dir: toFilePath(folder, rootDir),
                options,
            });
        }
    }
};

export const autoConfig = { name: 'loader', dependencies: ['core', 'security'] };

export default loader;
