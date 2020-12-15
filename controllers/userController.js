/**
 * A controller is a collection of function that have responsibilities for:
 * 1. Handling requests that come from routes
 * 2. Do logics based on what route or queries that client requests
 *
 * We can see the benefits of the controller, some of them are
 * 1. Centralized import, we can see that we import jwtHelper.js in one file, it saves memory
 * by just declaring less variable
 * 2. Easier handling, sometimes we will use the same function in both route, by using controller
 * we can modularize that function without creating a new file
 */

const { hashPassword, comparePassword } = require("../helpers/bcryptHelper");
const { signJwt } = require("../helpers/jwtHelper");
const model = require("../model/userModel");

function prepareReturn(user) {

  /**
   * We should not give client the hashed password, because hashed password can still be cracked by hacker by using PTH (Pass The Hash) attack
   * More on 👇
   * https://security.stackexchange.com/questions/110948/password-hashing-on-frontend-or-backend
   * https://www.beyondtrust.com/resources/glossary/pass-the-hash-pth-attack
   */

  delete user.password
  const token = signJwt({ ...user })
  return {
    ...user,
    token
  }
}

// 👇 below are the same code from register & login route, but changed to functions
async function register(body) {
  const { password, username } = body

  const isUserExists = await model.isExists({ username })
  if (isUserExists) throw 'Username found, please log in'

  const hashedPassword = await hashPassword(password)
  let user = {
    username,
    password: hashedPassword
  }
  user = await model.add(user)

  return prepareReturn(user)
}

async function login(body) {
  const { username, password } = body

  const user = await model.getOne({ username })
  if (!user) throw 'User not found'

  user.password = user.password.toString()
  const isPasswordMatch = await comparePassword(password, user.password)
  if (!isPasswordMatch) throw 'Password not match'

  return prepareReturn(user)
}

module.exports = {
  register,
  login
}