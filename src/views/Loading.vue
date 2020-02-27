<template>
  <v-app
    ><VSNavigation>
      <template v-slot:titleText>
        <span>{{ title }}</span>
      </template></VSNavigation
    ><v-content class="backGroundColor">
      <div class="pa-4  white">
        <v-skeleton-loader
          v-for="(item, index) in items"
          :key="index"
          :boilerplate="boilerplate"
          :tile="tile"
          type="list-item-avatar-three-line"
          class="mx-auto"
        ></v-skeleton-loader></div></v-content
  ></v-app>
</template>

<script>
import VSNavigation from "@/components/VSNavigation";
export default {
  name: "Loading",
  components: {
    VSNavigation
  },
  data: () => ({
    title: "ローディング",
    boilerplate: false,
    tile: false,
    items: [1, 2, 3, 4]
  })
};
</script>
