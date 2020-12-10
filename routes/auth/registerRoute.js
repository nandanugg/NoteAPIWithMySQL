const express = require('express')
const db = require('../../connections/dbConnection')
const { hashPassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')
const errorMiddleware = require('../../middlewares/errorMiddleware')
const { nanoid } = require('nanoid')

const app = express.Router()

app.post('/auth/register', async (req, res, next) => {
  const body = req.body
  const password = body.password
  const hashedPassword = await hashPassword(password)
  body.password = hashedPassword
  body.id = nanoid()
  const insertResult = await db('users').insert(body)
    .catch((error) => {
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

app.use(errorMiddleware)

module.exports = app