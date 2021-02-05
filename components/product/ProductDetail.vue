<template >
  <div v-show="showPage" class="px-15">
    <v-layout row justify-space-around>
      <v-flex md5 xs10 row>
        <v-carousel
          v-model="model"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item>
            <v-img :aspect-ratio="4 / 4" :src="product.imageUrl"> </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex md5 sm10>
        <v-card outlined class="my-5">
          <v-card-title class="pb-0" primary-title>
            {{ product.title }}
          </v-card-title>

          <v-rating
            background-color="grey"
            color="warning"
            half-increments
            hover
            length="5"
            readonly
            size="20"
            :value="4"
          />
          <v-card-title class="pt-0" >
            {{ product.price }}₺
          </v-card-title>
          <v-card-title class="red" v-show="product.stock <= 0 ? true : false">
            STOKLARDA YOK.
          </v-card-title>
        </v-card>

        <v-btn
          @click="addBasket"
          color="success"
          height="50"
          block
          :disabled="product.stock <= 0 ? true : false"
          >Sepete Ekle</v-btn
        >

        <v-card outlined class="my-5">
          <v-card-title class="pb-0" primary-title>
            Ürün Açıklaması
          </v-card-title>

          <v-divider class="my-2"></v-divider>
          <v-card-text>
            <P>
              {{ product.description }}
            </P>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data: () => ({
    benched: 0,
    model: 0,
    products: [],
    showPage: false,
    product: null,
  }),
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 3;
    },
  },
  methods: {
    addBasket() {
      this.$store.dispatch("addItemInBasket", this.product);
    },
  },
  created() {
    this.products = this.$store.getters.getProducts;
    let vm = this;
    this.products.forEach((product) => {
      if (product.id == this.$route.params.detail) {
        vm.showPage = true;
        vm.product = product;
      }
    });
  },
};
</script>