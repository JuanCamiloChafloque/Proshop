const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

//Controllers
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/pay", protect, updateOrderToPaid);
router.get("/:id", protect, getOrderById);

module.exports = router;
