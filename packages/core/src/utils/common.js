const pathUtils = require('path');
const fs = require('fs/promises');

const toFilePath = (path, root = process.cwd()) => {
    if (!path) return;
    return pathUtils.isAbsolute(path) ? path : pathUtils.join(root, path);
};

const generateSecret = (length) =>
    new Array(length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join('');

const readJSON = async (path, rootDir) => (path ? JSON.parse(await fs.readFile(toFilePath(path, rootDir))) : {});

const fileExists = async (path) => !!(await fs.stat(path).catch(() => false));

const readdir = fs.readdir;

module.exports = { toFilePath, generateSecret, readJSON, fileExists, readdir };
