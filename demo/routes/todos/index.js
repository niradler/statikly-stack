

const { htmlFragment } = require('@statikly-stack/render')
const layout = require('../../components/layout')
const createTodo = require('../../components/createTodo')
const db = require('../../src/db');

const get = async (req, res) => {
    res.type('text/html')

    // const errors = res.flash('errors');
    const todos = await db.all();

    const body = htmlFragment`
    <article id="article">
    <h2>TODOs</h2>
    ${createTodo({ errors: [] })}
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
        <td><a href="/todo/${todo.id}">${todo.id}</a></td>
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
        title: "Todo - Home", body
    })
}


const post = async (req, res) => {
    const title = req.body.title;
    if (title.length < 2) {
        req.flash('errors', ['title length should be longer then 2 characters']);
        return res.redirect('/todos');
    }
    await db.add(title);
    res.redirect('/todos');
}

module.exports = { get, post }