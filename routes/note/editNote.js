const express = require('express')
const db = require('../../connections/dbConnection')
const errorMiddleware = require('../../middlewares/errorMiddleware')
const app = express()

app.patch('/note/:id', async (req, res, next) => {
  const id = req.params.id
  // 👇 update note with anything inside body
  await db('notes').update(req.body).where({ id })
    .catch((error) => {
      next(error)
    })
  const updatedNote = await db('notes').where({ id })
  res.send(updatedNote)
})

app.use(errorMiddleware)

module.exports = app