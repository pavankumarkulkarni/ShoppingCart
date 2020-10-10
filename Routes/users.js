const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();

// create user
router.post("/", async (req, res) => {
  const user = await new model.User(req.body);
  const userSaved = await user.save();
  res.send(userSaved);
});

// Retrieve user by email id
router.get("/:email", async (req, res) => {
  console.log(req.params.email);
  const user = await model.User.find({ email: req.params.email });
  res.send(user);
});

// Retrieve addresses of user
router.get("/:id/adresses", async (req, res) => {
  const accnt = await model.User.findById(req.params.id);
  console.log(accnt);
  res.send(accnt.address);
});

// Add addresses of user
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

// Edit/update a specific address of user
router.patch("/:id/addresses/:addid", async (req, res) => {
  const user = await model.User.findById(req.params.id);
  let addresses = user.address;
  const addressToEdit = addresses.find(
    (address) => address._id === req.params.addid
  );
  const index = addresses.indexOf(addressToEdit);

  addresses[index] = req.body;

  await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { address: [...addresses] },
    }
  );
  const updatedUser = await model.User.findById(req.params.id);
  res.send(updatedUser);
});
// Delete one address of a user
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

// Set one of the addresses as favorite
router.patch("/:id/addresses/:addid/fav", async (req, res) => {
  const user = await model.User.findById(req.params.id);
  let addresses = user.address;

  const updatedAdd = addresses.map((add) => {
    add.fav = add._id === req.params.addid ? "true" : "false";
    return add;
  });

  await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { address: [...updatedAdd] },
    }
  );
  const updatedUser = await model.User.findById(req.params.id);
  res.send(updatedUser);
});
module.exports = router;
