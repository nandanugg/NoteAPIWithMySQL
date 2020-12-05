const express = require('express')
const notes = require('../../databases/notesDb')
const app = express()

app.post('/note', (req, res) => {
  const body = req.body
  notes.push(body)
  res.send(req.body)
})

module.exports = app