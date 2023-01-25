const route = {
    handler: async (req, res) => {
        return "Hello, world!";
    }
}

const post = async (req, res) => {
    return "Hello, POST"
}


module.exports = { route, post }