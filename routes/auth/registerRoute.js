const express = require('express')
const users = require('../../databases/usersDb')
const { hashPassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/register', async (req, res) => {
  const body = req.body
  const password = body.password
  // 👇 hash password, to make the password secure inside database if someone hacked it, and make us can't read the user password for privacy
  const hashedPassword = await hashPassword(password)
  body.password = hashedPassword
  users.push(body)
  const token = signJwt(body)
  // 👇 use "object spread" to make a new object with body parameters and token variable as parameter
  const result = {
    ...body,
    token
  }
  res.send(result)
})

module.exports = app