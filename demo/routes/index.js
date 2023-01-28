const { htmlFragment } = require('@statikly-stack/render')
const layout = require('../components/layout')

const get = async (req, res) => {
    res.type('text/html')

    const body = htmlFragment`
    <section>
        <h1>Todo example</h1>
        <a href="/todos"><button>My Todos</button></a>
    </section>

    <figure>
        <img src="public/image.jpg" alt="Minimal landscape" />
    </figure>`

    return layout({
        title: "Todo - Home", body
    })
}


module.exports = { get }