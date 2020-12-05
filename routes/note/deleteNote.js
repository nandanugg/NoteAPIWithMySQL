const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

// 👇 handle DELETE request method at /note
app.delete('/note/:id', (req, res) => {
  const id = req.params.id
  // 👇 filter the notes that not have an id same as id inserted at request
  const updatedNotes = notes.filter((note) => note.id !== id)
  // 👇 clear out notes item one by one with forEach loop
  notes.forEach(() => {
    notes.splice(0)
  });
  // 👇 for filtered notes, push each filtered notes to notes array
  updatedNotes.forEach((updatedNote) => {
    notes.push(updatedNote)
  })
  // 👇 send "Ok" to the user
  res.send('Ok')
})

module.exports = app