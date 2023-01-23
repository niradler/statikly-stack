# statikly-router

file system router, the router will translate folder structure into routes.

generated route for `pages/todo/[id].ejs` will be `/pages/todo/:id`

### Installation

```sh
npm i statikly-router
```

### Usage

```js
const { Router } = require("statikly-router"); // import { Router } from "statikly-router"
const router = new Router({
  path: "views",
});
const routes = await router.scan(); // => route[]
await router.build("api"); //create api/routes.json file to cache routes
```

Route:

```json
{
  "ejs": {
    "root": "/",
    "dir": "/pages/todo",
    "base": "[id].ejs",
    "ext": ".ejs",
    "name": "[id]",
    "cwd": ".../tests/views",
    "path": ".../tests/views/pages/todo/[id].ejs",
    "relative": "/pages/todo/[id].ejs",
    "url": "/pages/todo/:id"
  }
}
```

express usage example:

```js
//server.js
const express = require("express");
const { Router } = require("statikly-router");

const app = express();
const router = new Router({ path: "routes", glob: "**/*.js" });

(async () => {
  try {
    console.time("scan");
    const routes = await router.scan();
    console.timeEnd("scan"); //scan: ~5ms
    for (const url in routes) {
      const route = require(routes[url].js.path);
      const methods = Object.keys(route);
      methods.forEach((method) => {
        app[method](url, route[method]);
      });
    }
    console.log("listen on localhost:4000");
    app.listen(4000);
  } catch (error) {
    console.log(error);
  }
})();
```

```js
//routes/home.js
module.exports = {
  get: async (req, res) => {
    return res.json({ page: "home" });
  },
};
```

`curl localhost:4000/home`
