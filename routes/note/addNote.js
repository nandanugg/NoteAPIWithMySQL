const express = require('express')
const notes = require('../../databases/notesDb')
const authorize = require('../../middlewares/authorizationMiddleware')
// 👇 use nanoid method in nanoid npm module
const { nanoid } = require('nanoid')
const app = express()

// 👇 use the authorize middleware in this route
app.use(authorize)

app.post('/note', (req, res) => {
  const body = req.body
  // 👇 get user property inserted by authorize middleware
  const user = req.user
  // 👇 add username property to tell that the note is created by username inside user property
  body.username = user.username
  // 👇 use nanoid function to create an id
  const id = nanoid()
  // 👇 add id property with value of created id
  body.id = id
  // 👇 add note
  notes.push(body)
  res.send(req.body)
})

module.exports = app