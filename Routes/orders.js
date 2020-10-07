const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await model.Order.find({});
  res.send(orders);
});

router.post("/", async (req, res) => {
  const order = await new model.Order(req.body);
  const orderSaved = await order.save();
  res.send(orderSaved);
});

router.delete("/:id", async (req, res) => {
  const orderDeleted = await model.Order.findByIdAndDelete(req.params.id);
  res.send(orderDeleted);
});

module.exports = router;
