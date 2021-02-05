<template >
  <v-card class="pa-5" width="250" outlined id="summary">
    <v-card-title primary-title> Sipariş Özeti </v-card-title>
    <h5 class="mb-5">Toplam {{ cartCount }} ürün</h5>
    <v-layout row align-center>
      <v-flex 4 class="mb-5">
        <v-card-text class="pb-0">Ürün Toplamı</v-card-text>
        <v-card-text class="pb-0">Kargo Ücreti</v-card-text>
        <v-card-text class="pb-0">Ek indirimler</v-card-text>
      </v-flex>
      <v-flex 4 class="mt-3">
        <p>{{ ConvertTwoDigits(totalPrice) }}₺</p>
        <p>{{ shippingCost }}₺</p>
        <p>{{ discount }}₺</p>
      </v-flex>
    </v-layout>
    <v-divider class="my-2"></v-divider>
    <v-layout row align-center>
      <v-flex 4>
        <v-card-text><strong>TOPLAM</strong></v-card-text>
      </v-flex>
      <v-flex 4>
        <v-card-text
          ><strong>{{ total }}₺</strong></v-card-text
        >
      </v-flex>
    </v-layout>

    <v-btn
      class="mt-5"
      block
      color="success"
      :disabled="cartCount == 0"
      @click="buy"
      >Satın Al</v-btn
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      shippingCost: 0,
      discount: 0,
    };
  },
  computed: {
    cartCount() {
      if (this.$store.getters.getCartItems.length) {
        return this.$store.getters.getCartItems.length;
      } else {
        return "0";
      }
    },
    totalPrice() {
      this.price = this.$store.getters.getTotalPrice;
      return this.$store.getters.getTotalPrice;
    },
    total() {
      return this.ConvertTwoDigits(
        this.price + this.shippingCost - this.discount
      );
    },
  },
  methods: {
    ConvertTwoDigits(x) {
      return Number.parseFloat(x).toFixed(2);
    },
    buy() {
      if (this.$store.getters.getIsAuth) {
        let orders = this.$store.getters.getCartItems;
        this.$store.dispatch("addOrdersDb", orders);
      } else {
        this.$router.push("/register");
      }
    },
  },
};
</script>

