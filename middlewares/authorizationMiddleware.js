// 👇 require parseJwt function in jwtHelper.js by using "object destructuring"
const { parseJwt } = require("../helpers/jwtHelper")

/**
 * Authorize middleware function
 * middleware function SHOULD HAVE THREE PARAMETERS IN ORDER TO WORK!
 * @param {Object} req will be filled with request object by express, same as in the routes
 * @param {Object} res will be filled with response object by express, same as in the routes
 * @param {Function} next will be filled with anonymous function by express, to make way for us
 * to tell that this middleware is done and ready to be handled to route that using this middleware
 */
function authorize(req, res, next) {
  /**
   * token that recieved while register / login should be placed on authorization header by client
   * there are many types of token, the one that commonly used is "bearer token" that we use right now
   * inserting a header its an API client job, our job is to verify that the token is
   * 1. inserted
   * 2. using the right format
   * 3. not expired
   * A bearer token format will look like "Bearer <token>"
   */
  // 👇 verify that the token is inserted
  const authorization = req.headers.authorization
  if (!authorization) {
    res.send("No token detected")
  }
  // 👇 verify that the token is using bearer token format
  else if (!authorization.startsWith('Bearer')) {
    res.send('Wrong token format')
  }
  else {
    // 👇 as we learn in explanation above, that bearer token format is "Bearer <token>"
    // means to extract the <token>, we need to split the authorization by space (" ") first
    const splittedAuthorization = authorization.split(' ')
    // API client can still insert a header like "Bearer" with no <token>, to make sure that client inserted a right format
    // 👇 we need to verify the split result is more than two
    if (splittedAuthorization.length < 2) {
      // 👇 If the token format is wrong then tell the client that the token is wrong
      res.send("Wrong token format")
    } else {
      // 👇 use the <token> from splitted authorization
      const token = splittedAuthorization[1]
      // 👇 use parseJwt function to break down token information
      const user = parseJwt(token)
      if (!user) {
        // 👇 if the parseJwt returns null, tell that the token is expired
        res.send("Expired token")
      } else {
        // 👇 if its returning the token information, add a new user property in req object and fill it with token information
        req.user = user
        // 👇 tell express that we're done with this middleware and it's ready to be handled by the route who use this middleware
        next()
      }
    }
  }
}

module.exports = authorize