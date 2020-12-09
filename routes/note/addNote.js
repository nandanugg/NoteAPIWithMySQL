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

/**
 * remember to handle errors when we modifying data (add, edit, delete)
 * because those operation are inputted by client, and sometimes they make
 * mistakes that can broke down the server.
 * Mistakes that can happen are like:
 * - Deleting a data that referenced with another data by foreign key
 * - Insert a new column at add or update, where we don't make the column in database
 * And many more
 */
app.use(errorMiddleware)

module.exports = app