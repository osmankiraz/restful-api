const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  { collection: "users", timestamps:true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
