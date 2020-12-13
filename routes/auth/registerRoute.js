/**
 * A view is a thing that our user (or client) see & use, in backend
 * view means route, and their responsibiliy is just one, handle 
 * requests & response
 * 
 * By implementing MVC pattern, we will see that our view code
 * is more consistent, we can browse other view file and we will see
 * that the code is not much different, by consistency, we will get
 * benefits, such as:
 * 1. Creating routes will be so much easier by just copy and paste
 * because there's only a little that need to be change in each route
 * 2. More human-error prone
 */

const express = require('express')
const userController = require('../../controllers/userController')
const errorMiddleware = require('../../middlewares/errorMiddleware')

const app = express.Router()

app.post('/auth/register', async (req, res, next) => {
  const { body } = req
  const result = await userController.register(body)
    .catch((error) => {
      next(error)
    })
  if (result)
    res.send(result)
})

app.use(errorMiddleware)

module.exports = app