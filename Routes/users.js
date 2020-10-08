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

  await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { address: [...address] },
    }
  );
  const updatedUser = await model.User.findById(req.params.id);
  res.send(updatedUser);
});

router.delete("/:custid/addresses/:addid", async (req, res) => {
  const user = await model.User.findById(req.params.custid);
  const addresses = user.address;
  const remainingAddresses = addresses.filter(
    (address) => address._id !== req.params.addid
  );
  await model.User.updateOne(
    { _id: req.params.custid },
    {
      $set: { address: [...remainingAddresses] },
    }
  );
  const updatedUser = await model.User.findById(req.params.custid);
  res.send(updatedUser);
});

module.exports = router;
