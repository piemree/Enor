<template >
  <div class="px-15">
    <v-layout row wrap justify-space-around>
      <v-flex md8 sm10>
        <AddedCard v-for="item in items" :item="item" :key="item.id" />
      </v-flex>
      <v-flex md3 sm10>
        <Summary />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import AddedCard from "@/components/basket/AddedCard";
import Summary from "@/components/basket/BasketSumm";
export default {
  components: {
    AddedCard,
    Summary,
  },
  computed: {
    items() {
      return this.$store.getters.getCartItems;
    },
  },
};
</script>
