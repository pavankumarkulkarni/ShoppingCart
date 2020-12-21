const model = require("../DBModels/mongooseModels");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

require("dotenv/config");
// create user
router.post("/", async (req, res) => {
  const user = await new model.User(req.body);
  const userSaved = await user.save();
  res.send(userSaved);
});

// Retrieve user by email id
router.get("/:email", async (req, res) => {
  // console.log(req.params.email);
  const user = await model.User.find({ email: req.params.email });
  res.send(user);
});

// Retrieve addresses of user
router.get("/:id/addresses", async (req, res) => {
  const accnt = await model.User.findById(req.params.id);
  // console.log(accnt);
  res.send(accnt.address);
});

// Retrieve cards of user
router.get("/:id/cards", async (req, res) => {
  const accnt = await model.User.findById(req.params.id);
  // console.log(accnt);
  res.send(accnt.card);
});

// Add addresses of user
router.patch("/:id/addresses", async (req, res) => {
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

// Add cards of user
router.patch("/:id/cards", async (req, res) => {
  const accnt = await model.User.findById(req.params.id);

  let card = accnt.card;
  card.push(req.body);
  // console.log(req.body)
  await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { card: [...card] },
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

// Edit/update a specific card of user
router.patch("/:id/cards/:cardid", async (req, res) => {
  const user = await model.User.findById(req.params.id);
  let cards = user.card;
  const cardToEdit = cards.find((card) => card._id === req.params.cardid);
  const index = cards.indexOf(cardToEdit);

  cards[index] = req.body;

  await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { card: [...cards] },
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

// Delete one card of a user
router.delete("/:custid/cards/:cardid", async (req, res) => {
  const user = await model.User.findById(req.params.custid);
  const cards = user.card;
  const remainingCards = cards.filter((card) => card._id !== req.params.cardid);
  await model.User.updateOne(
    { _id: req.params.custid },
    {
      $set: { card: [...remainingCards] },
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

// Set one of the cards as favorite
router.patch("/:id/cards/:cardid/fav", async (req, res) => {
  const user = await model.User.findById(req.params.id);
  // console.log(user);
  let cards = user.card;

  const updatedCard = cards.map((card) => {
    card.fav = card._id === req.params.cardid ? "true" : "false";
    return card;
  });

  await model.User.updateOne(
    { _id: req.params.id },
    {
      $set: { card: [...updatedCard] },
    }
  );
  const updatedUser = await model.User.findById(req.params.id);
  res.send(updatedUser);
});

//Register user
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordcheck } = req.body;
    if (!email || !password || !passwordcheck) {
      res
        .status(400)
        .json({ msg: "Missing fields needed for succesful registration" });
      return;
    }
    if (password !== passwordcheck) {
      res.status(400).json({ msg: "Passwords don't match." });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ msg: "Password should be atleast 6 characters." });
      return;
    }
    const existingUser = await model.User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ msg: "This email id exists. Try loggin in." });
      return;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new model.User({
      email,
      passwordHash: passwordHash,
    });
    await newUser.save();
    res.status(200).json({
      msg: "Account created succesfully. SignIn with email and password",
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
    return;
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Missing fields for succesful SignIn" });
    }
    const user = await model.User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No registrations with this email id." });
    }
    if (!user.passwordHash) {
      return res.status(400).json({
        msg: "No registrations with this email id. Try Google login.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = JWT.sign(user._id, process.env.JWT_SECRET);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        address: user.address,
        card: user.card,
      },
      msg: "Succesful Signin",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
