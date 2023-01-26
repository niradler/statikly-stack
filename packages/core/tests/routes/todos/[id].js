const get = async (req, res) => {
    return {
        todo: { id: Number(req.params.id) }
    }
}

module.exports = { get }