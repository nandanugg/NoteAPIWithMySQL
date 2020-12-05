const express = require('express')
const notes = require('../../databases/notesDb')
const authorize = require('../../middlewares/authorizationMiddleware')
const app = express()

app.use(authorize)

app.get('/note', (req, res) => {
  const user = req.user
  const notesByUser = notes.filter(note => note.username === user.username)
  res.send(notesByUser)
})

module.exports = app