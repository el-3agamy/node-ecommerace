const express = require("express");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../Controllers/Orders");
const { authMiddleware, allowRoles } = require("../Middleware/authMiddleware"); 
const router = express.Router();
router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, allowRoles("admin"), getAllOrders);
router.get("/user/:userId", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getOrderById);
router.patch("/:id/status", authMiddleware,allowRoles("admin"), updateOrderStatus);
router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;
