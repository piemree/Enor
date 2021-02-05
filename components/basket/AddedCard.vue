<template >
  <v-card outlined class="my-5">
    <v-card-title class="pb-0 text-subtitle-1" primary-title>
      <strong>Ürün Adı:{{ item.title }}</strong>
    </v-card-title>

    <v-divider class="my-2"></v-divider>
    <v-container class="pl-5">
      <v-layout justify-space-around align-center>
        <v-flex md3 xs3>
          <v-img :aspect-ratio="4 / 4" :src="item.imageUrl"> </v-img>
        </v-flex>
        <v-flex md3>
          <p class="text-center">
            <strong>STOK:{{ item.stock }}</strong>
          </p>
        </v-flex>
        <v-flex md3 class="text-center">
          <v-main class="pa-0">
            <v-btn
              @click="item.count != 1 ? chanceCount(-1) : (item.count = 1)"
              class="mr-1"
              fab
              dark
              x-small
              tile
              color="red"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            <label>{{ item.count }}</label>
            <v-btn
              @click="item.count < item.stock ? chanceCount(+1) : (item.count = item.count)"
              class="ml-1"
              fab
              dark
              x-small
              tile
              color="success"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-main>
        </v-flex>
        <v-flex md3>
          <v-layout row align-center>
            <v-flex md6>
              <p class="text-center mb-0">
                {{ ConvertTwoDigits(item.totalPrice) }}₺
              </p>
            </v-flex>
            <v-flex md6>
              <v-btn @click="removeItem" icon color="red" x-large>
                <v-icon> mdi-delete </v-icon></v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      required: false,
    },
  },
  methods: {
    ConvertTwoDigits(x) {
      return Number.parseFloat(x).toFixed(2);
    },
    removeItem() {
      this.$store.dispatch("removeItemInBasket", this.item);
    },
    chanceCount(count) {
      // this.item.count += count;
      this.$store.dispatch("uptadeItemInBasket", {
        basket: this.item,
        newCount: count,
      });
    },
  },
};
</script>