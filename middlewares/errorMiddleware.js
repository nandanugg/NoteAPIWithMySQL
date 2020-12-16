function errorMiddleware(err, req, res, next) {
  if (Array.isArray(err)) {
    res.status(400).send(err)
  }
  else if (typeof err === 'string') {
    res.status(400).send(err)
  }
  else if (err.code == "ER_DUP_ENTRY")
    res.status(400).send("Duplicate entry")
  else {
    res.status(500).send({
      message: "please tell backend developer about this error",
      errors: {
        message: err.message,
        stack: err.stack,
      }
    })
  }
}

module.exports = errorMiddleware