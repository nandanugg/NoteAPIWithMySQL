const jwt = require('jsonwebtoken')
// 👇 use environment variables to help jwt methods create a token
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

// 👇 function to create a token
function signJwt(payload) {
  // 👇 use jwt "sign" method by adding information that wants to be included in token, secret code to encode it, and how long the token lasts
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
  return token
}

// 👇 function to break down token information
function parseJwt(token) {
  // 👇 due jwt "verify" method can make a error (as we can call it in future "throw an error")
  // we should implement try-catch to handle the error (as we can call it in future "catch the error")
  // to prevent the app from crashes and give a proper response
  try {
    // 👇 verify the token & take the information inside token to result variable
    const result = jwt.verify(token, JWT_SECRET)
    return result
  } catch (err) {
    // 👆 catch the error, the "err" parameter will contain information about what caused the error
    // 👇 log the error
    console.log(err);
    // 👇 return null, so we can use this function and add a condition if the token was wrong or expired
    return null
  }
}

// 👇 exports two function inside this file using "Object Property Value Shorthand", so any file that requires this file will recieves an object with two methods
module.exports = {
  signJwt,
  parseJwt
}