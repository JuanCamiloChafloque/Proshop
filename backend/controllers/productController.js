const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");

//@desc     Fetch all products
//@route    GET /api/products
//@access   public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

//@desc     Fetch a single product
//@route    GET /api/products/:id
//@access   public
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

module.exports = { getProducts, getProductById, deleteProduct };
