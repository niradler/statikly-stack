# statikly core

```js
const { server } = require('@statikly-stack/core');
const options = {
    logLevel: 'debug',
};
const host = 'localhost';
const port = 3000;
const app = await server(options);
await app.ready();
await app.listen({ port, host });
```
