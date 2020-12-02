const express = require('express')
const note = require('../../db')
const app = express()

app.patch('/note', (req, res) => {
  const editedIndex = note.findIndex((n) => n.id === req.body.id)
  note[editedIndex] = req.body.data
  res.send(note[editedIndex])
})

module.exports = app