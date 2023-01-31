const { html } = require('@statikly-stack/render')

module.exports = (title) => {
    return html`<h1>${title}</h1>`
}