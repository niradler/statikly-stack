# Statikly

Statikly built on the Fastify framework, utilizes server-side rendering (SSR) to create efficient and fast web pages. SSR allows for building web pages on the server and then sending the fully rendered HTML to the client, rather than relying on client-side JavaScript libraries such as React to generate the HTML. This approach can result in improved performance and SEO, as the pages are fully rendered and search engine crawlers can easily access the content.

One of the key benefits of using Fastify is its extensive ecosystem of plugins. These plugins allow developers to easily add functionality and features to their web apps, such as authentication, validation, and more. Additionally, developers can also create their own plugins to customize and extend the functionality of the framework.

This framework also allows developers to use HTML and JavaScript literals to create easy HTML compositions. This approach allows developers to use plain JavaScript to generate HTML, which can be less complex than using a JavaScript framework, and in some cases, can improve the performance and SEO of web pages.

The framework also supports file-based routing similar to Next.js. This means that developers can organize their application's routes based on the file structure, making it easy to navigate and maintain.

Overall, this framework provides a powerful and efficient development experience for building web apps, with a focus on server-side rendering, fast performance, and a wide range of plugins and customization options.

## Usage

Check out the [Getting started](demo) guide.

### Supported environment variables

```env
STATIKLY_PUBLIC_FOLDER=
STATIKLY_PUBLIC_PREFIX=
STATIKLY_CORS_ORIGIN=
STATIKLY_AUTOLOAD=
STATIKLY_ROOT_DIR=
STATIKLY_GLOBAL_HELMET=
NODE_ENV=
```

### Reference

-   [fastify](https://www.fastify.io/)
-   [ecosystem](https://www.fastify.io/ecosystem/)
-   [autoload plugins, hooks and routes](https://github.com/fastify/fastify-autoload)
