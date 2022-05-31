const router = require("express").Router();
const User = require("../models/user-model");
const createError = require("http-errors");
const { create } = require("../models/user-model");

// This function should get all users
router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

// This function should get specific user
router.get("/:id", (req, res) => {
  res.json({
    message: `id değeri ${req.params.id} olan kullanıcı listeleniyor`,
  });
});

// This function should post new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.json(result);
  } catch (error) {
    console.log("Error while adding user : ", error);
  }
});

// This function should update specific user
router.patch("/:id", async (req, res, next) => {

  delete req.body.password;
  delete req.body.createdAt;
  delete req.body.updatedAt;
  
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (result) {
      res.json({
        message: ` User with ${req.params.id} id updated`,
        value: result,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    //  console.log("Error while updating user : ",error)
    // return res.status(404).json({ message: error });
    next(createError(400,error));
  }
});

// This function should delete specific user
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      return res.json({ message: "User deleted" });
    } else {
      // return res.status(404).json({ message: "User not found" });
      // throw new Error('User not found')
      // const error = new Error("User not found");
      // error.errorCode = 404;
      throw createError(404, "User not found");
    }
  } catch (error) {
    next(createError(400, err));
    // console.log("Error while deleting user : ", error);
    // return res.status(404).json({ message: error });
  }
});

module.exports = router;
