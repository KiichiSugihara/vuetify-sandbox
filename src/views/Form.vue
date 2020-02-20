<template>
  <v-app
    ><VSNavigation>
      <template v-slot:titleText>
        <span>{{ title }}</span>
      </template></VSNavigation
    ><v-content class="backGroundColor">
      <div class="pa-4  white">
        <v-breadcrumbs :items="breadItems"
          ><template v-slot:item="{ item }">
            <router-link
              v-if="item.disabled === false"
              :to="{ name: item.link }"
            >
              <v-breadcrumbs-item :disabled="item.disabled">
                {{ item.text.toUpperCase() }}
              </v-breadcrumbs-item>
            </router-link>

            <v-breadcrumbs-item v-else :disabled="item.disabled">
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template></v-breadcrumbs
        ><VSForm @formItem="submitForm"></VSForm>
      </div> </v-content
  ></v-app>
</template>

<script>
import VSNavigation from "@/components/VSNavigation";
import VSForm from "@/components/VSForm";
export default {
  name: "Form",
  components: {
    VSNavigation,
    VSForm
  },
  data: () => ({
    title: "フォーム",
    formItem: null,
    breadItems: [
      {
        text: "Home",
        disabled: false,
        link: "home"
      },
      {
        text: "Form",
        disabled: true,
        link: "form"
      }
    ]
  }),
  methods: {
    submitForm(value) {
      this.formItem = value;
    }
  }
};
</script>
