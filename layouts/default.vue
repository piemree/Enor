<template >
  <v-app>
    <Navigation />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import Navigation from "@/components/frame/Navigation";
import Footer from "@/components/frame/Footer";
export default {
  components: {
    Navigation,
    Footer,
  },
};
</script>
<style lang="">
</style>