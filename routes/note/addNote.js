const express = require('express')
const authorize = require('../../middlewares/authorizationMiddleware')
const { nanoid } = require('nanoid')
const db = require('../../connections/dbConnection')
const errorMiddleware = require('../../middlewares/errorMiddleware')
const app = express()

app.use(authorize)

app.post('/note', async (req, res, next) => {
  const body = req.body
  const user = req.user
  body.userId = user.id
  const id = nanoid()
  body.id = id
  // 👇 insert new note
  await db('notes').insert(body)
    .catch((error) => {
      next(error)
    })
  res.send(req.body)
})

app.use(errorMiddleware)

module.exports = app