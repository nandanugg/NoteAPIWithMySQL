const express = require('express')
const db = require('../../connections/dbConnection')
const app = express()

app.get('/note/param/:id', async (req, res) => {
  const id = req.params.id
  const user = req.user
  const notesByUser = await db('notes').where({
    userId: user.id,
    id
  })
  res.send(notesByUser)
})

module.exports = app