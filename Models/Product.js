const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of product is required."],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      minlength: 15,
      maxlength: 333,
      trim: true,
    },
    seller: {
      type: String,
      required: [true, "Seller name is required."],
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    img: {
      type: String,
      required: [true, "Product image is required."],
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const productModel = mongoose.model("Products", productSchema, "Products");
module.exports = { productModel };
