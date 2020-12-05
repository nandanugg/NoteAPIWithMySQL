const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/query', (req, res) => {
  const search = req.query.search
  const user = req.user
  const noteByUser = notes.filter(note => note.username === user.username)
  const foundNote = noteByUser.filter((note) => note.note.includes(search))
  res.send(foundNote)
})

module.exports = app