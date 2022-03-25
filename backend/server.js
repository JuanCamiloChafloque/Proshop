const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((prod) => prod._id === id);
  res.status(200).json(product);
});

app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);
