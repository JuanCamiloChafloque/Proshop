const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

//Controllers
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
  getTopProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, reviewProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
