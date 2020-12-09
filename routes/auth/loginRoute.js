const express = require('express')
const users = require('../../databases/usersDb')
const { comparePassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/login', async (req, res) => {
  const body = req.body
  const username = body.username
  const password = body.password
  const searchResult = users.find(user => (user.username == username))
  if (searchResult) {
    const isPasswordMatch = await comparePassword(password, searchResult.password)
    if (isPasswordMatch) {
      const token = signJwt(searchResult)
      const result = {
        ...searchResult,
        token
      }
      res.send(result)
    } else {
      res.send('Password not match')
    }
  } else {
    res.send('User not found')
  }
})

module.exports = app