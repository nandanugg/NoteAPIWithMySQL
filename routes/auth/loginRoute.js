const express = require('express')
const db = require('../../connections/dbConnection')
const { comparePassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')

const app = express.Router()

app.post('/auth/login', async (req, res) => {
  const body = req.body
  const username = body.username
  const password = body.password
  const searchResult = await db('users').where({
    username: username
  }).first()
  if (searchResult) {
    const isPasswordMatch = await comparePassword(password, searchResult.password)
    if (isPasswordMatch) {
      /**
       * Any result from knex is a "branded" object, you can see it by debugging at line 15
       * Due to that, if we give that object to JWT, it will cause error, because JWT
       * needs a plain object, not a branded one.
       * We can combat this by using object spread in a object to "copy" knex result property
       * into a new object, we can see that this concept is working if we debug at line 27
       */
      // const token = signJwt(searchResult) // 👈 will cause error like "expected payload to be a plain object...."
      const plainResult = { ...searchResult } // 👈 debug this, we will see that knex result will be converted to plain object
      const token = signJwt(plainResult) // 👈 insert a plain object into jwt
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