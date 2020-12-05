const express = require('express')
const users = require('../../databases/usersDb')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/login', (req, res) => {
  const body = req.body
  const username = body.username
  const password = body.password
  const searchResult = users.find(user => (user.username == username) && (user.password == password))
  if (searchResult) {
    const token = signJwt(body)
    body.token = token
    res.send(body)
  } else {
    res.send('User not found')
  }
})

module.exports = app