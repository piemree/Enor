<template >
  <v-container>
    <v-layout column wrap>
      <v-card-title primary-title> Siparişlerim </v-card-title>
      <v-flex md10>
        <Orders v-for="(item, i) in items" :key="i" :items="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Orders from "@/components/orders/orders";
export default {
  data() {
    return {
      orders: null,
      items: [],
    };
  },

  created() {
    this.$store.dispatch("getOrders").then(() => {
      this.orders = this.$store.getters.getOrders;

      for (let item in this.orders) {
        this.items.push(this.orders[item]);
      }
      this.items.reverse();
    });
  },

  components: {
    Orders,
  },
  middleware: "auth2",
};
</script>
