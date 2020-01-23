<template>
  <v-app><Navigation></Navigation><v-content>ホーム</v-content></v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "Home",
  components: {
    Navigation
  }
};
</script>
