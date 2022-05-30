const router = require("express").Router();
const User = require("../models/user-model");

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
router.patch("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true ,runValidators:true}
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
     return res.status(404).json({ message: error });
  }
});

// This function should delete specific user
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      return res.json({ message: "User deleted" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error while deleting user : ", error);
    return res.status(404).json({ message: error });
  }
});

module.exports = router;
