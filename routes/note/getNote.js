const express = require('express')
const note = require('../../db')
const app = express()

app.get('/note', (req, res) => {
  res.send(note)
})

module.exports = app