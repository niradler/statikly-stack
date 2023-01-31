import Path from 'path';
import URL from 'url';

export class RelativeRequire {
    private pathPrefix: string;

    constructor(pathPrefix?: string) {
        this.pathPrefix = pathPrefix || process.cwd();
    }

    path(path) {
        return Path.join(this.pathPrefix, path);
    }

    require(path) {
        return require(this.path(path));
    }

    async import(path) {
        return import(URL.pathToFileURL(this.path(path)).href);
    }
}

export default RelativeRequire;
