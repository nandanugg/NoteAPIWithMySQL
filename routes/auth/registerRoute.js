const express = require('express')
const users = require('../../databases/usersDb')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/register', (req, res) => {
  const body = req.body
  users.push(body)
  const token = signJwt(body)
  body.token = token
  res.send(body)
})

module.exports = app