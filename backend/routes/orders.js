const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

//Controllers
const {
  addOrderItems,
  getOrderById,
} = require("../controllers/orderController");

router.get("/:id", protect, getOrderById);
router.post("/", protect, addOrderItems);

module.exports = router;
