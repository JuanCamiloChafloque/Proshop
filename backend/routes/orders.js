const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

//Controllers
const { addOrderItems } = require("../controllers/orderController");

router.post("/", protect, addOrderItems);

module.exports = router;
