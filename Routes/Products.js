const express = require("express");
const {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/Products");
const upload = require("../Middleware/multerMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("img"), addNewProduct);
router.patch("/:id", upload.single("img"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
