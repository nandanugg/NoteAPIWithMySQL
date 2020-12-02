const express = require('express')
const note = require('../../db')
const app = express()

app.delete('/note', (req, res) => {
  note = note.fitler((n) => n.id !== req.body.id)
  res.send('Ok')
})

module.exports = app