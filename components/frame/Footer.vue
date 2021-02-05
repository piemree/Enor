<template>
  <v-footer dark padless class="mt-9">
    <v-card flat tile class="white--text text-center" width="1366">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>