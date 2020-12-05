const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/param/:id', (req, res) => {
  const id = req.params.id
  const user = req.user
  const notesByUser = notes.filter(note => note.username === user.username)
  const foundNotes = notesByUser.filter((note) => note.id === id)
  res.send(foundNotes)
})

module.exports = app