const express = require('express')
const notes = require('../../databases/db')
const app = express()

// 👇 handle PATCH request method at /note
app.patch('/note', (req, res) => {
  // 👇 use req "body" property and use the "body" id property to access id property inserted at body
  const id = req.body.id
  // 👇 find the index number in notes that has the same id with the id inserted at request by using "findIndex" method
  const editedIndex = notes.findIndex((note) => note.id === id)
  // 👇 access the notes with found index number and change the value based on what inserted in data property at body
  notes[editedIndex] = req.body.data
  // 👇 send edited data
  res.send(notes[editedIndex])
})

module.exports = app