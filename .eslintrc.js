module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  ignorePatterns: ["node_modules", "dist", "build", "docs", "**/tests"],
  settings: {
    next: {
      rootDir: ["packages/*/"],
    },
  },
};
