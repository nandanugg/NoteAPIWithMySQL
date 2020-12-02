const express = require('express')
const note = require('../../db')
const app = express()

app.post('/note', (req, res) => {
  note.push(req.body)
  res.send(req.body)
})

module.exports = app