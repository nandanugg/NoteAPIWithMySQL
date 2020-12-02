// npm init
// git init
// .gitignore
// install express

const express = require('express')
const app = express()

const rootRoute = require('./routes/rootRoute')
const addNote = require('./routes/addNote')
const getNote = require('./routes/getNote')
const editNote = require('./routes/editNote')
const deleteNote = require('./routes/deleteNote')

app.use(rootRoute)
app.use(addNote)
app.use(getNote)
app.use(editNote)
app.use(deleteNote)

const port = 3000
app.listen(port, () => {
  console.log(`Notes API was running on http://localhost:3000`);
})