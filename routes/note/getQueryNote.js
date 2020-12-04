const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note/query', (req, res) => {
  // 👇 access search property in query and save it to search variable
  const search = req.query.search
  // 👇 filter notes that includes a same world with the search inserted at request by using "filter" method
  const foundNote = notes.filter((note) => note.note.includes(search))
  res.send(foundNote)
})

module.exports = app