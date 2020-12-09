const express = require('express')
const db = require('../../connections/dbConnection')
const errorMiddleware = require('../../middlewares/errorMiddleware')
const app = express()

app.delete('/note/:id', async (req, res, next) => {
  const id = req.params.id
  // 👇 delete note
  await db('users').delete(id)
    .catch((error) => {
      next(error)
    })
  res.send('Ok')
})

app.use(errorMiddleware)

module.exports = app