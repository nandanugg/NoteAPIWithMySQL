const express = require('express')
const NoteController = require('../../controllers/noteController')
const authorize = require('../../middlewares/authorizationMiddleware')
const errorMiddleware = require('../../middlewares/errorMiddleware')

const app = express()
const noteController = new NoteController()

app.use(authorize)

app.delete('/note/:id', async (req, res, next) => {
  const { user, params } = req

  const result = await noteController
    .delete({ userId: user.id, ...params }) // 👈 this is using baseController methods!
    .catch((error) => {
      next(error)
    })
  if (result)
    res.send(result)
})

app.use(errorMiddleware)

module.exports = app