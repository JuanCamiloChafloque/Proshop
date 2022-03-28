const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");

//@desc     Fetch all products
//@route    GET /api/products
//@access   public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword;
  let filter;
  if (keyword !== "undefined") {
    filter = {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    };
  } else {
    filter = {};
  }

  const count = await Product.countDocuments({ ...filter });

  const products = await Product.find({ ...filter })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

//@desc     Create a product
//@route    POST /api/products
//@access   private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Item",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc     Create new review for a product
//@route    POST /api/products/:id/reviews
//@access   private
const reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
};
