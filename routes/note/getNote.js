const express = require('express')
// 👇 import exported variable at notesDb.js
const notes = require('../../databases/notesDb')
const app = express()

// 👇 handle GET request method at /note
app.get('/note', (req, res) => {
  // 👇 send the notes array variable
  res.send(notes)
})

module.exports = app