// 👇 use bcyrpt module to encrypt passwords
const bcrypt = require('bcrypt')
// 👇 bcrypt is using SALT_ROUNDS to tell how many should bcrypt encrypt the password, don't put high values if your computer is slow
const { SALT_ROUNDS } = process.env

async function hashPassword(password) {
  // 👇 bcrypt hash method is a promise because it takes some time to encrypt the password
  // 👇 bcrypt will encrypt the password, encrypted password by bcrypt usually called "hash"
  const hash = await bcrypt.hash(password, parseInt(SALT_ROUNDS)) // 👈 parseInt() is javascript function to convert stringt to number
  // anything inside envrionment variable is a string, but bcrypt hash method needs a number, that's why we use parseInt()
  return hash
}

async function comparePassword(password, hash) {
  // 👇 use bcrypt compare method to compare password inserted and the hash that already made in hashPassword()
  const isValidPassword = await bcrypt.compare(password, hash)
  return isValidPassword
}

module.exports = {
  hashPassword,
  comparePassword
}