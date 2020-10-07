const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await model.Product.find({});
    res.send(products);
  } catch (err) {
    console.log("Error in get");
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = new model.Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  } catch (err) {
    console.log("Error in get");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await model.Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  } catch (err) {
    console.log("Error in get");
  }
});
module.exports = router;
