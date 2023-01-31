const title = fromRoot.require('components/title')

const get = async (req, res) => {

    return title(`Hi ${req.query.name}`)
}

module.exports = { get }