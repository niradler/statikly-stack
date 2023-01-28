const { html } = require('@statikly-stack/render')

const get = async (req, res) => {

    return html`<h1>Hi ${req.query.name}</h1>`
}

module.exports = { get }