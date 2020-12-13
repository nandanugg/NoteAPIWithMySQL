const express = require('express')
const NoteController = require('../../controllers/noteController')
const authorize = require('../../middlewares/authorizationMiddleware')
const errorMiddleware = require('../../middlewares/errorMiddleware')

const app = express()
const noteController = new NoteController()

app.use(authorize)

app.patch('/note/:id', async (req, res, next) => {
  const { user, params, body } = req

  const result = await noteController
    .edit({ userId: user.id, id: params.id }, body)
    .catch((error) => {
      next(error)
    })
  if (result)
    res.send(result)
})

app.use(errorMiddleware)

module.exports = app