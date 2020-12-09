const express = require('express')
const users = require('../../databases/usersDb')
const { hashPassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/register', async (req, res) => {
  const body = req.body
  const password = body.password
  const hashedPassword = await hashPassword(password)
  body.password = hashedPassword
  users.push(body)
  const token = signJwt(body)
  const result = {
    ...body,
    token
  }
  res.send(result)
})

module.exports = app