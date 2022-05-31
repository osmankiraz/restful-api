const catchError = (err, req, res, next) => {
  if (err.code === 11000) {
    res.statusCode = 400;
    return res.json({
      message: JSON.stringify(err.keyValue) + " should be unique",
      errorCode: 400,
    });
  }

  if (err.code === 66) {
    res.statusCode = 400;
    return res.json({
      message: "You can not change immutable field!",
      errorCode: 400,
    });
  }

  res.status(err.statusCode).json({
    errorCode: err.statusCode,
    message: err.message,
  });
};

module.exports = catchError;
