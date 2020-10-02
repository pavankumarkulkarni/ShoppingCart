const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const MONGO_CLOUD_URI =
  "mongodb+srv://ra13pa:ra13pa@cluster0.hath2.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_CLOUD_URI || "mongodb://localhost/shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(`DB error ${err}`);
  });

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    image: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number,
  })
);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    console.log("Error in get");
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  } catch (err) {
    console.log("Error in get");
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  } catch (err) {
    console.log("Error in get");
  }
});

const Order = mongoose.model(
  "Orders",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    totalPrice: Number,
    name: String,
    email: String,
    address: String,
    cartItems: [
      {
        _id: String,
        title: String,
        count: Number,
        price: Number,
      },
    ],
  })
);

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

app.post("/api/orders", async (req, res) => {
  const order = await new Order(req.body);
  const orderSaved = await order.save();
  res.send(orderSaved);
});

app.delete("/api/orders/:id", async (req, res) => {
  const orderDeleted = await Order.findByIdAndDelete(req.params.id);
  res.send(orderDeleted);
});

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: String,
    email: String,
  })
);

app.post("/api/users", async (req, res) => {
  const user = await new User(req.body);
  const userSaved = await user.save();
  res.send(userSaved);
});

app.get("/api/users/:email", async (req, res) => {
  const user = await User.find({ email: req.param.mail });
  res.send(user);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server at 'http://localhost:${port}`));
