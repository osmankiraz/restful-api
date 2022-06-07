const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  // Normalde verdiğimiz schema isminin sonuna default olarak s takısı getirilerek collection isimi oluşur
  // Bu değeri istediğimi collection name ile değiştirmek için bu şekilde option objesi içine yazabiliriz.
  { collection: "users", timestamps: true }
);

const schema = Joi.object({
  name: Joi.string().min(3).max(50).trim(),
  userName: Joi.string().min(3).max(50).trim(),
  email: Joi.string().trim().email(), // unique kontrolunun yapılmamasının sebebi veritabanına gitmeden önce yapılan bir işlem olmasıdır.
  password: Joi.string().trim(),
});

// It uses create new user
UserSchema.methods.joiValidation = function (userObject) {
  schema.required();
  return schema.validate(userObject);
};

UserSchema.statics.login = async (email, password) => {
  const { error, value } = schema.validate({ email, password });

  if (error) {
    throw createError(400, error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, "Incorrect password or email");
  }

  const passwordControl = await bcrypt.compare(password, user.password);
  if (!passwordControl) {
    throw createError(400, "Incorrect password or email");
  }

  return user;
};

// It uses update user
UserSchema.statics.joiValidationForUpdate = function (userObject) {
  return schema.validate(userObject);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user._id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.password;
  delete user.__v;

  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
