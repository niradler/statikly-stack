const Path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const toFilePath = (path, root = process.cwd()) => {
    if (!path) return;
    return Path.isAbsolute(path) ? path : Path.join(root, path);
};

const uuid = () => {
    return crypto.randomUUID();
};

const generateSecret = () => uuid().replaceAll('-', '');

const readJSON = async (path, rootDir) => (path ? JSON.parse(await fs.readFile(toFilePath(path, rootDir))) : {});

const fileExists = async (path) => !!(await fs.stat(path).catch(() => false));

const readdir = fs.readdir;

export { toFilePath, generateSecret, readJSON, fileExists, readdir, uuid };
