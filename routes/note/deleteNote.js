const express = require('express')
const notes = require('../../databases/db')
const app = express()

// 👇 handle DELETE request method at /note
app.delete('/note', (req, res) => {
  const id = req.body.id
  // 👇 change the notes value to be an array that already filtered from the id that was inserted at request
  notes = notes.filter((note) => note.id !== id)
  // 👇 send "Ok" to the user
  res.send('Ok')
})

module.exports = app