const express = require('express')
const UserController = require('../../controllers/userController')
const errorMiddleware = require('../../middlewares/errorMiddleware')

const app = express.Router()
const userController = new UserController()

app.post('/auth/register', async (req, res, next) => {
  const { body } = req
  const result = await userController.register(body) // 👈 this is using userController methods
    .catch((error) => {
      next(error)
    })
  if (result)
    res.send(result)
})

app.use(errorMiddleware)

module.exports = app