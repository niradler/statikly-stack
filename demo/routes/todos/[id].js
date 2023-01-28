const { htmlFragment } = require('@statikly-stack/render')
const layout = require('components/layout')
const db = require('src/db');

const get = async (req, res) => {
    const todo = await db.get(Number(req.params.id));
    if (!todo) return res.notFound();

    const body = htmlFragment`
    <article id="article">
    <h2>TODO</h2>
    <div class="grid">
        <form method="post" class="grid">
            <input value="${todo.title}" name="title" />
            <input type="hidden" value="update" name="action" />
            <button type="submit">Update</button>
        </form>
    </div>
    <div class="grid">
        <form method="post">
            <input type="hidden" value="delete" name="action" />
            <button type="submit">Delete</button>
        </form>
    </div>
    <footer>/todo/${todo.id}</footer>
</article>
  `

    return layout({
        title: "Todo", body
    })
}

const post = async (req, res) => {
    switch (req.body.action) {
        case 'delete':
            const deleted = await db.del(Number(req.params.id));
            if (!deleted) return res.notFound();
            break;
        case 'update':
            await db.update(Number(req.params.id), req.body.title);
            break;
        default:
            return res.notFound();
    }

    res.redirect('/todos');
}

module.exports = { get, post }