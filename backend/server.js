const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");

//Routes
const products = require("./routes/products");

//Middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/products", products);

// Re-routing for non existing routes
app.use(notFound);
//Error handler middleware
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);
