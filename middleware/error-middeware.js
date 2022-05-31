const catchError = (err, req, res, next) => {

    if (err.name ==="CastError") {
        res.status(400).json({message:"Please enter valid id"})
    } else {
        res.status(err.errorCode).json({
            message:err.message
        })
    }

  res.json({
      errorMessage:err.message,
  })
};

module.exports=catchError;