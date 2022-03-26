const express = require("express");
const router = express.Router();

//Controllers
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
