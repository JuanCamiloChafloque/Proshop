const mongoose = require("mongoose");
const dotenv = require("dotenv");
const products = require("./data/products");
const users = require("./data/users");
const Product = require("./model/Product");
const User = require("./model/User");
const Order = require("./model/Order");
const db = require("./config/db");

dotenv.config();
db();

const importData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data imported to DB...");
    process.exit();
  } catch (err) {
    console.log("Failed to import to DB...");
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Data deleted to DB...");
    process.exit();
  } catch (err) {
    console.log("Failed to delete to DB...");
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
