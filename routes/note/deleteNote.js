const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.delete('/note/:id', (req, res) => {
  const id = req.params.id
  const updatedNotes = notes.filter((note) => note.id !== id)

  notes.forEach(() => {
    notes.splice(0)
  });
  updatedNotes.forEach((updatedNote) => {
    notes.push(updatedNote)
  })

  res.send('Ok')
})

module.exports = app