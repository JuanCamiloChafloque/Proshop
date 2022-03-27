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
} = require("../controllers/userController");

router.post("/login", authUser);
router.post("/", registerUser);
router.get("/", protect, admin, getUsers);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
