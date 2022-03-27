const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");

//Routes
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");

//Middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 5000;

//JSON Parser middleware
app.use(express.json());

//Routes Initialization
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/orders", orders);

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
