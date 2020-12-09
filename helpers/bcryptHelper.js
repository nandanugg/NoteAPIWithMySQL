const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = process.env

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
  return hash
}

async function comparePassword(password, hash) {
  const isValidPassword = await bcrypt.compare(password, hash)
  return isValidPassword
}

module.exports = {
  hashPassword,
  comparePassword
}