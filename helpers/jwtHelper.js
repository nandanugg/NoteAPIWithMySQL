const { sign, verify } = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRES } = process.env

function signJwt(payload) {
  const token = sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
  return token
}

function parseJwt(token) {
  try {
    const result = verify(token, JWT_SECRET)
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