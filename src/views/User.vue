<template>
  <v-app
    ><VSNavigation>
      <template v-slot:titleText>
        <span>{{ title }}</span>
      </template></VSNavigation
    ><v-content class="backGroundColor">
      <div class="pa-4  white">
        <h1>ユーザーアイテム</h1>
        <template v-if="loading"
          ><v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="orange"
          ></v-progress-linear
        ></template>
        <template v-else>
          <span>{{ userItem.email }}</span>
          <span>{{ userItem.gender }}</span>
          <template v-if="userItem.name">
            <span>{{
              userItem.name.first + userItem.name.last
            }}</span></template
          ></template
        >
      </div></v-content
    ></v-app
  >
</template>

<script>
import VSNavigation from "@/components/VSNavigation";
import axios from "axios";
export default {
  name: "User",
  components: {
    VSNavigation
  },
  data: () => ({
    title: "ユーザー",
    loading: true,
    errored: false,
    error: null,
    userItem: {}
  }),
  async created() {
    await this.getItems();
  },
  methods: {
    getItems() {
      axios
        .get("https://randomuser.me/api")
        .then(response => {
          this.userItem = response.data.results[0];
        })
        .catch(err => {
          (this.errored = true), (this.error = err);
        }).finally(() => this.loading = false);
    }
  }
};
</script>
