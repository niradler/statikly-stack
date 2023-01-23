# statikly

No hassle full stack framework, for blog/static/content sites, amazing for prototype and build internal tools and seo optimize.
Provide alternative for writing frontend "the old way", more and more hype is growing on server side ui, like next.js and remix, I wanted to simplified it event more.

statikly is just an opinionated warpper around [fastify](https://www.fastify.io/) [ecosystem](https://www.fastify.io/ecosystem/).

when your app is growing you can always eject and control everting yourself.

## Installation

```js
npm i -g statikly
```

## Configuration

environment variables:

```sh
STATIKLY_SESSION_SECRET= # optional: npx @fastify/secure-session
NODE_ENV=production # optional: set in production
STATIKLY_ROOT= # optional: set to override current folder
STATIKLY_STATIC_FOLDER=public # optional: for other public folder
STATIKLY_TEMPLATE=ejs # optional: template engine to use for the complete list @fastify/view
STATIKLY_LAYOUT= # optional: layout path
STATIKLY_VIEWS=views # optional: for other views folder
STATIKLY_PASSWORD=1234 # optional: basic auth
STATIKLY_USERNAME=user # optional: basic auth
```

defaults:

-   template engine ejs
-   views folder = views
-   api folder = api
-   public folder = public

_All routes is file base:_

views/notes/index.ejs => /notes
views/note/[id].ejs => /note/:id

api/notes/index.js => api/notes
api/note/[id].js => api/note/:id

## Getting Started

### Start with example app

```sh
mkdir my-first-statikly
cd my-first-statikly
statikly init # clone the demo from https://github.com/niradler/statikly-demo
statikly serve
```

### Manual guide

Write your first view, create views/index.ejs and run statikly serve

```ejs
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>statikly</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1><%= "query" %></h1>
    <h3><%= JSON.stringify(query,null,2); %></h3>
    <h1><%= "params" %></h1>
    <h3><%= JSON.stringify(params,null,2); %></h3>
    <h1><%= "data" %></h1>
    <h3><%= JSON.stringify(data,null,2); %></h3>
    <h1><%= "env" %></h1>
    <h3><%= JSON.stringify(env,null,2); %></h3>
  </body>
```

Passing server side data to views, create views/loader.js and run statikly

```js
//views/index.js
module.exports = {
    loader: async (req, reply) => {
        return { todos }; // available in views data.todos
    },
};
```

Processing forms

```js
//views/index.js
module.exports = {
    actions: async (req, reply) => {
        const title = req.body.title;
        if (title.length < 2) {
            req.flash('errors', ['title length should be longer then 2 characters']);
            return reply.redirect('/todos');
        }
        await db.add(title);
        reply.redirect('/todos');
    },
};
```

Api routes, create api/notes.js and run statikly

```js
module.exports = {
    get: async (req, reply) => [{ id: 1, title: 'note1' }],
    post: async (req, reply) => [{ id: 1, title: 'note1' }],
};
```

```sh
curl http://localhost:3000/api/notes
```

Build on top of [fastify](https://www.fastify.io/), for more information, checkout the [fastify docs](https://www.fastify.io/docs/latest/)

Recommended reading:

-   (Request)[https://www.fastify.io/docs/latest/Reference/Request/]
-   (Reply)[https://www.fastify.io/docs/latest/Reference/Reply/]

TODO:

-   advance form support (server/client)
-   static gen
-   auth / social login / jwt support
-   css and js minify / bundler (vite)
-   verify security features
