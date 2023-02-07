import { toFilePath } from './common';
import { RelativeRequire } from './relativeRequire';

export interface IOptions {
    rootDir: string | undefined;
    publicDir: string | undefined;
    publicPrefix: string | undefined;
    corsOrigin: string[] | undefined;
    autoLoad: string[] | undefined;
    routesDir: string | undefined;
    routeExt: string | undefined;
    routesGlob: string | undefined;
    prod: boolean | undefined;
    logLevel: string | undefined;
}

export interface Options {
    rootDir: string;
    publicDir: string;
    publicPrefix: string;
    corsOrigin: string[];
    autoLoad: string[];
    routesDir: string;
    routeExt: string;
    routesGlob: string;
    prod: boolean;
    logLevel: string;
    globalHelmet: boolean;
}

const { STATIKLY_PUBLIC_FOLDER, STATIKLY_PUBLIC_PREFIX, STATIKLY_CORS_ORIGIN, STATIKLY_AUTOLOAD, STATIKLY_ROOT_DIR, STATIKLY_GLOBAL_HELMET, NODE_ENV } = process.env;

export const config = (options: IOptions): Options => {
    // @ts-expect-error config init
    options = options || {};

    const rootDir = toFilePath(STATIKLY_ROOT_DIR) || toFilePath(options.rootDir) || process.cwd();

    const _config = {
        ...options,
        rootDir,
        publicPrefix: STATIKLY_PUBLIC_PREFIX || options.publicPrefix || '/public',
        publicDir: toFilePath(STATIKLY_PUBLIC_FOLDER, rootDir) || toFilePath(options.publicDir, rootDir) || toFilePath('public', rootDir),
        corsOrigin: STATIKLY_CORS_ORIGIN ? (STATIKLY_CORS_ORIGIN as string).split(',') : options.corsOrigin || ['localhost'],
        autoLoad: STATIKLY_AUTOLOAD ? (STATIKLY_AUTOLOAD as string).split(',') : options.autoLoad || [],
        routesDir: toFilePath(options.routesDir, rootDir) || toFilePath('routes', rootDir),
        routeExt: options.routeExt || 'js',
        routesGlob: options.routesGlob || '**/*(*.js|*.mjs|*.cjs)',
        prod: options.prod || NODE_ENV === 'production',
        logLevel: options.logLevel || 'info',
        globalHelmet: STATIKLY_GLOBAL_HELMET !== 'false',
    };
    const fromRoot = new RelativeRequire(rootDir);
    global.fromRoot = fromRoot;

    return _config;
};

export default config;
