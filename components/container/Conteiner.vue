<template >
  <v-container class="my-5 mx-auto" full-width>
    <v-layout row wrap justify-space-around>
      <v-flex xs10 sm6 md3 v-for="(product,i) in products"  :key="i">
        <Cart :product="product" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Cart from "@/components/container/Cart";
export default {
  component: {
    Cart,
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
};
</script>
