const express = require('express')
const noteController = require('../../controllers/noteController')
const authorize = require('../../middlewares/authorizationMiddleware')
const errorMiddleware = require('../../middlewares/errorMiddleware')

const app = express()

app.use(authorize)

app.get('/note/query', async (req, res, next) => {
  const { user, query } = req

  const result = await noteController
    .getNoteLike(user.id, query)
    .catch((error) => {
      next(error)
    })
  if (result)
    res.send(result)
})

app.use(errorMiddleware)

module.exports = app