const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

//Controllers
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");

router.post("/", protect, addOrderItems);
router.get("/", protect, admin, getOrders);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/pay", protect, updateOrderToPaid);
router.get("/:id", protect, getOrderById);

module.exports = router;
