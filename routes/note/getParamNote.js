const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

// 👇 handle request with param called id (see ":id")
app.get('/note/param/:id', (req, res) => {
  // 👇 access whatever inserted in param and save it to id variable
  const id = req.params.id
  // 👇 filter notes that has the same id with the id inserted at request by using "filter" method
  const foundNotes = notes.filter((note) => note.id === id)
  res.send(foundNotes)
})

module.exports = app