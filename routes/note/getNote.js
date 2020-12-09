const express = require('express')
const db = require('../../connections/dbConnection')
const authorize = require('../../middlewares/authorizationMiddleware')
const app = express()

app.use(authorize)

app.get('/note', async (req, res) => {
  const user = req.user
  const notesByUser = await db('notes').where({ userId: user.id })
  res.send(notesByUser)
})

module.exports = app