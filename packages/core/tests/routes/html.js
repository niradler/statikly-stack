const { html } = require('@statikly-stack/render')

const get = async (req, res) => {
    res.type('text/html')
    return html`<h1>Great Title</h1>`
}

module.exports = { get }