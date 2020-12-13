const { hashPassword, comparePassword } = require("../helpers/bcryptHelper");
const { signJwt } = require("../helpers/jwtHelper");
const UserModel = require("../model/userModel");

class UserController {
  constructor() {
    this.model = new UserModel()
  }

  async register(body) {
    const { password, username } = body

    const isUserExists = await this.model.isExists({ username })
    if (isUserExists) throw 'Username found, please log in'

    const hashedPassword = await hashPassword(password)
    let user = {
      username,
      password: hashedPassword
    }
    user = await this.model.add(user)
    user = { ...user }

    // https://security.stackexchange.com/questions/110948/password-hashing-on-frontend-or-backend
    // https://www.beyondtrust.com/resources/glossary/pass-the-hash-pth-attack
    delete user.password
    const token = signJwt(user)
    return {
      ...user,
      token
    }
  }

  async login(body) {
    const { username, password } = body

    const user = await this.model.getOne({ username })
    if (!user) throw 'User not found'

    const stringHashPassword = user.password.toString()
    const isPasswordMatch = await comparePassword(password, stringHashPassword)
    if (!isPasswordMatch) throw 'Password not match'

    delete user.password
    const token = signJwt({ ...user })
    return {
      ...user,
      token
    }
  }
}

module.exports = UserController