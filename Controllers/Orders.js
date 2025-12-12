const Order = require("../Models/Order");

//  Create new order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ data: order, msg: "Order created successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("client").populate("items.product");
    res.status(200).json({ data: orders, msg: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get orders of a specific user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ client: userId }).populate("items.product");
    res.status(200).json({ data: orders, msg: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("client")
      .populate("items.product");
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.status(200).json({ data: order, msg: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.status(200).json({ data: order, msg: "Order status updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  Delete order (Admin)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.status(200).json({ msg: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
