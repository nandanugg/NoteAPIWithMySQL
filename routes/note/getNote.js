const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.get('/note', (req, res) => {
  res.send(notes)
})

module.exports = app