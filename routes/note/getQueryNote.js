const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/query', (req, res) => {
  const search = req.query.search
  const user = req.user
  const notesByUser = notes.filter(note => note.username === user.username)
  const foundNotes = notesByUser.filter((note) => note.note.includes(search))
  res.send(foundNotes)
})

module.exports = app