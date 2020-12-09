// a error handler is same as middleware, the difference is an error handler MUST
// have four parameter 👇 if don't it will be not considered as error handler by express
function errorMiddleware(err, req, res, next) {
  // handle mysql error
  // 👇 if mysql detects duplicate in unique column
  if (err.code == "ER_DUP_ENTRY")
    // 👇 send a proper message to client
    res.status(400).send("Duplicate entry")
  else
    // 👇 if there's any error other that above ifs, just send the error to client
    res.status(500).send({
      message: "please tell backend developer about this error",
      err
    })
}

module.exports = errorMiddleware