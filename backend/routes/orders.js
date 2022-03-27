const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

//Controllers
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/orderController");

router.get("/:id", protect, getOrderById);
router.post("/", protect, addOrderItems);
router.put("/:id/pay", protect, updateOrderToPaid);

module.exports = router;
