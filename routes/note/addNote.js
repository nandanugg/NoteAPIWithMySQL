const express = require('express')
const notes = require('../../databases/notesDb')
const authorize = require('../../middlewares/authorizationMiddleware')
const { nanoid } = require('nanoid')
const app = express()

// 👇 use the authorize middleware in this route
app.use(authorize)

app.post('/note', (req, res) => {
  const body = req.body
  const user = req.user
  body.username = user.username
  const id = nanoid()
  body.id = id
  notes.push(body)
  res.send(req.body)
})

module.exports = app