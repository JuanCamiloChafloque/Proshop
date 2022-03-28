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
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.post("/", protect, admin, createProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
