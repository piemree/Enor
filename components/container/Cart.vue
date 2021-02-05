<template >
  <v-hover v-slot="{ hover }">
    <v-card
      class="ma-0 my-6 mx-1 "
      max-width="300"
      min-width="200"
      min-height="300"
      flat
     
    >
      <v-img 
      
        :aspect-ratio="4 / 4"
        :src="product.imageUrl"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out v-card--reveal display-2 orange white--text"
            style="height: 100%"
          >
            {{product.price}}₺
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-6" style="position: relative">
        <v-btn
          absolute
          class="grey--text"
          :to="'/'+product.id"
          medium
          fab
          right
          top
          
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <h3 class="display-1 font-weight-light orange--text mb-2">
          {{product.title}}
        </h3>
        <div class="font-weight-light title mb-2">
          {{product.subtitle}}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  data: () => ({
   
  }),
 props:{
   product:{
     type:Object,
     required:false
   }
 }
};
</script>
<style >
#cursor {
  cursor: pointer;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
</style>
