const fastify = require('fastify')
const root = require('../build/root')
const { server } = require('../build/server')

const routesTest = async (app) => {

    let response, body;

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

    await app.register(root, options);

    await app.ready();

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