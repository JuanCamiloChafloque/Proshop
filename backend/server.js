const express = require("express");
const products = require("./data/products");

const app = express();
const PORT = 5000;

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((prod) => prod._id === id);
  res.status(200).json(product);
});

app.listen(PORT, console.log("Server running on port " + PORT));
