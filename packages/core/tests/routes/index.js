const route = {
    handler: async (req, res) => {
        return "Hello, world!";
    }
}

const post = async (req, res) => {
    return `Hi, ${req.body.title}`
}

const put = {
    handler: async (req, res) => {
        return "Hello, PUT"
    }
}

const patch = async (req, res) => {
    req.log.debug("patch route")
    return {
        payload: { json: { test: 1 } }
    }
}

module.exports = { route, post, put, patch }