const express = require("express");
const router = express.Router();
const Store = require("../models/store.schema")
const Product = require("../models/products.schema");

router.get("/products/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId)
    if(!store){
        return res.status(404).json({message:"Store not found"})
    }
    const products = await Product.find({ storeName: store.name });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
