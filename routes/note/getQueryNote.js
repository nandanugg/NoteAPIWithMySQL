const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/query', (req, res) => {
  // 👇 access whatever inserted in query and save it to id variable
  const id = req.query.id
  // 👇 filter notes that has the same id with the id inserted at request by using "filter" method
  const foundNote = notes.filter((note) => note.id === id)
  res.send(foundNote)
})

module.exports = app