const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

// 👇 handle POST request method at /note
app.post('/note', (req, res) => {
  // 👇 use req "body" property to access body at request to this route and save it to body variable
  const body = req.body
  // 👇 push into an array anything inside the body
  notes.push(body)
  res.send(req.body)
})

module.exports = app