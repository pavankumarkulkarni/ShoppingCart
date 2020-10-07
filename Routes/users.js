const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await new model.User(req.body);
  const userSaved = await user.save();
  res.send(userSaved);
});

router.get("/:email", async (req, res) => {
  console.log(req.params.email);
  const user = await model.User.find({ email: req.params.email });
  res.send(user);
});

router.get("/:id/adresses", async (req, res) => {
  const accnt = await model.User.findById(req.params.id);
  console.log(accnt);
  res.send(accnt.address);
});

router.patch("/:id/adresses", async (req, res) => {
  const accnt = await model.User.findById(req.params.id);

  let address = accnt.address;
  address.push(req.body);

  const updated_accnt = await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { address: [...address] },
    }
  );

  res.send(updated_accnt);
});

module.exports = router;
