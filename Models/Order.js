const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        name: { type: String, required: true }, // snapshot 
        price: { type: Number, required: true }, // snapshot 
        quantity: { type: Number, required: true, min: 1, default: 1 },
        subtotal: { type: Number, required: true },
      },
    ],

    shippingInfo: {
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true },
      country: { type: String, default: "Egypt" },
      phone: { type: String, required: true },
      shippingMethod: {
        type: String,
        enum: ["standard", "express"],
        default: "standard",
      },
    },

    paymentInfo: {
      method: {
        type: String,
        enum: ["cod", "card", "wallet"],
        required: true,
      },
      status: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid",
      },
      transactionId: { type: String },
    },

    summary: {
      subtotal: { type: Number, required: true },
      shippingFee: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const OrderModel = mongoose.model("Order", orderSchema, "Orders");
module.exports = OrderModel;
