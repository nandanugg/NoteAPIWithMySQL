const express = require('express')
const db = require('../../connections/dbConnection')
const { hashPassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')
const errorMiddleware = require('../../middlewares/errorMiddleware')
const { nanoid } = require('nanoid')

const app = express.Router()

// we can centralize all database error by adding new parameter called "next", 
// this parameter will be filled with function by express so we can use it to 
// pass error to error handler
app.post('/auth/register', async (req, res, next) => { // 👈 new next parameter
  const body = req.body
  const password = body.password
  const hashedPassword = await hashPassword(password)
  body.password = hashedPassword
  body.id = nanoid()
  // 👇 use knex to add user inside users table
  const insertResult = await db('users').insert(body)
    .catch((error) => {
      // 👇 if there's any error, pass it to error handler
      next(error)
    })
  if (insertResult) {
    const token = signJwt(body)
    const result = {
      ...body,
      token
    }
    res.send(result)
  }
})

// 👇 use error handler to this route, an error handler MUST be used after the route has been declared
app.use(errorMiddleware)

module.exports = app