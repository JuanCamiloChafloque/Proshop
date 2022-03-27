const asyncHandler = require("express-async-handler");
const Order = require("../model/Order");

//@desc     Create new order
//@route    POST /api/orders
//@access   private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc     Get order by Id
//@route    POST /api/orders/:id
//@access   private
const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate("user", "name email");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = { addOrderItems, getOrderById };
