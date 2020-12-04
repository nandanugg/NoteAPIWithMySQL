const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

// 👇 handle PATCH request method at /note
app.patch('/note/:id', (req, res) => {
  // 👇 use req "params" property and use id property inserted at path
  const id = req.params.id
  // 👇 find the index number in notes that has the same id with the id inserted at request by using "findIndex" method
  const editedIndex = notes.findIndex((note) => note.id === id)
  // 👇 access the notes with found index number and change the value based on what inserted in data property at body
  notes[editedIndex] = req.body
  // 👇 send edited data
  res.send(notes[editedIndex])
})

module.exports = app