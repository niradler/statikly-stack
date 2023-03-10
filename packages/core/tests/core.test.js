const fastify = require('fastify')
const root = require('../build/root')
const { server } = require('../build/server')

const routesTest = async (app) => {

    let response, body;

    console.log(await app.printRoutes())

    response = await app.inject({
        method: 'POST',
        url: '/',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title: "Mr. Statikly"
        })
    })

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBe('Hi, Mr. Statikly');

    response = await app.inject({
        method: 'POST',
        url: '/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: `title=Mr. Statikly`
    })

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBe('Hi, Mr. Statikly');

    response = await app.inject({
        method: 'GET',
        url: '/'
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBe('Hello, world!');

    response = await app.inject({
        method: 'PATCH',
        url: '/'
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

    body = response.json();
    expect(body.payload.json.test).toBe(1);

    response = await app.inject({
        method: 'get',
        url: '/todos/3'
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

    body = response.json();
    expect(body.todo.id).toBe(3);

    response = await app.inject({
        method: 'get',
        url: '/html?name=Statikly'
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('text/html');
    expect(response.body).toBeDefined();
    expect(response.body.includes('<h1>Hi Statikly</h1>')).toBe(true);

    app.close()
}

const logLevel = 'info';

test('core root', async () => {
    const options = {
        rootDir: './tests',
    }
    const app = fastify({
        logger: {
            level: logLevel
        }
    });

    await app.register(require('fastify-overview'))
    await app.register(root, options);

    await app.ready();
    const appStructure = app.overview()
    expect(appStructure.children[0].name).toBe('root');
    await routesTest(app);

    app.close()
})

test('core server', async () => {
    const options = {
        rootDir: './tests',
        logLevel: logLevel,
    }
    const app = await server(options)

    await app.ready();

    await routesTest(app);

    app.close()
})

test('security headers on', async () => {
    const options = {
        rootDir: './tests',
        logLevel: logLevel,
        globalHelmet: true
    }
    const app = await server(options)

    await app.ready();

    let response = await app.inject({
        method: 'get',
        url: '/'
    })
    expect(response).toBeDefined();
    console.log(response.headers)
    expect(response.headers['content-security-policy']).toBeDefined();

    app.close()
})


test('security headers off', async () => {
    const options = {
        rootDir: './tests',
        logLevel: logLevel,
        globalHelmet: false
    }
    const app = await server(options)

    await app.ready();

    let response = await app.inject({
        method: 'get',
        url: '/'
    })
    expect(response).toBeDefined();
    console.log(response.headers)
    expect(response.headers['Content-Security-Policy']).toBeUndefined();

    app.close()
})

// test('ESM', async () => {
//     const options = {
//         rootDir: './tests',
//         logLevel: logLevel,
//         routeExt: "mjs"
//     }
//     const app = await server(options)

//     await app.ready();

//     let response = await app.inject({
//         method: 'get',
//         url: 'esm'
//     })
//     expect(response).toBeDefined();
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toBeDefined();

//     app.close()
// })