const server = require('../src/server')

test('api', async () => {
    const options = {
        rootDir: "tests/demo",
        apiDir: "api",
        modules: ["api"],
        verbose: false
    }
    const app = await server(options);
    await app.ready();
    let response

    //create
    response = await app.inject({
        method: 'POST',
        url: '/api/todos',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title: "test title"
        })
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    //get
    response = await app.inject({
        method: 'GET',
        url: '/api/todos',
        headers: {
            'content-type': 'application/json'
        }
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    const body = response.json();
    expect(body[0].id).toBe(1);
    expect(body[0].title).toBe("First note");
    //delete
    response = await app.inject({
        method: 'DELETE',
        url: '/api/todos/' + body[0].id,
        headers: {
            'content-type': 'application/json'
        }
    })
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    app.close()
})