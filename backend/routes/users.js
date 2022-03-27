const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

//Controllers
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

router.post("/login", authUser);
router.post("/", registerUser);
router.get("/", protect, admin, getUsers);
router.get("/profile", protect, getUserProfile);
router.get("/:id", protect, admin, getUserById);
router.put("/profile", protect, updateUserProfile);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
