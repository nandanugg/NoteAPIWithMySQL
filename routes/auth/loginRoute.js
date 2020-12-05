const express = require('express')
const users = require('../../databases/usersDb')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/login', (req, res) => {
  const body = req.body
  const username = body.username
  const password = body.password
  // 👇 search user that have same username & password as inputted
  const searchResult = users.find(user => (user.username == username) && (user.password == password))
  if (searchResult) {
    // 👇 if found, use signJwt function to create a token by using found search result as information inserted in the token
    const token = signJwt(body)
    body.token = token
    res.send(body)
  } else {
    // 👇 if not found, then tell the client
    res.send('User not found')
  }
})

module.exports = app