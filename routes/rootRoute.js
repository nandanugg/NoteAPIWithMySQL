/**
 * This is a route
 * Everytime there's a term like "create a route"
 * means we should make this file, with this exact code
 */
// 👇 require express module
const express = require('express')
// 👇 use express "Router" method to make a "route app" that can be imported to index.js
const app = express.Router()

// 👇 use app "get" method to tell that this route is listening on GET requests on root ("/") route
app.get('/', (req, res) => {
  // 👇 use res parameter method called "send" to send a string if anyone access this route
  res.send('Welcome to Note API')
})

// 👇 export app as module so it can be imported to another file
module.exports = app