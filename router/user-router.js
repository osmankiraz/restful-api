const router = require("express").Router();

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const userController = require("../controllers/user-controller");

// This function should get all users
router.get("/", [authMiddleware, adminMiddleware], userController.getAllUsers);

// This function should get you
router.get("/me", authMiddleware, userController.getCurrentUser);

router.patch("/me", authMiddleware, userController.updateCurrentUser);

// This function should get specific user
/* router.get("/:id", (req, res) => {
  res.json({
    message: `id değeri ${req.params.id} olan kullanıcı listeleniyor`,
  });
});
 */

// This function should post new user
router.post("/", userController.newUser);

router.post("/login", userController.login);

// This function should update specific user
router.patch("/:id", userController.updateSpecificUser);

// This function shoul delete all users
router.delete(
  "/deleteAll",
  [authMiddleware, adminMiddleware],
  userController.deleteAllUsers
);

router.delete("/me", [authMiddleware], userController.deleteCurrentUser);

// This function should delete specific user
router.delete("/:id", userController.deleteSpecificUser);

module.exports = router;
