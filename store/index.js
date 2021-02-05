import session from "express-session";
import cookies from "js-cookie";
export const state = () => ({
  products: [],
  itemsInBasket: [],
  orderedItems: null,
  totalPrice: 0,
  isAuth: false,
  isAdmin: false,
  token: "",
  email: "",
  localId: null,
  alreadyUse: false
});
export const mutations = {
  updateBasketItemCount(state, item) {
    let updatedItem = state.itemsInBasket.find(items => {
      return items.id == item.id;
    });
    updatedItem.count += item.newCount;
  },
  setOrderedItems(state, items) {
    state.orderedItems = items;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setAlreadyUse(state, value) {
    state.alreadyUse = value;
  },
  setItemsInBasket(state, item) {
    state.itemsInBasket = item;
  },
  setTotalPrice(state, totalPrice) {
    state.totalPrice = totalPrice;
  },
  setIsAuth(state, value) {
    state.isAuth = value;
  },
  setIsAdmin(state, value) {
    state.isAdmin = value;
  },
  setToken(state, token) {
    state.token = token;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setLocalId(state, localId) {
    state.localId = localId;
  }
};
export const actions = {
  async nuxtServerInit({ commit, dispatch }, context) {
    let product = await context.$axios.get("/get-products");
    commit("setProducts", product.data.products);

    let cart = await context.$axios.get("/get-cart");
    commit("setItemsInBasket", cart.data.cart.items);
    commit("setTotalPrice", cart.data.cart.totalPrice);

    let info = await context.$axios.get("/get-token");

    if (info.data.token) {
      if (info.data.token.email == "xpokales@gmail.com") {
        commit("setIsAdmin", true);
      }
      commit("setIsAuth", true);
      commit("setToken", info.data.token.token);
      commit("setEmail", info.data.token.email);
      commit("setLocalId", info.data.token.id);
    } else {
      commit("setIsAuth", false);
      commit("setEmail", "");
    }
  },
  addItemInBasket(vuexContext, product) {
    this.$axios
      .post("/add-item-in-basket", {
        product: { ...product, count: 1, totalPrice: 0 }
      })
      .then(result => {
        vuexContext.commit("setItemsInBasket", result.data.cart.items);
        vuexContext.commit("setTotalPrice", result.data.totalPrice);
      });
  },
  removeItemInBasket(vuexContext, product) {
    this.$axios
      .post("/remove-item-in-basket", {
        product: { ...product }
      })
      .then(result => {
        vuexContext.commit("setItemsInBasket", result.data.cart.items);
        vuexContext.commit("setTotalPrice", result.data.totalPrice);
      });
  },
  uptadeItemInBasket(vuexContext, product) {
    vuexContext.commit("updateBasketItemCount", {
      id: product.basket.id,
      newCount: product.newCount
    });
    this.$axios
      .post("/uptade-item-in-basket", {
        product: { ...product.basket }
      })
      .then(result => {
        vuexContext.commit("setItemsInBasket", result.data.cart.items);
        vuexContext.commit("setTotalPrice", result.data.totalPrice);
      });
  },
  createUser(vuexContext, user) {
    return this.$axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.SECRET_KEY}`,
        { ...user, returnSecureToken: true }
      )
      .then(response => {
        vuexContext.commit("setAlreadyUse", false);
      })
      .catch(err => {
        vuexContext.commit("setAlreadyUse", true);
      });
  },
  login(vuexContext, user) {
    return this.$axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.SECRET_KEY}`,
        { ...user, returnSecureToken: true }
      )
      .then(response => {
        if (response.data.email == "xpokales@gmail.com") {
          vuexContext.commit("setIsAdmin", true);
        } else {
          vuexContext.commit("setIsAdmin", false);
        }
        vuexContext.commit("setIsAuth", response.data.registered);
        vuexContext.commit("setToken", response.data.idToken);
        vuexContext.commit("setEmail", response.data.email);
        vuexContext.commit("setLocalId", response.data.localId);

        let token = {
          token: response.data.idToken,
          email: response.data.email,
          id: response.data.localId
        };

        this.$axios.post("/set-cook", token).then(result => {});
      })
      .catch(err => {
        return err;
      });
  },
  logOut(vuexContext) {
    return this.$axios.get("/log-out").then(response => {
      vuexContext.commit("setIsAuth", response.data.userInfo.auth);
      vuexContext.commit("setToken", response.data.userInfo.token);
      vuexContext.commit("setEmail", "");
      vuexContext.commit("setOrderedItems", null);
    });
  },
  async addOrdersDb(vuexContext, orders) {
    let id = vuexContext.state.localId;

    orders.forEach(async element => {
      let newStock = parseInt(element.stock) - element.count;
      await this.$axios.put(
        `https://e-trade-3fc92-default-rtdb.firebaseio.com/products/${element.id}.json`,
        {
          ...element,
          stock: newStock
        }
      );
    });

    await this.$axios
      .post(
        `https://e-trade-3fc92-default-rtdb.firebaseio.com/orders/${id}.json`,
        orders
      )
      .then(response => {});
  },
  getOrders(vuexContext) {
    let id = vuexContext.state.localId;

    return this.$axios
      .get(
        `https://e-trade-3fc92-default-rtdb.firebaseio.com/orders/${id}.json`
      )
      .then(result => {
        vuexContext.commit("setOrderedItems", result.data);
      });
  }
};
export const getters = {
  getProducts(state) {
    return state.products;
  },
  getCartItems(state) {
    return state.itemsInBasket;
  },
  getTotalPrice(state) {
    return state.totalPrice;
  },
  getIsAuth(state) {
    return state.isAuth;
  },
  getIsAdmin(state) {
    return state.isAdmin;
  },
  getEmail(state) {
    return state.email;
  },
  getOrders(state) {
    return state.orderedItems;
  },
  getAlreadyUse(state) {
    return state.alreadyUse;
  }
};
