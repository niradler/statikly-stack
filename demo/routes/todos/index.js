

const { htmlFragment } = require('@statikly-stack/render')
const layout = require('components/layout')
const createTodo = require('components/createTodo')
const db = require('src/db');

const get = async (req, res) => {

  const errors = res.flash('errors');
  const todos = await db.all();

  const body = htmlFragment`
    <article id="article">
    <h2>TODOs</h2>
    ${createTodo({ errors: errors })}
    <footer>
    <section id="tables">
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
        ${todos.map((todo, i) => htmlFragment`
        <tr>
        <th scope="row">${i + 1}</th>
        <td><a href="/todos/${todo.id}">${todo.id}</a></td>
        <td>${todo.title}</td>
      </tr>
        `)}
        </tbody>
      </table>
    </figure>
    </section>
    </footer>
    </article>
  `

  return layout({
    title: "Todos", body
  })
}


const post = {
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', minLength: 1 },
      }
    }
  },
  handler: async function (req, res) {
    const title = req.body.title;
    if (title.length < 2) {
      req.flash('errors', ['title length should be longer then 2 characters']);
      return res.redirect(req.url);
    }
    await db.add(title);

    res.redirect(req.url);
  },
  errorHandler: function (error, req, res) {
    req.flash('errors', [error.message]);
    return res.redirect(req.url);
  }
}

module.exports = { get, post }