const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

function signJwt(payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
  return token
}

function parseJwt(token) {
  try {
    const result = jwt.verify(token, JWT_SECRET)
    return result
  } catch (err) {
    console.log(err);
    return null
  }
}

module.exports = {
  signJwt,
  parseJwt
}