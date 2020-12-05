const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/query', (req, res) => {
  const search = req.query.search
  const foundNote = notes.filter((note) => note.note.includes(search))
  res.send(foundNote)
})

module.exports = app