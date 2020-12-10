function errorMiddleware(err, req, res, next) {
  if (err.code == "ER_DUP_ENTRY")
    res.status(400).send("Duplicate entry")
  else
    res.status(500).send({
      message: "please tell backend developer about this error",
      err
    })
}

module.exports = errorMiddleware