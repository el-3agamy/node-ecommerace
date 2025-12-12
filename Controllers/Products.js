const { productModel } = require("../Models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    res.status(200).json({ data: allProducts, msg: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ data: product, msg: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addNewProduct = async (req, res) => {
  try {
    const { name, description, seller, price, stock } = req.body;
    const img = req.file ? `/Uploads/${req.file.filename}` : null;

    if (!img) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const newProduct = await productModel.create({
      name,
      description,
      seller,
      price,
      stock,
      img,
    });

    res
      .status(201)
      .json({ data: newProduct, msg: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (req.file) {
      updateData.img = `/Uploads/${req.file.filename}`;
    }

    const product = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ data: product, msg: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
