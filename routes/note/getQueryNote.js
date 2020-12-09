const express = require('express')
const db = require('../../connections/dbConnection')
const app = express()

app.get('/note/query', async (req, res) => {
  const search = req.query.search
  const user = req.user
  const notesByUser = await db('notes')
    .where({
      userId: user.id
    })
    .where('note', 'like', `%${search}%`)
  res.send(notesByUser)
})

module.exports = app