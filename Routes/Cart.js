const express = require("express");
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require("../Controllers/Cart");
const { authMiddleware } = require("../Middleware/authMiddleware");

router.use(authMiddleware); 

router.get("/", getCart);
router.post("/add", addToCart);
router.patch("/update", updateCartItem);
router.delete("/remove", removeFromCart);
router.delete("/clear", clearCart);

module.exports = router;
