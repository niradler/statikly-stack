# Statikly demo app

this project is a demonstration on how to use the Statikly framework.

## Setup from example project

```sh
npx @statikly-stack/cli init --path demo
```

```sh
cd demo && npm i
```

### File structure

-   public - this folder wil server static assets like images, css files etc.
-   plugins - this folder will be automatically load fastify plugins
-   routes - this folder will be automatically create routes base on folder structure

### First page

```sh
npm run watch
```

edit `routes/index.js` and open the app url in the browser to see the changes

we use `app-module-path` npm package to provide and easy way to import packages in routes, for example `const layout = require('components/layout')`
