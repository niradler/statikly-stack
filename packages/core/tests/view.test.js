const server = require('../src/server')

test('view', async () => {
    const options = {
        rootDir: "tests/demo",
        viewsDir: "views",
        "layout": "partials/layout.ejs",
        verbose: false
    }
    const app = await server(options);
    await app.ready();
    let response

    response = await app.inject({
        method: 'GET',
        url: '/',
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);

    response = await app.inject({
        method: 'GET',
        url: '/todos',
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    app.close()
})