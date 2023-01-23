import fs from 'fs/promises';
import Path from 'path';
import glob from 'glob';

export const globPromise = (cwd: string, pattern: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        glob(
            pattern,
            {
                cwd,
            },
            function (error: Error, files: string[]) {
                if (error) reject(error);
                else resolve(files);
            }
        );
    });
};

export type Route = {
    url: string;
    cwd: string;
    path: string;
} & Path.ParsedPath;

const isRouteRoot = (name: string, dir: string, dirNameRoute = false): boolean => {
    if (name === 'index') return true;
    if (dirNameRoute && dir.endsWith(name)) return true;

    return false;
};

const transformRoutePath = (path: string, querySep: string) => {
    if (path.includes('[')) {
        return path.replace(/\[/gi, querySep).replace(/]/gi, '');
    }

    return path;
};

const condPrint = (cond: boolean, print: string, def = '') => {
    if (cond) return print;

    return def;
};

interface PathToRoute {
    path: string;
    cwd: string;
    querySep: string;
    dirNameRoute?: boolean;
}

export const pathToRoute = ({ path, cwd, querySep, dirNameRoute = false }: PathToRoute): Route => {
    const parsed = Path.parse(path);

    let url = condPrint(parsed.dir.startsWith('/'), parsed.dir, `/${parsed.dir}`);
    url += condPrint(isRouteRoot(parsed.name, parsed.dir, dirNameRoute), '', `${condPrint(!url.endsWith('/'), '/')}${parsed.name}`);
    url = transformRoutePath(url, querySep);
    const route: Route = {
        ...parsed,
        cwd,
        path: `${cwd}${Path.sep}${path.replace(/\//g, Path.sep)}`,
        url,
    };

    return route;
};

export const toAbsolutePath = (path: string, cwd: string = process.cwd()) => {
    if (!path) return;
    return Path.isAbsolute(path) ? path : Path.join(cwd, path);
};

export const generateSecret = (length: number) =>
    new Array(length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join('');

export const readJSON = async (path: string, cwd: string): Promise<unknown> => {
    const filePath = toAbsolutePath(path, cwd);
    const content = await fs.readFile(filePath, 'utf8');

    return JSON.parse(content);
};

export const writeSON = async (path: string, content: unknown, cwd?: string) => {
    const filePath = Path.join(toAbsolutePath(path, cwd), 'routes.json');
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
};

export const fileExists = async (path: string) => !!(await fs.stat(path).catch((e) => false));

export default {
    globPromise,
    pathToRoute,
    toAbsolutePath,
    generateSecret,
    readJSON,
    fileExists,
    writeSON,
};
