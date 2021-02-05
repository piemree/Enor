<template >
  <v-card class="mb-16">
    <v-app-bar color="white" app flat>
      <v-btn x-large text to="/" plain>ENOR</v-btn>

      <v-spacer />

      <div v-show="isAuth" class="mr-5">
        <v-btn to="/orders" small class="px-0" id="orders" plain>
          Siparişlerim</v-btn
        >
      </div>
      <v-btn to="/admin" v-show="isAuth" medium text :disabled="!isAdmin">{{
        email
      }}</v-btn>
      <nuxt-link to="/basket" tag="div" class="mr-5">
        <v-btn x-small class="px-0" id="box" plain
          ><v-badge :content="cartCount" color="red" overlap>
            <v-icon large>mdi-cart</v-icon>
          </v-badge></v-btn
        >
        <label class="icon-label" for="box">Sepet</label>
      </nuxt-link>

      <nuxt-link v-show="!isAuth" to="/register" tag="div" class="mr-5">
        <v-btn x-small class="px-0" id="account" plain
          ><v-icon large>mdi-account</v-icon></v-btn
        >
        <label class="icon-label" for="account">Giriş/Kayıt</label>
      </nuxt-link>

      <div v-show="isAuth" class="mr-5">
        <v-btn @click="logOut" x-small class="px-0" id="exit" plain
          ><v-icon large>mdi-logout</v-icon></v-btn
        >
        <label class="icon-label" for="exit">Çıkış</label>
      </div>
    </v-app-bar>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    cartCount() {
      if (this.$store.getters.getCartItems.length) {
        return this.$store.getters.getCartItems.length;
      } else {
        return "0";
      }
    },
    isAuth() {
      return this.$store.getters.getIsAuth;
    },
    email() {
      return this.$store.getters.getEmail;
    },
    isAdmin() {
      return this.$store.getters.getIsAdmin;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut").then((params) => {
        this.$router.push("/register");
      });
    },
  },
};
</script>
<style scoped>
.icon-label {
  cursor: pointer;
}
</style>