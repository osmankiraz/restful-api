const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/user-model");

const auth = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const verifiedTokenPayload = jwt.verify(token, "secretkey");
      req.user = await User.findById({ _id: verifiedTokenPayload._id });
      next();
    } else {
      next(createError(400, "Token must be provided"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
