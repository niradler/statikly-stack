const fs = require('fs');
const { toFilePath } = require('./common');

const crawler = async (app) => {

    for (let route of app.routes.keys()) {
        if (!route.includes(":")) {
            const response = await app.inject({
                method: 'GET',
                url: route
            })
            const fileName = `static${route == "/" ? "index" : route}.html`
            fs.writeFileSync(toFilePath(fileName), response.body)
        }

    }
}

module.exports = crawler