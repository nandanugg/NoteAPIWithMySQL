/**
 * everytime we want to create an API, run this on terminal
 * 👇 initialize git to this folder
 * git init
 * 👇 initialize nodejs project to this folder
 * npm init
 * 👇 install express module for building API
 * npm install express
 * 👇 after installing, there will be a folder called 
 * "node_modules" we must prevent that folder to be 
 * commited in git otherwise, git will eat so drive space
 * by creating a file called ".gitignore" @see .gitignore
 * 
 * If someone clone this repository, they will not get the
 * node_modules folder, to make that folder appear in their
 * project, we can tell them to run a command called
 * "npm install" or in short is "npm i"
 * 👆 it's a command to install all modules that have
 * been installed in this project, so they don't need
 * to type "npm install express" anymore
 */

// 👇 require / import express module as variable
const express = require('express')
// 👇 use express to initiate an API application (or backend, as we say), that's why the variable is called "app"
const app = express()

// 👇 use app "use" method to use express "json" method for allowing POST, PATCH & DELETE method to access request body
app.use(express.json())

// 👇 import routes
const rootRoute = require('./routes/rootRoute')
const addNote = require('./routes/addNote')
const getNote = require('./routes/getNote')
const editNote = require('./routes/editNote')
const deleteNote = require('./routes/deleteNote')

// 👇 use app "use" method to use imported routes as application routes
app.use(rootRoute)
app.use(addNote)
app.use(getNote)
app.use(editNote)
app.use(deleteNote)

/**
 * port is a door to this app, we can access it via browser or
 * postman by typing localhost:<port_number>, just make sure
 * that you type four digit of port without leading zeroes (0003 ❌) (3000 ✅)
 */
// 👇 create a port with 3000 as value
const port = 3000
// 👇 use app "listen" method to tell the app to listen any request from port
app.listen(port, () => {
  // 👇 after app already listened, tell info in terminal that the app is already listening at given port
  console.log(`Notes API was running on http://localhost:3000`);
})