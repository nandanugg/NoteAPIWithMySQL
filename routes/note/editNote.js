const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.patch('/note/:id', (req, res) => {
  const id = req.params.id
  const editedIndex = notes.findIndex((note) => note.id === id)
  notes[editedIndex] = req.body
  res.send(notes[editedIndex])
})

module.exports = app