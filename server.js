const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
// app.use(bodyParser);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// const MONGO_CLOUD_URI =
//   "mongodb+srv://ra13pa:ra13pa@cluster0.hath2.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/shopping-cart-db", {
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

// let prd1 = {
//   image: "/images/dress2.jpg",
//   title: "Midi sundress with ruched front",
//   description:
//     "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
//   availableSizes: ["X", "M", "L"],
//   price: 18.9,
// };

// let new_prd1 = new Product(prd1);
// new_prd1.save((err) => {
//   if (err) {
//     console.log("error in saving");
//   } else {
//     console.log("saved");
//   }
// });

// prd1 = {
//   image: "/images/dress1.jpg",
//   title: "Midi sundress with shirring detail",
//   description:
//     "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
//   availableSizes: ["X", "L", "XL", "XXL"],
//   price: 29.9,
// };

// new_prd1 = new Product(prd1);
// new_prd1.save((err) => {
//   if (err) {
//     console.log("error in saving");
//   } else {
//     console.log("saved");
//   }
// });

// prd1 = {
//   image: "/images/dress3.jpg",
//   title: "Midi dress in pink ditsy floral",
//   description:
//     "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
//   availableSizes: ["X", "M", "L"],
//   price: 14.9,
// };

// new_prd1 = new Product(prd1);
// new_prd1.save((err) => {
//   if (err) {
//     console.log("error in saving");
//   } else {
//     console.log("saved");
//   }
// });

// prd1 = {
//   image: "/images/dress4.jpg",
//   title: "cami maxi dress in polka dot",
//   description:
//     "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
//   availableSizes: ["XL"],
//   price: 25.9,
// };

// new_prd1 = new Product(prd1);
// new_prd1.save((err) => {
//   if (err) {
//     console.log("error in saving");
//   } else {
//     console.log("saved");
//   }
// });

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

app.post("/api/orders", async (req, res) => {
  const order = await new Order(req.body);
  const orderSaved = await order.save();
  res.send(orderSaved);
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

app.delete("/api/orders/:id", async (req, res) => {
  const orderDeleted = await Order.findByIdAndDelete(req.params.id);
  res.send(orderDeleted);
});

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
app.listen(port, () => console.log(`server at 'http://localhost:${port}`));
