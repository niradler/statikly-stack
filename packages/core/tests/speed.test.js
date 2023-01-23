const perf = require('execution-time')();
const server = require('../src/server')

const stopAndPrint = (name) => console.debug(name, perf.stop(name).time)

test('speed - view', async () => {
    perf.start("test");
    perf.start("init");
    const options = {
        rootDir: "tests/demo",
        viewsDir: "views",
        modules: ["views"],
        "layout": "partials/layout.ejs",
        verbose: false
    }
    const app = await server(options);
    await app.ready();
    stopAndPrint("init");
    perf.start("request");
    const response = await app.inject({
        method: 'GET',
        url: '/',
    })
    expect(perf.stop("request").time).toBeLessThanOrEqual(66);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    stopAndPrint("test");
    app.close()
})

test('api', async () => {
    const options = {
        rootDir: "tests/demo",
        apiDir: "api",
        modules: ["api"],
        verbose: false
    }
    const app = await server(options);
    await app.ready();
    const before = new Date();
    const response = await app.inject({
        method: 'GET',
        url: '/api/todos',
        headers: {
            'content-type': 'application/json'
        }
    })
    const after = new Date();
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(after - before).toBeLessThanOrEqual(62);

    app.close()
})