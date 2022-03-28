const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/db");

//Routes
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const uploads = require("./routes/uploads");

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
app.use("/api/upload", uploads);

//Paypal key route
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//Make upload folder static
app.use("/uploads", express.static(path.join(__dirname, "..", "/uploads")));

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
