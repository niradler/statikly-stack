{/* <article id="article">
    <h2>TODO</h2>
    <div class="grid">
        <form method="post" class="grid">
            <input value="<%= data.title; %>" name="title" />
            <input type="hidden" value="<%= csrf %>" name="_csrf" />
            <input type="hidden" value="update" name="action" />
            <button type="submit">Update</button>
        </form>
    </div>
    <div class="grid">
        <form method="post">
            <input type="hidden" value="<%= csrf %>" name="_csrf" />
            <input type="hidden" value="delete" name="action" />
            <button type="submit">Delete</button>
        </form>
        <form method="post" action="/api/todos/form<%= data.id; %>">
            <input type="hidden" value="delete" name="_method" />
            <button type="submit">Delete API</button>
        </form>
    </div>
    <footer>/todo/<%= data.id; %></footer>
</article>

const db = require('../../src/db');

module.exports = {
    loader: async (req, reply) => {
        const todo = await db.get(Number(req.params.id));
        if (!todo) return reply.notFound();

        return todo;
    },
    actions: async (req, reply) => {
        switch (req.body.action) {
            case 'delete':
                const deleted = await db.del(Number(req.params.id));
                if (!deleted) return reply.notFound();
                break;
            case 'update':
                await db.update(Number(req.params.id), req.body.title);
                break;
            default:
                return reply.notFound();
        }

        reply.redirect('/todos');
    },
}; */}
