const express = require('express')
const app = express()

app.use(express.json())

const rootRoute = require('./routes/rootRoute')
const addNote = require('./routes/note/addNote')
const getNote = require('./routes/note/getNote')
const getParamNote = require('./routes/note/getParamNote')
const getQueryNote = require('./routes/note/getQueryNote')
const editNote = require('./routes/note/editNote')
const deleteNote = require('./routes/note/deleteNote')

app.use(rootRoute)
app.use(addNote)
app.use(getNote)
app.use(getParamNote)
app.use(getQueryNote)
app.use(editNote)
app.use(deleteNote)

const port = 3000
app.listen(port, () => {
  console.log(`Notes API was running on http://localhost:3000`);
})