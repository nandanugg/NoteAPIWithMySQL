const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/param/:id', (req, res) => {
  const id = req.params.id
  const foundNote = notes.filter((note) => note.id === id)
  res.send(foundNote)
})

module.exports = app