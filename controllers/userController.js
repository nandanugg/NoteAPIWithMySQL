const { hashPassword, comparePassword } = require("../helpers/bcryptHelper");
const { signJwt } = require("../helpers/jwtHelper");
const UserModel = require("../model/userModel");
const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor() {
    super(UserModel)
  }

  /**
   * Underscored method name usually means that the method is used
   * only for internal method, this concept is called "OOP Encapculation"
   * which makes any methods or property belongs (or in OOP its called "private")
   * to the class, not to the code who use this class (or in OOP is called "public").
   * 
   * Just remember that we can still use this method outside of this class
   * by just typing it's name which not makes it "private", that's because
   * Javascript isn't really a programming language designed to do OOP, that's
   * why people who want to use OOP in Javascript agrees this as "convention"
   * rather than a real private method.
   * 
   * More on that at 👉 https://github.com/johnpapa/angular-styleguide/issues/703#issuecomment-202557952
   * 
   * Q: Can we just declare this method outside of this class as function,
   * and make class method use the function?
   * A: Yes, but it will be a big hassle if we want to change something,
   * because we will need to constantly scroll outside & inside the class to make
   * changes.
   */

  _prepareReturn(user) {
    delete user.password
    const token = signJwt({ ...user })
    return {
      ...user,
      token
    }
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

    return this._prepareReturn(user)
  }

  async login(body) {
    const { username, password } = body

    const user = await this.model.getOne({ username })
    if (!user) throw 'User not found'

    user.password = user.password.toString()
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) throw 'Password not match'

    return this._prepareReturn(user)
  }
}

module.exports = UserController