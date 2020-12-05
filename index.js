// Use dotenv module to use .env file as environment variable
require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const rootRoute = require('./routes/rootRoute')
app.use(rootRoute)
const registerRoute = require('./routes/auth/registerRoute')
app.use(registerRoute)
const loginRoute = require('./routes/auth/loginRoute')
app.use(loginRoute)

const addNote = require('./routes/note/addNote')
app.use(addNote)
const getNote = require('./routes/note/getNote')
app.use(getNote)
const getParamNote = require('./routes/note/getParamNote')
app.use(getParamNote)
const getQueryNote = require('./routes/note/getQueryNote')
app.use(getQueryNote)
const editNote = require('./routes/note/editNote')
app.use(editNote)
const deleteNote = require('./routes/note/deleteNote')
app.use(deleteNote)

const port = 3000
app.listen(port, () => {
  console.log(`Notes API was running on http://localhost:3000`);
})