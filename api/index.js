const bodyParser = require("body-parser");
const app = require("express")();
const session = require("express-session");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.set("trust proxy", 1);

app.use(cors());
let sess = {
  secret: "secret",
  saveUninitialized: true,
  resave: false
};

app.use(session(sess));

app.use(bodyParser.json());

app.get("/get-products", (req, res) => {
  axios
    .get(`https://e-trade-3fc92-default-rtdb.firebaseio.com/products.json`)
    .then(result => {
      let products = [];

      for (let key in result.data) {
        let product = { id: key, ...result.data[key] };
        products.push(product);
      }
      res.status(200).json({ products: products });
    });
});

app.get("/get-cart", (req, res) => {
  let cart = [];
  if (req.session.cart) {
    cart = req.session.cart;
  }
  let totalPrice = 0;

  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res.status(200).json({ cart: { items: cart, totalPrice: totalPrice } });
});

app.post("/add-item-in-basket", (req, res) => {
  let product = req.body.product;

  var cart = [];

  if (req.session.cart) {
    cart = req.session.cart;
  }

  if (cart.length > 0) {
    let same = cart.find(products => {
      return products.id == product.id;
    });

    if (same) {
      same.count += 1;
      same.totalPrice = same.count * same.price;
    } else {
      cart.push({ ...product, totalPrice: product.count * product.price });
    }
  } else {
    cart.push({ ...product, totalPrice: product.count * product.price });
  }

  req.session.cart = cart;

  let totalPrice = 0;

  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res
    .status(200)
    .json({ cart: { items: req.session.cart }, totalPrice: totalPrice });
});

app.post("/remove-item-in-basket", (req, res) => {
  let product = req.body.product;

  var cart = [];

  if (req.session.cart) {
    cart = req.session.cart;
  }

  let index = cart.findIndex(products => products.id === product.id);

  if (index > -1) {
    cart.splice(index, 1);
  }

  req.session.cart = cart;

  let totalPrice = 0;

  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res
    .status(200)
    .json({ cart: { items: req.session.cart }, totalPrice: totalPrice });
});

app.post("/uptade-item-in-basket", (req, res) => {
  let product = req.body.product;

  var cart = [];

  if (req.session.cart) {
    cart = req.session.cart;
  }

  if (cart.length > 0) {
    let same = cart.find(products => {
      return products.id == product.id;
    });

    if (same) {
      same.count = product.count;
      same.totalPrice = same.count * same.price;
    }
  }

  req.session.cart = cart;

  let totalPrice = 0;

  cart.forEach(element => {
    totalPrice += element.totalPrice;
  });

  res
    .status(200)
    .json({ cart: { items: req.session.cart }, totalPrice: totalPrice });
});

app.post("/set-cook", (req, res) => {
  let token = req.body;
  req.session.token = token;
  res.status(200).json({ token: req.session.token });
});

app.get("/get-token", (req, res) => {
  let token = req.session.token;
  let id = req.session.id;
  let email = req.session.email;

  res.status(200).json({ token: token, email: email, id: id });
});

app.get("/log-out", (req, res) => {
  req.session.token = "";
  res.status(200).json({ userInfo: { auth: false, token: "" } });
});

/* app.post("/add-orders-db", async (req, res) => {
  let orders = req.body.orders;
  let id = req.body.id;

  orders.forEach(async element => {
    let newStock = parseInt(element.stock) - element.count;
    await axios.put(
      `https://e-trade-3fc92-default-rtdb.firebaseio.com/products/${element.id}.json`,
      {
        ...element,
        stock: newStock
      }
    );
  });

  await axios
    .post(
      `https://e-trade-3fc92-default-rtdb.firebaseio.com/orders/${id}.json`,
      orders
    )
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(200).json(err);
    });
});
 */

module.exports = {
  path: "/api",
  handler: app
};
