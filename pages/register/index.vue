<template lang="">
  <div>
    <Valid/>
  </div>
</template>
<script>
import Valid from "@/components/validation/valid";

export default {
  data() {
    return {
      auth: true,
    };
  },
  components: {
    Valid,
  },
  middleware: "authenticated",
};
</script>
