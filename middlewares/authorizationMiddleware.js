const { parseJwt } = require("../helpers/jwtHelper")

function authorize(req, res, next) {
  const authorization = req.headers.authorization
  if (!authorization) {
    res.send("No token detected")
  }
  else if (!authorization.startsWith('Bearer')) {
    res.send('Wrong token format')
  }
  else {
    const splittedAuthorization = authorization.split(' ')
    if (splittedAuthorization.length < 2) {
      res.send("Wrong token format")
    } else {
      const token = splittedAuthorization[1]
      const user = parseJwt(token)
      if (!user) {
        res.send("Expired token")
      } else {
        req.user = user
        next()
      }
    }
  }
}

module.exports = authorize