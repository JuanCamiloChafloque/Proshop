const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const router = express.Router();

//@desc     Fetch all products
//@route    GET /api/products
//@access   public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
  })
);

//@desc     Fetch a single product
//@route    GET /api/products/:id
//@access   public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  })
);

module.exports = router;
