const { cartModel } = require("../Models/Cart");

// Get user cart
const getCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    res.status(200).json({ data: cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) {
      cart = new cartModel({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json({ data: cart, msg: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );
    if (!item) return res.status(404).json({ msg: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ data: cart, msg: "Cart updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ data: cart, msg: "Product removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.status(200).json({ msg: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
