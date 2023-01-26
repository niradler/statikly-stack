const { html } = require('@statikly-stack/render')

const get = async (req, res) => {

    return html`<h1>Great Title</h1>`
}

module.exports = { get }