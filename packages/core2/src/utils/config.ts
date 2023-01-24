import { toFilePath } from './common';

export interface IOptions {
    rootDir: string | undefined;
    publicDir: string | undefined;
    publicPrefix: string | undefined;
    corsOrigin: string | undefined;
    host: string | undefined;
    autoLoad: string[] | undefined;
    routesDir: string | undefined;
    routeExt: string | undefined;
    port: number | undefined;
    isProd: boolean | undefined;
}

export interface Options {
    rootDir: string;
    publicDir: string;
    publicPrefix: string;
    corsOrigin: string;
    host: string;
    autoLoad: string[];
    routesDir: string;
    routeExt: string;
    port: number;
    isProd: boolean;
}

const { STATIKLY_PUBLIC_FOLDER, STATIKLY_PUBLIC_PREFIX, STATIKLY_CORS_ORIGIN, STATIKLY_HOST, STATIKLY_AUTOLOAD, STATIKLY_ROOT_DIR, STATIKLY_PORT, NODE_ENV } = process.env;

export const config = (options: IOptions): Options => {
    // @ts-expect-error config init
    options = options || {};
    const rootDir = toFilePath(STATIKLY_ROOT_DIR) || toFilePath(options.rootDir) || process.cwd();
    return {
        ...options,
        rootDir,
        publicDir: STATIKLY_PUBLIC_PREFIX || options.publicPrefix || '/public',
        publicPrefix: toFilePath(STATIKLY_PUBLIC_FOLDER, rootDir) || toFilePath(options.publicDir, rootDir) || toFilePath('public', rootDir),
        corsOrigin: STATIKLY_CORS_ORIGIN || options.corsOrigin || 'localhost',
        host: STATIKLY_HOST || options.host || 'localhost',
        autoLoad: STATIKLY_AUTOLOAD ? (STATIKLY_AUTOLOAD as string).split(',') : [],
        routesDir: toFilePath(options.routesDir, rootDir) || toFilePath('routes', rootDir),
        routeExt: options.routeExt || 'js',
        port: Number(STATIKLY_PORT) || 4000,
        isProd: options.isProd || NODE_ENV === 'production',
    };
};

export default config;
