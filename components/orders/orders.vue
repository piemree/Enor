<template >
  <v-simple-table
    fixed-header
    height="200px"
    class="mb-10 mx-16"
    id="order-table"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Ürün Adı</th>
          <th class="text-left">Sipariş adeti</th>
          <th class="text-left">Fiyat ------ Toplam:{{totalPrice}}₺</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.price }}₺</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  data() {
    return {
      totalPrice: 0,
    };
  },
  props: ["items"],
  created() {
    this.items.forEach((element) => {
      this.totalPrice += parseInt(element.price)*element.count
    });
  },
};
</script>
