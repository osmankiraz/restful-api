const catchError = (err, req, res, next) => {
  if (err.code === 11000) {
    res.statusCode = 400;
    return res.json({
      message:
        Object.keys(err.keyValue) +
        " için girdiğiniz değer " +
        Object.values(err.keyValue) +
        "daha önceden eklenmiş olduğu için tekrar eklenemez , unique olmalıdır", //JSON.stringify(err.keyValue) + " should be unique",
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

  // console.log("err yazdııııır => ",err)
 res.status(err.statusCode || 400)
  res.json({
    errorCode: err.statusCode,
    message: err.message,
  });
};

module.exports = catchError;
