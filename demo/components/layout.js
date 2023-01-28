const { html } = require('@statikly-stack/render')

module.exports = ({ title, body }) => {
    return html`
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.6/css/pico.min.css"
            integrity="sha256-EJjb/lvpbMOOLhPpD9qGYwKRyF0rzRj1z15VsN8x6R8=" crossorigin="anonymous" />
    </head>
    
    <body class="container">
        <main style="padding-top: 0">${body}</main>
    </body>
    
    </html>
    `
}