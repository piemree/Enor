const bodyParser = require("body-parser");
const app = require("express")();
const session = require("express-session");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

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

app.post("/sign-up", (req, res) => {
  let user = req.body.user;

  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${SECRET_KEY}`,
      { ...user, returnSecureToken: true }
    )
    .then(response => {
      res.status(200).json({ ok: "kayıt başarılı" });
    })
    .catch(err => {
      res.status(200).json({ err: "eposta kullanılıyor" });
    });
});

app.post("/sign-in", (req, res) => {
  let user = req.body.user;
/*   axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${SECRET_KEY}`,
      { ...user, returnSecureToken: true }
    )
    .then(response => {
      req.session.token = {
        token: response.data.idToken,
        email: response.data.email,
        id: response.data.localId
      };

      res.status(200).json({
        userInfo: {
          auth: response.data.registered,
          token: response.data.idToken,
          email: response.data.email,
          localId: response.data.localId
        }
      });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    }); */

    console.log("serever in login post");
    res.status(200).json({
      userInfo: {
        auth: true,
        token: "a54f6a54fdf6ds45f",
        email: "ananan@asdasd.com",
        localId: "localıdddd"
      }
    });

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

app.post("/add-orders-db", async (req, res) => {
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

app.post("/get-orders", (req, res) => {
  let id = req.body.id;
  axios
    .get(`https://e-trade-3fc92-default-rtdb.firebaseio.com/orders/${id}.json`)
    .then(result => {
      res.status(200).json(result.data);
    });
});

module.exports = {
  path: "/api",
  handler: app
};
