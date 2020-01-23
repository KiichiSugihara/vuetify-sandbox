<template>
  <v-app
    ><VSNavigation>
      <template v-slot:titleText>
        <span>{{ title }}</span>
      </template></VSNavigation
    ><v-content>フォーム</v-content></v-app
  >
</template>

<script>
import VSNavigation from "@/components/VSNavigation";
export default {
  name: "Home",
  components: {
    VSNavigation
  },
  data: () => ({
    title: "フォーム"
  })
};
</script>
