/// <reference types="node" />
import Path from "path";
export declare const globPromise: (cwd: string, pattern: string) => Promise<string[]>;
export type Route = {
    url: string;
    cwd: string;
    path: string;
} & Path.ParsedPath;
interface PathToRoute {
    path: string;
    cwd: string;
    querySep: string;
    dirNameRoute?: boolean;
}
export declare const pathToRoute: ({ path, cwd, querySep, dirNameRoute, }: PathToRoute) => Route;
export declare const toAbsolutePath: (path: string, cwd?: string) => string;
export declare const generateSecret: (length: number) => string;
export declare const readJSON: (path: string, cwd: string) => Promise<unknown>;
export declare const writeSON: (path: string, content: unknown, cwd?: string) => Promise<void>;
export declare const fileExists: (path: string) => Promise<boolean>;
declare const _default: {
    globPromise: (cwd: string, pattern: string) => Promise<string[]>;
    pathToRoute: ({ path, cwd, querySep, dirNameRoute, }: PathToRoute) => Route;
    toAbsolutePath: (path: string, cwd?: string) => string;
    generateSecret: (length: number) => string;
    readJSON: (path: string, cwd: string) => Promise<unknown>;
    fileExists: (path: string) => Promise<boolean>;
    writeSON: (path: string, content: unknown, cwd?: string) => Promise<void>;
};
export default _default;
//# sourceMappingURL=helpers.d.ts.map