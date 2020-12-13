const express = require('express')
const UserController = require('../../controllers/userController')
const errorMiddleware = require('../../middlewares/errorMiddleware')

const app = express.Router()
const userController = new UserController()

app.post('/auth/login', async (req, res, next) => {
  const { body } = req
  const result = await userController.login(body)
    .catch((error) => {
      next(error)
    })
  if (result)
    res.send(result)
})

app.use(errorMiddleware)

module.exports = app