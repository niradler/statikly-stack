const { htmlFragment } = require('@statikly-stack/render')

module.exports = ({ errors }) => {
  return htmlFragment`
    <ul>
    ${Array.isArray(errors) ? errors.map(err => htmlFragment`<li>${err}</li>`) : ''}
    </ul>
    <form method="post">
    <div class="grid">
      <input type="text" required placeholder="My awesome todo" name="title" />
      <button type="submit">Create</button>
    </div>
  </form>
    `
}