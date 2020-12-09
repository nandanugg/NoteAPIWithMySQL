const { hash, compare } = require('bcrypt')
const { SALT_ROUNDS } = process.env

async function hashPassword(password) {
  const hashedPassword = await hash(password, parseInt(SALT_ROUNDS))
  return hashedPassword
}

async function comparePassword(password, hashedPassword) {
  const isValidPassword = await compare(password, hashedPassword)
  return isValidPassword
}

module.exports = {
  hashPassword,
  comparePassword
}